'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const doc = new SBOLDocument(NS + '/');

  const laci_p = doc.createComponent(NS + '/LacI_protein', NS, [ComponentType.Protein.iri]);
  laci_p.addRole('https://identifiers.org/GO:0003700');
  laci_p.setName('LacI');
  laci_p.setDescription('LacI protein');

  const tetr_p = doc.createComponent(NS + '/TetR_protein', NS, [ComponentType.Protein.iri]);
  tetr_p.addRole('https://identifiers.org/GO:0003700');
  tetr_p.setName('TetR');
  tetr_p.setDescription('TetR protein');

  const col1 = doc.createCollection(NS + '/col1', NS);
  col1.addMember(laci_p.getIdentifier());
  col1.addMember(tetr_p.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
