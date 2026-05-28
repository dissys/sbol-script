'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const doc = new SBOLDocument(NS + '/');

  const agent = doc.createAgent(NS + '/CodonOptimiserSoftware', NS);
  agent.setName('Codon Optimiser Software');
  agent.setDescription('Used to optimise bacterial DNA sequences.');

  /*const plan = doc.createPlan(NS + '/CodonOptimisationProtocol', NS);
  plan.setName('Codon Optimisation Protocol');
  plan.setDescription('Optimisation protocol to improve the translation of mRNAs.');
*/
  const toggle = doc.createComponent(NS + '/toggle_switch', NS, [ComponentType.FunctionalEntity.iri]);
  toggle.setName('Toggle Switch');
  toggle.setDescription('Toggle Switch genetic circuit');

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
