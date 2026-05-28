'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS   = 'https://sbolstandard.org/examples';
  const SBOL = 'http://sbols.org/v3#';
  const doc  = new SBOLDocument(NS + '/');

  const plan = doc.createPlan(NS + '/CodonOptimisationProtocol', NS);
  plan.setName('Codon Optimisation Protocol');
  plan.setDescription('Optimisation protocol to improve the translation of mRNAs.');

  const agent = doc.createAgent(NS + '/CodonOptimiserSoftware', NS);
  agent.setName('Codon Optimiser Software');
  agent.setDescription('Used to optimise bacterial DNA sequences.');

  const toggle = doc.createComponent(NS + '/toggle_switch', NS, [ComponentType.FunctionalEntity.iri]);
  toggle.setName('Toggle Switch');
  toggle.setDescription('Toggle Switch genetic circuit');

  const toggle_opt = doc.createComponent(NS + '/toggle_switch_optimised', NS, [ComponentType.FunctionalEntity.iri]);
  toggle_opt.setName('Toggle Switch Optimised');
  toggle_opt.setDescription('Toggle Switch genetic circuit - codon optimised');
  toggle_opt.addWasDerivedFrom(toggle.getIdentifier());

  const act = doc.createActivity(NS + '/codon_optimization_activity', NS);
  act.setName('Codon optimization activity');
  act.setDescription('An activity that is used to optimise codons');
  act.setStartedAtTime('2019-07-29T16:50:59Z');
  act.setEndedAtTime('2019-08-30T00:00:00Z');

  doc.store.add(
    $rdf.sym(act.getIdentifier()),
    $rdf.sym(SBOL + 'type'),
    $rdf.sym(SBOL + 'design'),
    $rdf.defaultGraph()
  );

  const u1 = act.createUsage(toggle.getIdentifier(), 'Usage1');
  u1.addHadRole({ iri: SBOL + 'learn' });

  const u2 = act.createUsage(toggle_opt.getIdentifier(), 'Usage2');
  u2.addHadRole({ iri: SBOL + 'design' });

  const assoc = act.createAssociation(agent.getIdentifier(), 'Association1');
  assoc.setHadPlan(plan.getIdentifier());
  assoc.addHadRole({ iri: SBOL + 'design' });

  toggle_opt.setWasGeneratedBy(act.getIdentifier());

  const rbs_act = doc.createActivity(NS + '/RBS_optimisation_activity', NS);
  rbs_act.setName('RBS optimization activity');
  rbs_act.setDescription('An activity that is used to RBSs');
  rbs_act.addWasInformedBy(act.getIdentifier());

  doc.store.add(
    $rdf.sym(rbs_act.getIdentifier()),
    $rdf.sym(SBOL + 'type'),
    $rdf.sym(SBOL + 'design'),
    $rdf.defaultGraph()
  );

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
