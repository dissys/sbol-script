'use strict';

const { SBOLDocument, RDFFormat, ComponentType, Orientation, ConstraintRestriction } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const SBO = 'https://identifiers.org/SBO:';
  const SO  = 'https://identifiers.org/SO:';
  const GO  = 'https://identifiers.org/GO:';
  const doc = new SBOLDocument(NS + '/');

  const laci_p = doc.createComponent(NS + '/LacI_protein', NS, [ComponentType.Protein.iri]);
  laci_p.setName('LacI'); laci_p.setDescription('LacI protein');
  laci_p.addRole(GO + '0003700');

  const tetr_p = doc.createComponent(NS + '/TetR_protein', NS, [ComponentType.Protein.iri]);
  tetr_p.setName('TetR'); tetr_p.setDescription('TetR protein');
  tetr_p.addRole(GO + '0003700');

  const gfp_p = doc.createComponent(NS + '/GFP_protein', NS, [ComponentType.Protein.iri]);
  gfp_p.setName('GFP'); gfp_p.setDescription('GFP');

  const iptg = doc.createComponent(NS + '/IPTG', NS, [ComponentType.SimpleChemical.iri]);
  iptg.setName('IPTG'); iptg.setDescription('IPTG');
  iptg.addRole('https://identifiers.org/CHEBI:35224');

  const atc = doc.createComponent(NS + '/aTC', NS, [ComponentType.SimpleChemical.iri]);
  atc.setName('aTC'); atc.setDescription('aTC');
  atc.addRole('https://identifiers.org/CHEBI:35224');

  const iptg_laci = doc.createComponent(NS + '/IPTG_LacI', NS, [ComponentType.NonCovalentComplex.iri]);
  iptg_laci.setName('IPTG_LacI'); iptg_laci.setDescription('IPTG_LacI complex');

  const atc_tetr = doc.createComponent(NS + '/atC_TetR', NS, [ComponentType.NonCovalentComplex.iri]);
  atc_tetr.setName('atC_TetR'); atc_tetr.setDescription('atC_TetR complex');

  const mol1 = doc.createComponent(NS + '/molecule1', NS, [ComponentType.Protein.iri]);
  mol1.setName('Signalling Molecule 1'); mol1.setDescription('Signalling Molecule 1');
  mol1.addRole(GO + '0003700');

  const mol2 = doc.createComponent(NS + '/molecule2', NS, [ComponentType.Protein.iri]);
  mol2.setName('Signalling Molecule 2'); mol2.setDescription('Signalling Molecule 2');
  mol2.addRole(GO + '0003700');

  const pTetR = doc.createComponent(NS + '/pTetR', NS, [ComponentType.DNA.iri]);
  pTetR.setName('pTetR'); pTetR.setDescription('TetR repressible promoter');
  pTetR.addRole(SO + '0000167');

  const pLacI = doc.createComponent(NS + '/pLacI', NS, [ComponentType.DNA.iri]);
  pLacI.setName('pLacI promoter'); pLacI.setDescription('LacI repressible promoter');
  pLacI.addRole(SO + '0000167');

  const rbs_laci = doc.createComponent(NS + '/rbs_lacI', NS, [ComponentType.DNA.iri]);
  rbs_laci.setName('rbs'); rbs_laci.setDescription('RBS');
  rbs_laci.addRole(SO + '0000139');

  const rbs_gfp = doc.createComponent(NS + '/rbs_gfp', NS, [ComponentType.DNA.iri]);
  rbs_gfp.setName('rbs'); rbs_gfp.setDescription('RBS');
  rbs_gfp.addRole(SO + '0000139');

  const rbs_tetr = doc.createComponent(NS + '/rbs_tetR', NS, [ComponentType.DNA.iri]);
  rbs_tetr.setName('rbs'); rbs_tetr.setDescription('tetR RBS');
  rbs_tetr.addRole(SO + '0000139');

  const lacI = doc.createComponent(NS + '/lacI', NS, [ComponentType.DNA.iri]);
  lacI.setName('lacI'); lacI.setDescription('lacI coding sequence');
  lacI.addRole(SO + '0000316');

  const gfp = doc.createComponent(NS + '/gfp', NS, [ComponentType.DNA.iri]);
  gfp.setName('gfp'); gfp.setDescription('gfp coding sequence');
  gfp.addRole(SO + '0000316');

  const tetR = doc.createComponent(NS + '/tetR', NS, [ComponentType.DNA.iri]);
  tetR.setName('tetR'); tetR.setDescription('tetR coding sequence');
  tetR.addRole(SO + '0000316');

  const ter_laci = doc.createComponent(NS + '/ter_lacI', NS, [ComponentType.DNA.iri]);
  ter_laci.setName('lacI terminator'); ter_laci.setDescription('Terminator');
  ter_laci.addRole(SO + '0000141');

  const ter_tetr = doc.createComponent(NS + '/ter_tetR', NS, [ComponentType.DNA.iri]);
  ter_tetr.setName('tetR terminator'); ter_tetr.setDescription('Terminator');
  ter_tetr.addRole(SO + '0000141');

  const laci_prod = doc.createComponent(NS + '/LacI_producer', NS, [ComponentType.DNA.iri]);
  laci_prod.setName('LacI producer'); laci_prod.setDescription('LacI producer');
  laci_prod.addRole(SO + '0000704');

  const lp_sc1  = laci_prod.createSubComponent(pTetR.getIdentifier(), 'SubComponent1');
  lp_sc1.setOrientation(Orientation.INLINE);
  const lp_sc2  = laci_prod.createSubComponent(rbs_laci.getIdentifier(), 'SubComponent2');
  lp_sc2.setOrientation(Orientation.INLINE);
  const lp_sc3  = laci_prod.createSubComponent(lacI.getIdentifier(), 'SubComponent3');
  lp_sc3.setOrientation(Orientation.INLINE);
  const lp_sc4  = laci_prod.createSubComponent(rbs_gfp.getIdentifier(), 'SubComponent4');
  lp_sc4.setOrientation(Orientation.INLINE);
  const lp_sc5  = laci_prod.createSubComponent(gfp.getIdentifier(), 'SubComponent5');
  lp_sc5.setOrientation(Orientation.INLINE);
  const lp_sc6  = laci_prod.createSubComponent(ter_laci.getIdentifier(), 'SubComponent6');
  lp_sc6.setOrientation(Orientation.INLINE);
  const lp_sc7  = laci_prod.createSubComponent(laci_p.getIdentifier(), 'SubComponent7');
  const lp_sc8  = laci_prod.createSubComponent(gfp_p.getIdentifier(), 'SubComponent8');
  const lp_sc9  = laci_prod.createSubComponent(tetr_p.getIdentifier(), 'SubComponent9');
  const lp_sc10 = laci_prod.createSubComponent(atc.getIdentifier(), 'SubComponent10');
  const lp_sc11 = laci_prod.createSubComponent(atc_tetr.getIdentifier(), 'SubComponent11');

  const lp_int1 = laci_prod.createInteraction({ iri: SBO + '0000589' }, 'Interaction1');
  lp_int1.createParticipation({ iri: SBO + '0000645' }, lp_sc3.getIdentifier(), 'Participation1');
  lp_int1.createParticipation({ iri: SBO + '0000011' }, lp_sc7.getIdentifier(), 'Participation2');

  const lp_int2 = laci_prod.createInteraction({ iri: SBO + '0000589' }, 'Interaction2');
  lp_int2.createParticipation({ iri: SBO + '0000645' }, lp_sc5.getIdentifier(), 'Participation1');
  lp_int2.createParticipation({ iri: SBO + '0000011' }, lp_sc8.getIdentifier(), 'Participation2');

  const lp_int3 = laci_prod.createInteraction({ iri: SBO + '0000169' }, 'Interaction3');
  lp_int3.createParticipation({ iri: SBO + '0000642' }, lp_sc1.getIdentifier(), 'Participation1');
  lp_int3.createParticipation({ iri: SBO + '0000020' }, lp_sc9.getIdentifier(), 'Participation2');

  const lp_int4 = laci_prod.createInteraction({ iri: SBO + '0000177' }, 'Interaction4');
  lp_int4.createParticipation({ iri: SBO + '0000010' }, lp_sc9.getIdentifier(), 'Participation1');
  lp_int4.createParticipation({ iri: SBO + '0000010' }, lp_sc10.getIdentifier(), 'Participation2');
  lp_int4.createParticipation({ iri: SBO + '0000011' }, lp_sc11.getIdentifier(), 'Participation3');

  const tetr_prod = doc.createComponent(NS + '/TetR_producer', NS, [ComponentType.DNA.iri]);
  tetr_prod.setName('TetR device'); tetr_prod.setDescription('TetR producer');
  tetr_prod.addRole(SO + '0000704');

  const tp_sc1 = tetr_prod.createSubComponent(pLacI.getIdentifier(), 'SubComponent1');
  tp_sc1.setOrientation(Orientation.INLINE);
  const tp_sc2 = tetr_prod.createSubComponent(rbs_tetr.getIdentifier(), 'SubComponent2');
  tp_sc2.setOrientation(Orientation.INLINE);
  const tp_sc3 = tetr_prod.createSubComponent(tetR.getIdentifier(), 'SubComponent3');
  tp_sc3.setOrientation(Orientation.INLINE);
  const tp_sc4 = tetr_prod.createSubComponent(ter_tetr.getIdentifier(), 'SubComponent4');
  tp_sc4.setOrientation(Orientation.INLINE);
  const tp_sc5 = tetr_prod.createSubComponent(tetr_p.getIdentifier(), 'SubComponent5');
  const tp_sc6 = tetr_prod.createSubComponent(laci_p.getIdentifier(), 'SubComponent6');
  const tp_sc7 = tetr_prod.createSubComponent(iptg.getIdentifier(), 'SubComponent7');
  const tp_sc8 = tetr_prod.createSubComponent(iptg_laci.getIdentifier(), 'SubComponent8');

  const tp_int1 = tetr_prod.createInteraction({ iri: SBO + '0000589' }, 'Interaction1');
  tp_int1.createParticipation({ iri: SBO + '0000645' }, tp_sc3.getIdentifier(), 'Participation1');
  tp_int1.createParticipation({ iri: SBO + '0000011' }, tp_sc5.getIdentifier(), 'Participation2');

  const tp_int2 = tetr_prod.createInteraction({ iri: SBO + '0000169' }, 'Interaction2');
  tp_int2.createParticipation({ iri: SBO + '0000642' }, tp_sc1.getIdentifier(), 'Participation1');
  tp_int2.createParticipation({ iri: SBO + '0000020' }, tp_sc6.getIdentifier(), 'Participation2');

  const tp_int3 = tetr_prod.createInteraction({ iri: SBO + '0000177' }, 'Interaction3');
  tp_int3.createParticipation({ iri: SBO + '0000010' }, tp_sc6.getIdentifier(), 'Participation1');
  tp_int3.createParticipation({ iri: SBO + '0000010' }, tp_sc7.getIdentifier(), 'Participation2');
  tp_int3.createParticipation({ iri: SBO + '0000011' }, tp_sc8.getIdentifier(), 'Participation3');

  // toggle_switch (v2)
  const toggle = doc.createComponent(NS + '/toggle_switch', NS, [ComponentType.DNA.iri]);
  toggle.setName('Toggle Switch'); toggle.setDescription('Toggle Switch genetic circuit');
  toggle.addRole(SO + '0000704');

  const ts_sc1 = toggle.createSubComponent(mol1.getIdentifier(), 'SubComponent1');
  const ts_sc2 = toggle.createSubComponent(mol2.getIdentifier(), 'SubComponent2');
  const ts_sc3 = toggle.createSubComponent(laci_prod.getIdentifier(), 'SubComponent3');
  const ts_sc4 = toggle.createSubComponent(tetr_prod.getIdentifier(), 'SubComponent4');

  const ts_cr1 = toggle.createComponentReference(ts_sc3.getIdentifier(), lp_sc7.getIdentifier(), 'ComponentReference1');

  const ts_cr2 = toggle.createComponentReference(ts_sc4.getIdentifier(), tp_sc6.getIdentifier(), 'ComponentReference2');

  const ts_cr3 = toggle.createComponentReference(ts_sc3.getIdentifier(), lp_sc9.getIdentifier(), 'ComponentReference3');

  const ts_cr4 = toggle.createComponentReference(ts_sc4.getIdentifier(), tp_sc5.getIdentifier(), 'ComponentReference4');

  const ts_c1 = toggle.createConstraint(ts_cr1.getIdentifier(), ConstraintRestriction.Replaces, ts_sc1.getIdentifier(), 'Constraint1');

  /* The above replaced the following. 
  ts_c1.setRestriction(ConstraintRestriction.VerifyIdentical);
  ts_c1.setSubject(ts_cr1.getIdentifier());
  ts_c1.setObject(ts_cr2.getIdentifier());*/

  const ts_c2 = toggle.createConstraint(ts_cr2.getIdentifier(), ConstraintRestriction.Replaces, ts_sc1.getIdentifier(), 'Constraint2');
  /* The above replaced the following.
  ts_c2.setRestriction(ConstraintRestriction.VerifyIdentical);//TODO
  ts_c2.setSubject(ts_cr3.getIdentifier());//TODO
  ts_c2.setObject(ts_cr4.getIdentifier());//TODO*/

  const ts_c3 = toggle.createConstraint(ts_cr3.getIdentifier(), ConstraintRestriction.Replaces, ts_sc2.getIdentifier(), 'Constraint3');

  const ts_c4 = toggle.createConstraint(ts_cr4.getIdentifier(), ConstraintRestriction.Replaces, ts_sc2.getIdentifier(), 'Constraint4');

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
