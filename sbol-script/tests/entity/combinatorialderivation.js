'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS  = 'https://synbiohub.org/public/igem';
  const doc = new SBOLDocument(NS + '/');

  const seq_start = doc.createDNASequence(NS + '/BBa_R0040_start_Sequence1', NS, 'tccctat');
  seq_start.setName('Sequence1');
  seq_start.setDescription('BBa_R0040_start sequence');

  const r0040_start = doc.createComponent(NS + '/BBa_R0040_start', NS, [ComponentType.DNA.iri]);
  r0040_start.setName('pTetR_start');
  r0040_start.setDescription('promoter_start');
  r0040_start.addRole('https://identifiers.org/SO:0000804');
  r0040_start.addSequence(seq_start.getIdentifier());

  const seq_r0040 = doc.createDNASequence(NS + '/BBa_R0040_Sequence1', NS,
    'tccctatcagtgatagagattgacatccctatcagtgatagagatactgagcac');
  seq_r0040.setName('Sequence1');
  seq_r0040.setDescription('BBa_R0040 sequence');

  const r0040 = doc.createComponent(NS + '/BBa_R0040', NS, [ComponentType.DNA.iri]);
  r0040.setName('pTetR');
  r0040.setDescription('TetR repressible promoter');
  r0040.addRole('https://identifiers.org/SO:0000167');
  r0040.addSequence(seq_r0040.getIdentifier());
  r0040.createSubComponent(r0040_start.getIdentifier(), 'SubComponent1');
  r0040.createSubComponent(r0040_start.getIdentifier(), 'SubComponent2');
  r0040.createSubComponent(r0040_start.getIdentifier(), 'SubComponent3');

  const cs1 = doc.createCombinatorialDerivation(NS + '/cs1', NS);
  cs1.setTemplate(r0040.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
