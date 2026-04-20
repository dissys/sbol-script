'use strict';

const { SBOLDocument, RDFFormat, ComponentType, ModelLanguage, ModelFramework } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const doc = new SBOLDocument(NS + '/');

  const model1 = doc.createModel(NS + '/model1', NS);
  model1.setSource('http://virtualparts.org');
  model1.setLanguage(ModelLanguage.SBML);
  model1.setFramework(ModelFramework.Continuous);
  model1.setNamespace('https://sbolstandard.org');
        

  const toggle_switch = doc.createComponent(NS + '/toggle_switch', NS, [ComponentType.FunctionalEntity.iri]);
  toggle_switch.setName('Toggle Switch');
  toggle_switch.setDescription('Toggle Switch genetic circuit');
  toggle_switch.addModelIRI(model1.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
