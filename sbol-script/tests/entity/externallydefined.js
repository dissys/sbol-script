'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const doc = new SBOLDocument(NS + '/');

  const device = doc.createComponent(NS + '/interlab16device1', NS, [ComponentType.FunctionalEntity.iri]);

  const ed1 = device.createExternallyDefined('ExternallyDefined1');
  ed1.setDefinition('http://uniprot.org/gfp');
  ed1.addType(ComponentType.Protein);

  const ed2 = device.createExternallyDefined('ExternallyDefined2');
  ed2.setDefinition('http://uniprot.org/rfp');
  ed2.addType(ComponentType.Protein);

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
