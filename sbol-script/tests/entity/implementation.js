'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const doc = new SBOLDocument(NS + '/');

  const tetr_p = doc.createComponent(NS + '/TetR_protein', NS, [ComponentType.Protein.iri]);
  tetr_p.addRole('https://identifiers.org/GO:0003700');
  tetr_p.setName('TetR');
  tetr_p.setDescription('TetR protein');

  const impl1 = doc.createImplementation(NS + '/impl1', NS);
  impl1.setBuilt(tetr_p.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
