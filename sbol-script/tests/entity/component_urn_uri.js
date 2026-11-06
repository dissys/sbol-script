'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  // Must match the UUIDs in the libSBOLj3 reference output, which generates
  // random UUIDs on each run (Component_with_URN_URI_Test.java).
  const NS_IRI   = 'urn:uuid:1832db29-1a27-4fee-97da-f910bdf413b3';
  const COMP_IRI = 'urn:uuid:5cc1a915-15e1-469d-91c6-7a4e2f633fef';

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
