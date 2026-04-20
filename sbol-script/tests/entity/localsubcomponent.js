'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const doc = new SBOLDocument(NS + '/');

  const i13504_system = doc.createComponent(NS + '/i13504_system', NS, [ComponentType.DNA.iri]);
  i13504_system.setName('i13504 system');
  i13504_system.addRole('https://identifiers.org/SO:0000804');

  const lsc1 = i13504_system.createLocalSubComponent('LocalSubComponent1');
  lsc1.addType(ComponentType.DNA);
  lsc1.addRole('https://identifiers.org/SO:0000316');

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
