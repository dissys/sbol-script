'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS   = 'https://sbolstandard.org/examples';
  const EDAM = 'https://identifiers.org/edam:';
  const doc  = new SBOLDocument(NS + '/');

  const tetr_p = doc.createComponent(NS + '/TetR_protein', NS, [ComponentType.Protein.iri]);
  tetr_p.addRole('https://identifiers.org/GO:0003700');
  tetr_p.setName('TetR');
  tetr_p.setDescription('TetR protein');

  const att1 = doc.createAttachment(NS + '/attachment1', NS, 'https://sbolstandard.org/attachment1');
  att1.setFormat(EDAM + 'format_2585');
  att1.setHash('aaa');
  att1.setHashAlgorithm('sha-256');
  att1.setSize(1000);

  const att2 = doc.createAttachment(NS + '/attachment2', NS, 'https://sbolstandard.org/attachment2');
  att2.setFormat(EDAM + 'format_2585');
  att2.setHash('aaa');
  att2.setHashAlgorithm('sha-256');
  att2.setSize(1000);

  const impl1 = doc.createImplementation(NS + '/impl1', NS);
  impl1.setBuilt(tetr_p.getIdentifier());
  impl1.addAttachmentIRI(att1.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
