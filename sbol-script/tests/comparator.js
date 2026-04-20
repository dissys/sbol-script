'use strict';

const fs   = require('fs');
const path = require('path');

const { compareNTriples, appendReport, COMPARISON_DIR } = require('./compare');

// ---------------------------------------------------------------------------
// Paths (all relative to this file's location: tests/)
// ---------------------------------------------------------------------------

// libSBOLj3 reference output — two levels up from the package dir, then into
// the sibling repo.  Relative: tests/ → sbol-script/ → sbol-script/ → ../libSBOLj3/…
const LIBSBOLJ3_OUTPUT = path.resolve(__dirname, '../../../libSBOLj3/libSBOLj3/output');

// Generated outputs produced by testRunner.js
// Relative: tests/ → sbol-script/ → sbol-script/ → output/examples
const EXAMPLES_DIR = path.resolve(__dirname, '../../output/examples');

// ---------------------------------------------------------------------------
// Discover reference files from libSBOLj3 output (excluding /invalid/)
// Returns Map<name, absolutePath>
// ---------------------------------------------------------------------------
function buildReferenceMap(libSBOLj3Root) {
  const map = new Map();

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Skip the invalid folder at any depth
        if (entry.name === 'invalid') continue;
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('_ordered.nt')) {
        // Derive the test name from the file stem, stripping '_ordered'
        const stem = path.basename(entry.name, '_ordered.nt');
        map.set(stem, fullPath);
      }
    }
  }

  walk(libSBOLj3Root);
  return map;
}

// ---------------------------------------------------------------------------
// Relative path helper — make a path relative to the tests/ directory for
// display in reports (keeps paths portable / human-readable)
// ---------------------------------------------------------------------------
function rel(absPath) {
  return path.relative(__dirname, absPath);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function runComparator() {
  // Guard: libSBOLj3 output folder must exist
  if (!fs.existsSync(LIBSBOLJ3_OUTPUT)) {
    console.error(
      `ERROR: libSBOLj3 output folder not found.\n` +
      `  Expected: ${rel(LIBSBOLJ3_OUTPUT)}\n` +
      `  Clone or build libSBOLj3 first.`
    );
    process.exit(1);
  }

  // Guard: generated examples folder must exist
  if (!fs.existsSync(EXAMPLES_DIR)) {
    console.error(
      `ERROR: generated examples folder not found.\n` +
      `  Expected: ${rel(EXAMPLES_DIR)}\n` +
      `  Run testRunner.js first.`
    );
    process.exit(1);
  }

  // Clear previous reports
  fs.mkdirSync(COMPARISON_DIR, { recursive: true });
  for (const f of [
    path.join(COMPARISON_DIR, 'report'),
    path.join(COMPARISON_DIR, 'report_mt_10'),
  ]) {
    if (fs.existsSync(f)) fs.unlinkSync(f);
  }

  // Build map of name → libSBOLj3 reference file
  const refMap = buildReferenceMap(LIBSBOLJ3_OUTPUT);
  console.log(`Found ${refMap.size} reference file(s) in libSBOLj3 output.\n`);

  // Collect generator names from output/examples/ sub-folders
  const generatorNames = fs.readdirSync(EXAMPLES_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .sort();

  let passed = 0;
  let failed = 0;
  let skipped = 0;

  for (const name of generatorNames) {
    const generatedFile = path.join(EXAMPLES_DIR, name, `${name}_ordered.nt`);
    const referenceFile = refMap.get(name);

    process.stdout.write(`  ${name} ... `);

    // No reference in libSBOLj3 → skip with a note
    if (!referenceFile) {
      console.log('SKIP (no reference file in libSBOLj3)');
      skipped++;
      continue;
    }

    // Generated file must exist
    if (!fs.existsSync(generatedFile)) {
      console.log('FAIL (generated _ordered.nt not found)');
      failed++;
      appendReport(
        {
          testName: name,
          generatedCount: 0,
          referenceCount: 0,
          issueLines: 1,
          totalLines: 1,
          errorRate: 100,
          differences: [{ type: 'EXTRA', line: 'generated file missing' }],
          passed: false,
        },
        rel(referenceFile),
        rel(generatedFile)
      );
      continue;
    }

    let generated, reference;
    try {
      generated = fs.readFileSync(generatedFile, 'utf8');
      reference = fs.readFileSync(referenceFile, 'utf8');
    } catch (err) {
      console.log(`FAIL (read error: ${err.message})`);
      failed++;
      continue;
    }

    const result = compareNTriples(generated, reference, name);
    appendReport(result, rel(referenceFile), rel(generatedFile));

    if (result.passed) {
      console.log('PASS');
      passed++;
    } else {
      console.log(`FAIL  (${result.issueLines} line(s) differ, ${result.errorRate.toFixed(1)}%)`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed, ${skipped} skipped`);
  console.log(`Reports: ${rel(COMPARISON_DIR)}/`);

  return { passed, failed, skipped };
}

module.exports = { runComparator };

if (require.main === module) {
  runComparator().catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });
}
