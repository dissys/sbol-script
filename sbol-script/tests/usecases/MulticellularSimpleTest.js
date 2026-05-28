'use strict';

/**
 * Multicellular Simple usecase
 * Based on MulticellularSimpleTest.java — demonstrates a two-organism
 * sender/receiver system wired via a shared AHL signalling molecule.
 */

const fs   = require('fs');
const path = require('path');

const {
  SBOLDocument, RDFFormat,
  ComponentType, ConstraintRestriction,
  SBOLAPI, SBOLNamespaces
} = require('../sbolLib');

const OUTPUT_DIR = path.resolve(__dirname, '../../../output/usecases/multicellular_simple');

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
  const NS   = 'https://sbolstandard.org/examples';
  const doc = new SBOLDocument(NS + '/');

  // ── Top-level component definitions ──────────────────────────────────────

  const multicellularSystem = SBOLAPI.createComponentFromDisplayId( doc, 'MulticellularSystem', ComponentType.FunctionalEntity, 'MulticellularSystem', 'Multicellular System', SBOLNamespaces.SBO('0000289'));
  const senderSystem = SBOLAPI.createComponentFromDisplayId(doc, 'SenderSystem', ComponentType.FunctionalEntity, 'SenderSystem', 'Sender System', SBOLNamespaces.SBO('0000289'));
  const receiverSystem = SBOLAPI.createComponentFromDisplayId(doc, 'ReceiverSystem', ComponentType.FunctionalEntity, 'ReceiverSystem', 'Receiver System', SBOLNamespaces.SBO('0000289'));
  const senderCell = SBOLAPI.createComponentFromDisplayId( doc, 'OrganismA', ComponentType.Cell, 'OrganismA', 'Organism A', SBOLNamespaces.SBO('0000290'));
  const receiverCell = SBOLAPI.createComponentFromDisplayId(doc, 'OrganismB', ComponentType.Cell, 'OrganismB', 'Organism B', SBOLNamespaces.SBO('0000290'));
  const ahl = SBOLAPI.createComponentFromDisplayId( doc, 'AHL', ComponentType.SimpleChemical, 'AHL', 'AHL', SBOLNamespaces.CHEBI('35224'));

  // ── Wire sender/receiver systems: cell contains AHL ───────────────────────

  SBOLAPI.createConstraint(senderSystem,   senderCell,   ahl, ConstraintRestriction.Contains);
  SBOLAPI.createConstraint(receiverSystem, receiverCell, ahl, ConstraintRestriction.Contains);

  // ── Assemble the multicellular system ─────────────────────────────────────
  SBOLAPI.addSubComponent(multicellularSystem, senderSystem);
  SBOLAPI.addSubComponent(multicellularSystem, receiverSystem);
  
  // Map AHL in sender to AHL in receiver → VerifyIdentical constraint
  SBOLAPI.mapToChildren(multicellularSystem, senderSystem, ahl, receiverSystem, ahl);
  
  const result = {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };

  saveOutputs('multicellular_simple', result);
  return result;
}

module.exports = { generate };

if (require.main === module) {
  generate();
  console.log(`\nOutputs saved to ${OUTPUT_DIR}`);
}
