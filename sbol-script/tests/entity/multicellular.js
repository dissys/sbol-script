'use strict';

const { SBOLDocument, RDFFormat, ComponentType, Orientation, ConstraintRestriction } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const SBO = 'https://identifiers.org/SBO:';
  const SO  = 'https://identifiers.org/SO:';
  const GO  = 'https://identifiers.org/GO:';
  const doc = new SBOLDocument(NS + '/');

  const ahl = doc.createComponent(NS + '/AHL', NS, [ComponentType.SimpleChemical.iri]);
  ahl.setName('AHL'); ahl.setDescription('AHL');
  ahl.addRole('https://identifiers.org/CHEBI:35224');

  const gfp_p = doc.createComponent(NS + '/GFP_protein', NS, [ComponentType.Protein.iri]);
  gfp_p.setName('GFP'); gfp_p.setDescription('GFP');

  const luxr_ahl = doc.createComponent(NS + '/LuxR_AHL', NS, [ComponentType.Protein.iri]);
  luxr_ahl.setName('LuxR_AHL'); luxr_ahl.setDescription('LuxR_AHL complex');
  luxr_ahl.addRole(GO + '0003700');

  const luxr_p = doc.createComponent(NS + '/LuxR_protein', NS, [ComponentType.Protein.iri]);
  luxr_p.setName('LuxR_protein'); luxr_p.setDescription('LuxR');
  luxr_p.addRole(GO + '0003700');

  const orgA = doc.createComponent(NS + '/OrganismA', NS, [GO + '0005623']);
  orgA.setName('OrganismA'); orgA.setDescription('Organism A');
  orgA.addRole(SBO + '0000290');

  const orgB = doc.createComponent(NS + '/OrganismB', NS, [GO + '0005623']);
  orgB.setName('OrganismB'); orgB.setDescription('Organism B');
  orgB.addRole(SBO + '0000290');

  const gfp = doc.createComponent(NS + '/gfp', NS, [ComponentType.DNA.iri]);
  gfp.setName('gfp'); gfp.setDescription('gfp coding sequence');
  gfp.addRole(SO + '0000316');

  const luxI = doc.createComponent(NS + '/luxI', NS, [ComponentType.DNA.iri]);
  luxI.setName('luxI'); luxI.setDescription('luxI coding sequence');
  luxI.addRole(SO + '0000316');

  const luxR = doc.createComponent(NS + '/luxR', NS, [ComponentType.DNA.iri]);
  luxR.setName('luxR'); luxR.setDescription('luxR coding sequence');
  luxR.addRole(SO + '0000316');

  const pConstLuxI = doc.createComponent(NS + '/pConstLuxI', NS, [ComponentType.DNA.iri]);
  pConstLuxI.setName('pConstLuxI'); pConstLuxI.setDescription('Constitutive promoter');
  pConstLuxI.addRole(SO + '0000167');

  const pConstLuxR = doc.createComponent(NS + '/pConstLuxR', NS, [ComponentType.DNA.iri]);
  pConstLuxR.setName('pLuxR'); pConstLuxR.setDescription('Constituve promoter');
  pConstLuxR.addRole(SO + '0000167');

  const pLuxR = doc.createComponent(NS + '/pLuxR', NS, [ComponentType.DNA.iri]);
  pLuxR.setName('pLuxR'); pLuxR.setDescription('LuxR inducible promoter');
  pLuxR.addRole(SO + '0000167');

  const rbs_gfp = doc.createComponent(NS + '/rbs_gfp', NS, [ComponentType.DNA.iri]);
  rbs_gfp.setName('rbs'); rbs_gfp.setDescription('RBS');
  rbs_gfp.addRole(SO + '0000139');

  const rbs_luxI = doc.createComponent(NS + '/rbs_luxI', NS, [ComponentType.DNA.iri]);
  rbs_luxI.setName('rbs'); rbs_luxI.setDescription('RBS');
  rbs_luxI.addRole(SO + '0000139');

  const rbs_luxR = doc.createComponent(NS + '/rbs_luxR', NS, [ComponentType.DNA.iri]);
  rbs_luxR.setName('rbs'); rbs_luxR.setDescription('RBS');
  rbs_luxR.addRole(SO + '0000139');

  const ter_gfp = doc.createComponent(NS + '/ter_gfp', NS, [ComponentType.DNA.iri]);
  ter_gfp.setName('gfp terminator'); ter_gfp.setDescription('Terminator');
  ter_gfp.addRole(SO + '0000141');

  const ter_luxI = doc.createComponent(NS + '/ter_luxI', NS, [ComponentType.DNA.iri]);
  ter_luxI.setName('luxI terminator'); ter_luxI.setDescription('Terminator');
  ter_luxI.addRole(SO + '0000141');

  const ter_luxR = doc.createComponent(NS + '/ter_luxR', NS, [ComponentType.DNA.iri]);
  ter_luxR.setName('luxR terminator'); ter_luxR.setDescription('Terminator');
  ter_luxR.addRole(SO + '0000141');

  // AHL_producer
  const ahl_prod = doc.createComponent(NS + '/AHL_producer', NS, [ComponentType.DNA.iri]);
  ahl_prod.setName('AHL producer'); ahl_prod.setDescription('AHL producer');
  ahl_prod.addRole(SO + '0000704');

  const ap_sc1 = ahl_prod.createSubComponent(pConstLuxI.getIdentifier(), 'SubComponent1');
  ap_sc1.setOrientation(Orientation.INLINE);
  const ap_sc2 = ahl_prod.createSubComponent(rbs_luxI.getIdentifier(), 'SubComponent2');
  ap_sc2.setOrientation(Orientation.INLINE);
  const ap_sc3 = ahl_prod.createSubComponent(luxI.getIdentifier(), 'SubComponent3');
  ap_sc3.setOrientation(Orientation.INLINE);
  const ap_sc4 = ahl_prod.createSubComponent(ter_luxI.getIdentifier(), 'SubComponent4');
  ap_sc4.setOrientation(Orientation.INLINE);
  const ap_sc5 = ahl_prod.createSubComponent(ahl.getIdentifier(), 'SubComponent5');

  const ap_int1 = ahl_prod.createInteraction('Interaction1');
  ap_int1.setType({ iri: SBO + '0000589' });
  ap_int1.createParticipation({ iri: SBO + '0000645' }, ap_sc3.getIdentifier(), 'Participation1');
  ap_int1.createParticipation({ iri: SBO + '0000011' }, ap_sc5.getIdentifier(), 'Participation2');

  // AHL_receiver
  const ahl_recv = doc.createComponent(NS + '/AHL_receiver', NS, [ComponentType.DNA.iri]);
  ahl_recv.setName('AHL receiver'); ahl_recv.setDescription('AHL receiver');
  ahl_recv.addRole(SO + '0000704');

  const ar_sc1  = ahl_recv.createSubComponent(pConstLuxR.getIdentifier(), 'SubComponent1');
  ar_sc1.setOrientation(Orientation.INLINE);
  const ar_sc2  = ahl_recv.createSubComponent(rbs_luxR.getIdentifier(), 'SubComponent2');
  ar_sc2.setOrientation(Orientation.INLINE);
  const ar_sc3  = ahl_recv.createSubComponent(luxR.getIdentifier(), 'SubComponent3');
  ar_sc3.setOrientation(Orientation.INLINE);
  const ar_sc4  = ahl_recv.createSubComponent(ter_luxR.getIdentifier(), 'SubComponent4');
  ar_sc4.setOrientation(Orientation.INLINE);
  const ar_sc5  = ahl_recv.createSubComponent(pLuxR.getIdentifier(), 'SubComponent5');
  ar_sc5.setOrientation(Orientation.INLINE);
  const ar_sc6  = ahl_recv.createSubComponent(rbs_gfp.getIdentifier(), 'SubComponent6');
  ar_sc6.setOrientation(Orientation.INLINE);
  const ar_sc7  = ahl_recv.createSubComponent(gfp.getIdentifier(), 'SubComponent7');
  ar_sc7.setOrientation(Orientation.INLINE);
  const ar_sc8  = ahl_recv.createSubComponent(ter_gfp.getIdentifier(), 'SubComponent8');
  ar_sc8.setOrientation(Orientation.INLINE);
  const ar_sc9  = ahl_recv.createSubComponent(ahl.getIdentifier(), 'SubComponent9');
  const ar_sc10 = ahl_recv.createSubComponent(luxr_p.getIdentifier(), 'SubComponent10');
  const ar_sc11 = ahl_recv.createSubComponent(gfp_p.getIdentifier(), 'SubComponent11');
  const ar_sc12 = ahl_recv.createSubComponent(luxr_ahl.getIdentifier(), 'SubComponent12');

  const ar_int1 = ahl_recv.createInteraction('Interaction1');
  ar_int1.setType({ iri: SBO + '0000589' });
  ar_int1.createParticipation({ iri: SBO + '0000645' }, ar_sc3.getIdentifier(), 'Participation1');
  ar_int1.createParticipation({ iri: SBO + '0000011' }, ar_sc10.getIdentifier(), 'Participation2');

  const ar_int2 = ahl_recv.createInteraction('Interaction2');
  ar_int2.setType({ iri: SBO + '0000589' });
  ar_int2.createParticipation({ iri: SBO + '0000645' }, ar_sc7.getIdentifier(), 'Participation1');
  ar_int2.createParticipation({ iri: SBO + '0000011' }, ar_sc11.getIdentifier(), 'Participation2');

  const ar_int3 = ahl_recv.createInteraction('Interaction3');
  ar_int3.setType({ iri: SBO + '0000170' });
  ar_int3.createParticipation({ iri: SBO + '0000643' }, ar_sc5.getIdentifier(), 'Participation1');
  ar_int3.createParticipation({ iri: SBO + '0000459' }, ar_sc12.getIdentifier(), 'Participation2');

  const ar_int4 = ahl_recv.createInteraction('Interaction4');
  ar_int4.setType({ iri: SBO + '0000177' });
  ar_int4.createParticipation({ iri: SBO + '0000010' }, ar_sc10.getIdentifier(), 'Participation1');
  ar_int4.createParticipation({ iri: SBO + '0000010' }, ar_sc9.getIdentifier(), 'Participation2');
  ar_int4.createParticipation({ iri: SBO + '0000011' }, ar_sc12.getIdentifier(), 'Participation3');

  // SenderSystem
  const sender = doc.createComponent(NS + '/SenderSystem', NS, [ComponentType.FunctionalEntity.iri]);
  sender.setName('SenderSystem'); sender.setDescription('Sender System');
  sender.addRole(SBO + '0000289');

  const s_sc1 = sender.createSubComponent(orgA.getIdentifier(), 'SubComponent1');
  const s_sc2 = sender.createSubComponent(ahl.getIdentifier(), 'SubComponent2');
  const s_sc3 = sender.createSubComponent(ahl_prod.getIdentifier(), 'SubComponent3');

  const s_cr1 = sender.createComponentReference('ComponentReference1');
  s_cr1.setInChildOf(s_sc3.getIdentifier());
  s_cr1.setRefersTo(ap_sc5.getIdentifier());

  const s_c1 = sender.createConstraint('Constraint1');
  s_c1.setRestriction(ConstraintRestriction.Contains);
  s_c1.setSubject(s_sc1.getIdentifier());
  s_c1.setObject(s_sc2.getIdentifier());

  const s_c2 = sender.createConstraint('Constraint2');
  s_c2.setRestriction(ConstraintRestriction.Contains);
  s_c2.setSubject(s_sc1.getIdentifier());
  s_c2.setObject(s_sc3.getIdentifier());

  const s_c3 = sender.createConstraint('Constraint3');
  s_c3.setRestriction(ConstraintRestriction.VerifyIdentical);
  s_c3.setSubject(s_cr1.getIdentifier());
  s_c3.setObject(s_sc2.getIdentifier());

  // ReceiverSystem
  const receiver = doc.createComponent(NS + '/ReceiverSystem', NS, [ComponentType.FunctionalEntity.iri]);
  receiver.setName('ReceiverSystem'); receiver.setDescription('Receiver System');
  receiver.addRole(SBO + '0000289');

  const r_sc1 = receiver.createSubComponent(orgB.getIdentifier(), 'SubComponent1');
  const r_sc2 = receiver.createSubComponent(ahl.getIdentifier(), 'SubComponent2');
  const r_sc3 = receiver.createSubComponent(ahl_recv.getIdentifier(), 'SubComponent3');

  const r_cr1 = receiver.createComponentReference('ComponentReference1');
  r_cr1.setInChildOf(r_sc3.getIdentifier());
  r_cr1.setRefersTo(ar_sc9.getIdentifier());

  const r_c1 = receiver.createConstraint('Constraint1');
  r_c1.setRestriction(ConstraintRestriction.Contains);
  r_c1.setSubject(r_sc1.getIdentifier());
  r_c1.setObject(r_sc2.getIdentifier());

  const r_c2 = receiver.createConstraint('Constraint2');
  r_c2.setRestriction(ConstraintRestriction.Contains);
  r_c2.setSubject(r_sc1.getIdentifier());
  r_c2.setObject(r_sc3.getIdentifier());

  const r_c3 = receiver.createConstraint('Constraint3');
  r_c3.setRestriction(ConstraintRestriction.VerifyIdentical);
  r_c3.setSubject(r_cr1.getIdentifier());
  r_c3.setObject(r_sc2.getIdentifier());

  // MulticellularSystem
  const multi = doc.createComponent(NS + '/MulticellularSystem', NS, [ComponentType.FunctionalEntity.iri]);
  multi.setName('MulticellularSystem'); multi.setDescription('Multicellular System');
  multi.addRole(SBO + '0000289');

  const m_sc1 = multi.createSubComponent(sender.getIdentifier(), 'SubComponent1');
  const m_sc2 = multi.createSubComponent(receiver.getIdentifier(), 'SubComponent2');

  const m_cr1 = multi.createComponentReference('ComponentReference1');
  m_cr1.setInChildOf(m_sc1.getIdentifier());
  m_cr1.setRefersTo(s_sc2.getIdentifier());

  const m_cr2 = multi.createComponentReference('ComponentReference2');
  m_cr2.setInChildOf(m_sc2.getIdentifier());
  m_cr2.setRefersTo(r_sc2.getIdentifier());

  const m_c1 = multi.createConstraint('Constraint1');
  m_c1.setRestriction(ConstraintRestriction.VerifyIdentical);
  m_c1.setSubject(m_cr1.getIdentifier());
  m_c1.setObject(m_cr2.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
