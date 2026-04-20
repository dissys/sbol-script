'use strict';

const fs   = require('fs');
const path = require('path');

// Relative to this file: tests/ → sbol-script/ → sbol-script/ → output/comparison
const COMPARISON_DIR  = path.resolve(__dirname, '../../output/comparison');
const REPORT_FILE     = path.join(COMPARISON_DIR, 'report');
const REPORT_MT10_FILE = path.join(COMPARISON_DIR, 'report_mt_10');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Compare two N-Triples strings line by line.
 * Returns a comparison result object.
 */
function compareNTriples(generatedContent, referenceContent, testName) {
  const generatedLines = generatedContent
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const referenceLines = referenceContent
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const totalLines = Math.max(generatedLines.length, referenceLines.length);
  const differences = [];

  const generatedSet = new Set(generatedLines);
  const referenceSet = new Set(referenceLines);

  let missingCount = 0;
  for (const line of referenceLines) {
    if (!generatedSet.has(line)) {
      missingCount++;
      differences.push({ type: 'MISSING', line });
    }
  }

  let extraCount = 0;
  for (const line of generatedLines) {
    if (!referenceSet.has(line)) {
      extraCount++;
      differences.push({ type: 'EXTRA', line });
    }
  }

  const issueLines = missingCount + extraCount;
  const errorRate  = totalLines > 0 ? (issueLines / totalLines) * 100 : 0;

  return {
    testName,
    generatedCount: generatedLines.length,
    referenceCount: referenceLines.length,
    issueLines,
    totalLines,
    errorRate,
    differences,
    passed: differences.length === 0,
  };
}

/**
 * Append comparison result to the report files.
 */
function appendReport(result, inputFile, outputFile) {
  ensureDir(COMPARISON_DIR);

  const timestamp = new Date().toISOString();
  const sep    = '='.repeat(80);
  const status = result.passed ? 'PASS' : 'FAIL';

  let entry = `\n${sep}\n`;
  entry += `TEST:      ${result.testName}\n`;
  entry += `TIMESTAMP: ${timestamp}\n`;
  entry += `STATUS:    ${status}\n`;
  entry += `INPUT:     ${inputFile}\n`;
  entry += `OUTPUT:    ${outputFile}\n`;
  entry += `LINES:     Generated=${result.generatedCount}  Reference=${result.referenceCount}  Total=${result.totalLines}\n`;
  entry += `ERRORS:    ${result.issueLines} lines with issues  (${result.errorRate.toFixed(2)}%)\n`;

  if (!result.passed) {
    entry += `\nDIFFERENCES:\n`;
    result.differences.forEach(diff => {
      const prefix = diff.type === 'MISSING' ? '- (missing)' : '+ (extra)  ';
      entry += `  ${prefix}  ${diff.line}\n`;
    });
  }
  entry += `${sep}\n`;

  fs.appendFileSync(REPORT_FILE, entry, 'utf8');

  if (result.errorRate > 10) {
    let mt10 = `\n${sep}\n`;
    mt10 += `TEST:       ${result.testName}\n`;
    mt10 += `TIMESTAMP:  ${timestamp}\n`;
    mt10 += `ERROR RATE: ${result.errorRate.toFixed(2)}% (>10% threshold)\n`;
    mt10 += `INPUT:      ${inputFile}\n`;
    mt10 += `OUTPUT:     ${outputFile}\n`;
    mt10 += `LINES:      Generated=${result.generatedCount}  Reference=${result.referenceCount}  Total=${result.totalLines}  Issues=${result.issueLines}\n`;
    mt10 += `${sep}\n`;
    fs.appendFileSync(REPORT_MT10_FILE, mt10, 'utf8');
  }

  return result;
}

module.exports = { compareNTriples, appendReport, COMPARISON_DIR };
