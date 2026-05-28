'use strict';

/**
 * Compares the ordered N-Triples output of each usecase generator against the
 * corresponding entity generator (which acts as the reference / ground truth).
 *
 * Pairs compared:
 *   entity/combine2020            vs  usecases/GettingStartedTutorial
 *   entity/BBa_F2620_PoPSReceiver vs  usecases/PoPSReceiverExampleTest
 *   entity/BBa_F2620_PoPSReceiver vs  usecases/PoPSReceiverExampleUsingHighLevelEntitiesTest
 *   entity/toggle_switch          vs  usecases/ToggleSwitchTest
 *   entity/toggle_switch_v2       vs  usecases/ToggleSwitch_v2Test
 *   entity/multicellular_simple   vs  usecases/MulticellularSimpleTest
 *   entity/multicellular          vs  usecases/MulticellularTest
 *
 * Exits with code 1 if any comparison fails.
 */

const path = require('path');
const { compareNTriples, appendReport } = require('./compare');

// ── Entity (reference) generators ──────────────────────────────────────────
const combine2020            = require('./entity/combine2020');
const popsReceiverEntity     = require('./entity/BBa_F2620_PoPSReceiver');
const toggleSwitchEntity     = require('./entity/toggle_switch');
const toggleSwitchV2Entity   = require('./entity/toggle_switch_v2');
const multicellularSimpleEnt = require('./entity/multicellular_simple');
const multicellularEntity    = require('./entity/multicellular');

// ── Usecase generators ──────────────────────────────────────────────────────
const gettingStarted         = require('./usecases/GettingStartedTutorial');
const popsReceiverUC         = require('./usecases/PoPSReceiverExampleTest');
const popsReceiverHighLevelUC = require('./usecases/PoPSReceiverExampleUsingHighLevelEntitiesTest');
const toggleSwitchUC         = require('./usecases/ToggleSwitchTest');
const toggleSwitchV2UC       = require('./usecases/ToggleSwitch_v2Test');
const multicellularSimpleUC  = require('./usecases/MulticellularSimpleTest');
const multicellularUC        = require('./usecases/MulticellularTest');

// ── Test pairs: [name, entityMod, usecaseMod] ───────────────────────────────
const PAIRS = [
  {
    name:    'combine2020_vs_GettingStartedTutorial',
    entFile: path.join(__dirname, 'entity', 'combine2020.js'),
    ucFile:  path.join(__dirname, 'usecases', 'GettingStartedTutorial.js'),
    entMod:  combine2020,
    ucMod:   gettingStarted,
  },
  {
    name:    'BBa_F2620_PoPSReceiver_entity_vs_usecase',
    entFile: path.join(__dirname, 'entity', 'BBa_F2620_PoPSReceiver.js'),
    ucFile:  path.join(__dirname, 'usecases', 'PoPSReceiverExampleTest.js'),
    entMod:  popsReceiverEntity,
    ucMod:   popsReceiverUC,
  },
  {
    name:    'BBa_F2620_PoPSReceiver_entity_vs_highlevel',
    entFile: path.join(__dirname, 'entity', 'BBa_F2620_PoPSReceiver.js'),
    ucFile:  path.join(__dirname, 'usecases', 'PoPSReceiverExampleUsingHighLevelEntitiesTest.js'),
    entMod:  popsReceiverEntity,
    ucMod:   popsReceiverHighLevelUC,
  },
  {
    name:    'toggle_switch_entity_vs_usecase',
    entFile: path.join(__dirname, 'entity', 'toggle_switch.js'),
    ucFile:  path.join(__dirname, 'usecases', 'ToggleSwitchTest.js'),
    entMod:  toggleSwitchEntity,
    ucMod:   toggleSwitchUC,
  },
  {
    name:    'toggle_switch_v2_entity_vs_usecase',
    entFile: path.join(__dirname, 'entity', 'toggle_switch_v2.js'),
    ucFile:  path.join(__dirname, 'usecases', 'ToggleSwitch_v2Test.js'),
    entMod:  toggleSwitchV2Entity,
    ucMod:   toggleSwitchV2UC,
  },
  {
    name:    'multicellular_simple_entity_vs_usecase',
    entFile: path.join(__dirname, 'entity', 'multicellular_simple.js'),
    ucFile:  path.join(__dirname, 'usecases', 'MulticellularSimpleTest.js'),
    entMod:  multicellularSimpleEnt,
    ucMod:   multicellularSimpleUC,
  },
  {
    name:    'multicellular_entity_vs_usecase',
    entFile: path.join(__dirname, 'entity', 'multicellular.js'),
    ucFile:  path.join(__dirname, 'usecases', 'MulticellularTest.js'),
    entMod:  multicellularEntity,
    ucMod:   multicellularUC,
  },
];

function rel(p) { return path.relative(__dirname, p); }

function run() {
  let allPassed = true;

  for (const { name, entFile, ucFile, entMod, ucMod } of PAIRS) {
    console.log(`\nComparing ${name}...`);

    let refResult, ucResult;
    try {
      refResult = entMod.generate();
    } catch (err) {
      console.error(`  ERROR generating entity ${rel(entFile)}: ${err.message}`);
      allPassed = false;
      continue;
    }
    try {
      ucResult = ucMod.generate();
    } catch (err) {
      console.error(`  ERROR generating usecase ${rel(ucFile)}: ${err.message}`);
      allPassed = false;
      continue;
    }

    const result = compareNTriples(
      ucResult.nTriplesOrdered,   // generated (usecase)
      refResult.nTriplesOrdered,  // reference (entity)
      name
    );

    appendReport(result, rel(ucFile), rel(entFile));

    const status = result.passed ? 'PASS' : 'FAIL';
    console.log(`  [${status}] ${name}`);
    if (!result.passed) {
      console.log(`         generated: ${result.generatedCount} triples, reference: ${result.referenceCount} triples`);
      console.log(`         issue lines: ${result.issueLines} / ${result.totalLines} (${result.errorRate.toFixed(1)}% error rate)`);
      allPassed = false;
    }
  }

  return allPassed;
}

if (require.main === module) {
  const passed = run();
  process.exit(passed ? 0 : 1);
}

module.exports = { run };
