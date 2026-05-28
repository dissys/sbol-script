'use strict';

const { SBOLDocument, RDFFormat, ComponentType, ConstraintRestriction } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const SBO = 'https://identifiers.org/SBO:';
  const GO  = 'https://identifiers.org/GO:';
  const doc = new SBOLDocument(NS + '/');

  const ahl = doc.createComponent(NS + '/AHL', NS, [ComponentType.SimpleChemical.iri]);
  ahl.setName('AHL'); ahl.setDescription('AHL');
  ahl.addRole('https://identifiers.org/CHEBI:35224');

  const orgA = doc.createComponent(NS + '/OrganismA', NS, [GO + '0005623']);
  orgA.setName('OrganismA'); orgA.setDescription('Organism A');
  orgA.addRole(SBO + '0000290');

  const orgB = doc.createComponent(NS + '/OrganismB', NS, [GO + '0005623']);
  orgB.setName('OrganismB'); orgB.setDescription('Organism B');
  orgB.addRole(SBO + '0000290');

  const sender = doc.createComponent(NS + '/SenderSystem', NS, [ComponentType.FunctionalEntity.iri]);
  sender.setName('SenderSystem'); sender.setDescription('Sender System');
  sender.addRole(SBO + '0000289');

  const sender_sc1 = sender.createSubComponent(orgA.getIdentifier(), 'SubComponent1');
  const sender_sc2 = sender.createSubComponent(ahl.getIdentifier(), 'SubComponent2');

  const sender_c1 = sender.createConstraint(sender_sc1.getIdentifier(), ConstraintRestriction.Contains, sender_sc2.getIdentifier(), 'Constraint1');

  const receiver = doc.createComponent(NS + '/ReceiverSystem', NS, [ComponentType.FunctionalEntity.iri]);
  receiver.setName('ReceiverSystem'); receiver.setDescription('Receiver System');
  receiver.addRole(SBO + '0000289');

  const recv_sc1 = receiver.createSubComponent(orgB.getIdentifier(), 'SubComponent1');
  const recv_sc2 = receiver.createSubComponent(ahl.getIdentifier(), 'SubComponent2');

  const recv_c1 = receiver.createConstraint(recv_sc1.getIdentifier(), ConstraintRestriction.Contains, recv_sc2.getIdentifier(), 'Constraint1');

  const multi = doc.createComponent(NS + '/MulticellularSystem', NS, [ComponentType.FunctionalEntity.iri]);
  multi.setName('MulticellularSystem'); multi.setDescription('Multicellular System');
  multi.addRole(SBO + '0000289');

  const multi_sc1 = multi.createSubComponent(sender.getIdentifier(), 'SubComponent1');
  const multi_sc2 = multi.createSubComponent(receiver.getIdentifier(), 'SubComponent2');

  const cr1 = multi.createComponentReference(multi_sc1.getIdentifier(), sender_sc2.getIdentifier(), 'ComponentReference1');

  const cr2 = multi.createComponentReference(multi_sc2.getIdentifier(), recv_sc2.getIdentifier(), 'ComponentReference2');

  const multi_c1 = multi.createConstraint(cr1.getIdentifier(), ConstraintRestriction.VerifyIdentical, cr2.getIdentifier(), 'Constraint1');

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
