'use strict';

/**
 * Multicellular usecase
 * Based on MulticellularTest.java — a full two-organism sender/receiver system
 * with AHL signalling, genetic circuits, and LuxR/AHL non-covalent binding.
 */

const fs   = require('fs');
const path = require('path');

const {
  SBOLDocument, RDFFormat,
  ComponentType, ConstraintRestriction, InteractionType, ParticipationType,
  SBOLAPI
} = require('../sbolLib');

const OUTPUT_DIR = path.resolve(__dirname, '../../../output/usecases/multicellular');

function saveOutputs(name, result) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const files = [
    { key: 'rdfXml',          ext: '.rdf'        },
    { key: 'turtle',          ext: '.ttl'        },
    { key: 'jsonLd',          ext: '.jsonld'     },
    { key: 'nTriples',        ext: '.nt'         },
    { key: 'nTriplesOrdered', ext: '_ordered.nt' },
  ];
  for (const { key, ext } of files) {
    fs.writeFileSync(path.join(OUTPUT_DIR, name + ext), result[key] || '', 'utf8');
  }
}

function generate() {
  const NS    = 'https://sbolstandard.org/examples';
  const SBO   = 'https://identifiers.org/SBO:';
  const SO    = 'https://identifiers.org/SO:';
  const GO    = 'https://identifiers.org/GO:';
  const CHEBI = 'https://identifiers.org/CHEBI:';

  const doc = new SBOLDocument(NS + '/');

  // ── Top-level system components ───────────────────────────────────────────
  const multicellularSystem = SBOLAPI.createComponentFromDisplayId(doc, 'MulticellularSystem', ComponentType.FunctionalEntity.iri, 'MulticellularSystem', 'Multicellular System', SBO + '0000289');
  const senderSystem        = SBOLAPI.createComponentFromDisplayId(doc, 'SenderSystem',        ComponentType.FunctionalEntity.iri, 'SenderSystem',        'Sender System',        SBO + '0000289');
  const receiverSystem      = SBOLAPI.createComponentFromDisplayId(doc, 'ReceiverSystem',      ComponentType.FunctionalEntity.iri, 'ReceiverSystem',      'Receiver System',      SBO + '0000289');
  const senderCell          = SBOLAPI.createComponentFromDisplayId(doc, 'OrganismA',           GO + '0005623',                    'OrganismA',           'Organism A',           SBO + '0000290');
  const receiverCell        = SBOLAPI.createComponentFromDisplayId(doc, 'OrganismB',           GO + '0005623',                    'OrganismB',           'Organism B',           SBO + '0000290');
  const ahl                 = SBOLAPI.createComponentFromDisplayId(doc, 'AHL',                 ComponentType.SimpleChemical.iri,  'AHL',                 'AHL',                  CHEBI + '35224');

  // ── Initial constraints: cells contain AHL (also creates SubComponents in sender/receiverSystem)
  SBOLAPI.createConstraint(senderSystem,   senderCell,   ahl, ConstraintRestriction.Contains);
  SBOLAPI.createConstraint(receiverSystem, receiverCell, ahl, ConstraintRestriction.Contains);

  // ── Wire sender/receiver into multicellular system ────────────────────────
  SBOLAPI.addSubComponent(multicellularSystem, senderSystem);
  SBOLAPI.addSubComponent(multicellularSystem, receiverSystem);
  SBOLAPI.mapTo(multicellularSystem, senderSystem, ahl, receiverSystem, ahl);

  // ── AHL Producer ──────────────────────────────────────────────────────────
  const ahlProducer = SBOLAPI.createDnaComponent(doc, 'AHL_producer', 'AHL producer',       'AHL producer',          SO + '0000704', null);
  const pConstLuxI  = SBOLAPI.createDnaComponent(doc, 'pConstLuxI',   'pConstLuxI',         'Constitutive promoter', SO + '0000167', null);
  const rbs_luxI    = SBOLAPI.createDnaComponent(doc, 'rbs_luxI',     'rbs',                'RBS',                   SO + '0000139', null);
  const luxI        = SBOLAPI.createDnaComponent(doc, 'luxI',         'luxI',               'luxI coding sequence',  SO + '0000316', null);
  const ter_luxI    = SBOLAPI.createDnaComponent(doc, 'ter_luxI',     'luxI terminator',    'Terminator',            SO + '0000141', null);

  SBOLAPI.appendComponent(doc, ahlProducer, pConstLuxI);  // SubComponent1
  SBOLAPI.appendComponent(doc, ahlProducer, rbs_luxI);    // SubComponent2
  SBOLAPI.appendComponent(doc, ahlProducer, luxI);        // SubComponent3
  SBOLAPI.appendComponent(doc, ahlProducer, ter_luxI);    // SubComponent4
  SBOLAPI.addSubComponent(ahlProducer, ahl);              // SubComponent5

  // GeneticProduction: luxI (Template) → AHL (Product)
  SBOLAPI.createGeneticProductionInteractionFromComponents(ahlProducer, luxI, ahl);

  // ── AHL Receiver ──────────────────────────────────────────────────────────
  const ahlReceiver = SBOLAPI.createDnaComponent(doc, 'AHL_receiver', 'AHL receiver',           'AHL receiver',            SO + '0000704', null);
  const pConstLuxR  = SBOLAPI.createDnaComponent(doc, 'pConstLuxR',   'pLuxR',                  'Constituve promoter',     SO + '0000167', null);
  const rbs_luxR    = SBOLAPI.createDnaComponent(doc, 'rbs_luxR',     'rbs',                    'RBS',                     SO + '0000139', null);
  const luxR        = SBOLAPI.createDnaComponent(doc, 'luxR',         'luxR',                   'luxR coding sequence',    SO + '0000316', null);
  const ter_luxR    = SBOLAPI.createDnaComponent(doc, 'ter_luxR',     'luxR terminator',        'Terminator',              SO + '0000141', null);
  const pLuxR       = SBOLAPI.createDnaComponent(doc, 'pLuxR',        'pLuxR',                  'LuxR inducible promoter', SO + '0000167', null);
  const rbs_gfp     = SBOLAPI.createDnaComponent(doc, 'rbs_gfp',      'rbs',                    'RBS',                     SO + '0000139', null);
  const gfp         = SBOLAPI.createDnaComponent(doc, 'gfp',          'gfp',                    'gfp coding sequence',     SO + '0000316', null);
  const ter_gfp     = SBOLAPI.createDnaComponent(doc, 'ter_gfp',      'gfp terminator',         'Terminator',              SO + '0000141', null);
  const luxR_p      = SBOLAPI.createComponentFromDisplayId(doc, 'LuxR_protein', ComponentType.Protein.iri, 'LuxR_protein', 'LuxR',             GO + '0003700');
  const gfp_p       = SBOLAPI.createComponentFromDisplayId(doc, 'GFP_protein',  ComponentType.Protein.iri, 'GFP',          'GFP',              null);
  const luxR_AHL    = SBOLAPI.createComponentFromDisplayId(doc, 'LuxR_AHL',     ComponentType.Protein.iri, 'LuxR_AHL',     'LuxR_AHL complex', GO + '0003700');

  SBOLAPI.appendComponent(doc, ahlReceiver, pConstLuxR);  // SubComponent1
  SBOLAPI.appendComponent(doc, ahlReceiver, rbs_luxR);    // SubComponent2
  SBOLAPI.appendComponent(doc, ahlReceiver, luxR);        // SubComponent3
  SBOLAPI.appendComponent(doc, ahlReceiver, ter_luxR);    // SubComponent4
  SBOLAPI.appendComponent(doc, ahlReceiver, pLuxR);       // SubComponent5
  SBOLAPI.appendComponent(doc, ahlReceiver, rbs_gfp);     // SubComponent6
  SBOLAPI.appendComponent(doc, ahlReceiver, gfp);         // SubComponent7
  SBOLAPI.appendComponent(doc, ahlReceiver, ter_gfp);     // SubComponent8

  const ahlSC     = SBOLAPI.addSubComponent(ahlReceiver, ahl);      // SubComponent9
  const luxRSC    = SBOLAPI.addSubComponent(ahlReceiver, luxR_p);   // SubComponent10
                    SBOLAPI.addSubComponent(ahlReceiver, gfp_p);    // SubComponent11
  const luxRAHLSC = SBOLAPI.addSubComponent(ahlReceiver, luxR_AHL); // SubComponent12

  // GeneticProduction: luxR (Template) → LuxR_protein (Product)
  SBOLAPI.createGeneticProductionInteractionFromComponents(ahlReceiver, luxR, luxR_p);
  // GeneticProduction: gfp (Template) → GFP_protein (Product)
  SBOLAPI.createGeneticProductionInteractionFromComponents(ahlReceiver, gfp, gfp_p);
  // Stimulation: pLuxR (Stimulated) ← LuxR_AHL (Stimulator) — pLuxR is comp1 to match Java arg order
  SBOLAPI.createInteractionFromComponents([InteractionType.Stimulation.iri], ahlReceiver,
    pLuxR, [ParticipationType.Stimulated.iri], luxR_AHL, [ParticipationType.Stimulator.iri]);
  // NonCovalentBinding: LuxR_protein + AHL → LuxR_AHL
  const ncbInteraction = ahlReceiver.createInteraction();
  ncbInteraction.setTypes([InteractionType.NonCovalentBinding.iri]);
  SBOLAPI.createParticipation(ncbInteraction, [ParticipationType.Reactant.iri], luxRSC);
  SBOLAPI.createParticipation(ncbInteraction, [ParticipationType.Reactant.iri], ahlSC);
  SBOLAPI.createParticipation(ncbInteraction, [ParticipationType.Product.iri],  luxRAHLSC);

  // ── Assemble sender/receiver systems ──────────────────────────────────────
  SBOLAPI.addSubComponent(senderSystem,   ahlProducer);   // SubComponent3 in senderSystem
  SBOLAPI.addSubComponent(receiverSystem, ahlReceiver);   // SubComponent3 in receiverSystem

  SBOLAPI.createConstraint(senderSystem,   senderCell,   ahlProducer, ConstraintRestriction.Contains);
  SBOLAPI.createConstraint(receiverSystem, receiverCell, ahlReceiver, ConstraintRestriction.Contains);

  // Map AHL inside AHLProducer to the top-level AHL in senderSystem (VerifyIdentical)
  SBOLAPI.mapTo(senderSystem,   ahlProducer, ahl, ahl);
  SBOLAPI.mapTo(receiverSystem, ahlReceiver, ahl, ahl);

  const result = {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };

  saveOutputs('multicellular', result);
  return result;
}

module.exports = { generate };

if (require.main === module) {
  generate();
  console.log(`\nOutputs saved to ${OUTPUT_DIR}`);
}
