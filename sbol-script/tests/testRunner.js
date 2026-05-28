'use strict';

// Must be required first to set up global.$rdf before any generator
require('./sbolLib');

const fs   = require('fs');
const path = require('path');

// All generators in tests/entity/
const GENERATORS_DIR = path.join(__dirname, 'entity');

// Output root: /Users/goksel/work/sbol-script/output/examples/
const OUTPUT_ROOT = path.resolve(__dirname, '../../output/examples');

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeOutput(name, result) {
  const dir = path.join(OUTPUT_ROOT, name);
  fs.mkdirSync(dir, { recursive: true });

  const files = [
    { key: 'rdfXml',          ext: '.rdf'         },
    { key: 'turtle',          ext: '.ttl'         },
    { key: 'jsonLd',          ext: '.jsonld'      },
    { key: 'nTriples',        ext: '.nt'          },
    { key: 'nTriplesOrdered', ext: '_ordered.nt'  },
  ];

  for (const { key, ext } of files) {
    const outPath = path.join(dir, name + ext);
    fs.writeFileSync(outPath, result[key] || '', 'utf8');
  }
}

async function runAll() {
  const generatorFiles = fs.readdirSync(GENERATORS_DIR)
    .filter(f => f.endsWith('.js'))
    .sort();

  let passed = 0;
  let failed = 0;

  console.log(`Running ${generatorFiles.length} generators...\n`);

  for (const file of generatorFiles) {
    const name = path.basename(file, '.js');
    process.stdout.write(`  ${name} ... `);

    let result;
    try {
      const generator = require(path.join(GENERATORS_DIR, file));
      result = generator.generate();
    } catch (err) {
      console.error(`FAILED\n    Error: ${err.message}`);
      failed++;
      continue;
    }

    try {
      writeOutput(name, result);
      console.log('OK');
      passed++;
    } catch (err) {
      console.error(`FAILED (write error)\n    Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  console.log(`Output: ${OUTPUT_ROOT}`);

  return { passed, failed };
}

module.exports = { runAll };

if (require.main === module) {
  runAll().catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });
}
