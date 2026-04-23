'use strict';

const { SBOLDocument, RDFFormat } = require('../sbolLib');

function generate() {
  const NS  = 'https://synbiohub.org/public/igem';
  const doc = new SBOLDocument(NS + '/');

  const seq_r0040 = doc.createDNASequence(NS + '/BBa_R0040_Sequence1', NS,
    'tccctatcagtgatagagattgacatccctatcagtgatagagatactgagcac');
  seq_r0040.setName('Sequence1');
  seq_r0040.setDescription('BBa_R0040 sequence');

  const bba_r0040 = doc.createDNAComponent(NS + '/BBa_R0040', NS);
  bba_r0040.addRole('https://identifiers.org/SO:0000167');
  bba_r0040.setName('pTetR');
  bba_r0040.setDescription('TetR repressible promoter');
  bba_r0040.addSequence(seq_r0040.getIdentifier());

  const sf1 = bba_r0040.createSequenceFeature('SequenceFeature1');
  const cut1 = sf1.createCut(seq_r0040.getIdentifier(), 5, 'Cut1');

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
