'use strict';

const { SBOLDocument, RDFFormat } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const doc = new SBOLDocument(NS + '/');

  const att1 = doc.createAttachment(NS + '/attachment1', NS, 'https://sbolstandard.org/attachment1');
  const att2 = doc.createAttachment(NS + '/attachment2', NS, 'https://sbolstandard.org/attachment2');

  const exp1 = doc.createExperiment(NS + '/exp1', NS);
  exp1.addMember(att1.getIdentifier());
  exp1.addMember(att2.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
