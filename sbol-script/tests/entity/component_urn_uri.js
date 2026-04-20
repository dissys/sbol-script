'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS_IRI   = 'urn:uuid:246d7405-19bb-4722-9f98-939165f6ef00';
  const COMP_IRI = 'urn:uuid:71d71541-4282-4bf6-89f2-779814288e52';

  const doc = new SBOLDocument(NS_IRI + '/');

  const tetr = doc.createComponent(COMP_IRI, NS_IRI, [ComponentType.Protein.iri]);
  tetr.setName('TetR');

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
