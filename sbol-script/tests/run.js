'use strict';

const { runAll }        = require('./testRunner');
const { runComparator } = require('./comparator');

async function main() {
  console.log('=== Step 1: Generate examples ===\n');
  const gen = await runAll();

  console.log('\n=== Step 2: Compare against libSBOLj3 ===\n');
  const cmp = await runComparator();

  const totalPassed = gen.passed + cmp.passed;
  const totalFailed = gen.failed + cmp.failed;

  console.log('\n=== Summary ===');
  console.log(`  Generation : ${gen.passed} OK, ${gen.failed} failed`);
  console.log(`  Comparison : ${cmp.passed} passed, ${cmp.failed} failed, ${cmp.skipped} skipped`);
  console.log(`  Total      : ${totalPassed} OK, ${totalFailed} failed`);

  if (totalFailed > 0) process.exit(1);
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
