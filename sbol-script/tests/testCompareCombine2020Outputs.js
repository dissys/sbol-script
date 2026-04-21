'use strict';

/**
 * Compares the ordered N-Triples output of:
 *   - tests/entity/combine2020.js        (libSBOLj3-derived reference generator)
 *   - tests/usecases/GettingStartedTutorial_Short.js  (SBOLAPI-based tutorial)
 *
 * Both generate() functions are called in-process; no filesystem I/O needed.
 * Exits with code 1 if there are any differences.
 */

const path = require('path');
const { compareNTriples, appendReport } = require('./compare');

const combine2020    = require('./entity/combine2020');
const tutorialShort  = require('./usecases/GettingStartedTutorial_Short');

const TEST_NAME = 'combine2020_vs_GettingStartedTutorial_Short';

// Relative path used for display in report headers
function rel(p) { return path.relative(__dirname, p); }

const referenceFile = rel(path.join(__dirname, 'entity', 'combine2020.js'));
const inputFile     = rel(path.join(__dirname, 'usecases', 'GettingStartedTutorial_Short.js'));

function run() {
  console.log(`\nComparing combine2020 vs GettingStartedTutorial_Short...`);

  let refResult, tutResult;
  try {
    refResult = combine2020.generate();
  } catch (err) {
    console.error(`ERROR generating combine2020: ${err.message}`);
    process.exit(1);
  }
  try {
    tutResult = tutorialShort.generate();
  } catch (err) {
    console.error(`ERROR generating GettingStartedTutorial_Short: ${err.message}`);
    process.exit(1);
  }

  const result = compareNTriples(
    tutResult.nTriplesOrdered,   // generated (tutorial)
    refResult.nTriplesOrdered,   // reference (combine2020)
    TEST_NAME
  );

  appendReport(result, inputFile, referenceFile);

  const status = result.passed ? 'PASS' : 'FAIL';
  console.log(`  [${status}] ${TEST_NAME}`);
  if (!result.passed) {
    console.log(`         generated: ${result.generatedCount} triples, reference: ${result.referenceCount} triples`);
    console.log(`         issue lines: ${result.issueLines} / ${result.totalLines} (${result.errorRate.toFixed(1)}% error rate)`);
  }

  return result.passed;
}

if (require.main === module) {
  const passed = run();
  process.exit(passed ? 0 : 1);
}

module.exports = { run };
