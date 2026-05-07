'use strict';

const fs   = require('fs');
const path = require('path');

const {
  SBOLDocument, RDFFormat, ComponentType, Orientation, ConstraintRestriction,
  InteractionType, ParticipationType,
  DNARole, SmallMoleculeRole,
  SBOLAPI, SBOLNamespaces,
} = require('../sbolLib');

const OUTPUT_DIR = path.resolve(__dirname, '../../../output/usecases/toggle_switch_v2');

function saveOutputs(name, result) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const files = [
    { key: 'rdfXml',          ext: '.rdf'        },
    { key: 'turtle',          ext: '.ttl'        },
    { key: 'jsonLd',          ext: '.jsonld'     },
    { key: 'nTriples',        ext: '.nt'         },
    { key: 'nTriplesOrdered', ext: '_ordered.nt' },
  ];
  for (const { key, ext } of files) {
    fs.writeFileSync(path.join(OUTPUT_DIR, name + ext), result[key] || '', 'utf8');
  }
}

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const doc = new SBOLDocument(NS + '/');

  // Standalone non-DNA components
  const tetr_p    = SBOLAPI.createComponentFromUri(doc, SBOLAPI.append(NS, 'TetR_protein'), ComponentType.Protein.iri, 'TetR', 'TetR protein', SBOLNamespaces.GO('0003700').value);
  const laci_p    = SBOLAPI.createComponentFromUri(doc, SBOLAPI.append(NS, 'LacI_protein'), ComponentType.Protein.iri, 'LacI', 'LacI protein', SBOLNamespaces.GO('0003700').value);
  const iptg      = SBOLAPI.createComponentFromUri(doc, SBOLAPI.append(NS, 'IPTG'),          ComponentType.SimpleChemical.iri, 'IPTG', 'IPTG', SmallMoleculeRole.Effector.iri);
  const atc       = SBOLAPI.createComponentFromUri(doc, SBOLAPI.append(NS, 'aTC'),           ComponentType.SimpleChemical.iri, 'aTC',  'aTC',  SmallMoleculeRole.Effector.iri);
  const iptg_laci = SBOLAPI.createComponentFromUri(doc, SBOLAPI.append(NS, 'IPTG_LacI'),     ComponentType.NonCovalentComplex.iri, 'IPTG_LacI', 'IPTG_LacI complex', null);
  const atc_tetr  = SBOLAPI.createComponentFromUri(doc, SBOLAPI.append(NS, 'atC_TetR'),      ComponentType.NonCovalentComplex.iri, 'atC_TetR',  'atC_TetR complex',  null);
  const gfp_p     = SBOLAPI.createComponentFromUri(doc, SBOLAPI.append(NS, 'GFP_protein'),   ComponentType.Protein.iri, 'GFP', 'GFP', null);
  const mol1      = SBOLAPI.createComponentFromUri(doc, SBOLAPI.append(NS, 'molecule1'),      ComponentType.Protein.iri, 'Signalling Molecule 1', 'Signalling Molecule 1', SBOLNamespaces.GO('0003700').value);
  const mol2      = SBOLAPI.createComponentFromUri(doc, SBOLAPI.append(NS, 'molecule2'),      ComponentType.Protein.iri, 'Signalling Molecule 2', 'Signalling Molecule 2', SBOLNamespaces.GO('0003700').value);

  // TetR_producer DNA parts
  const tetr_prod = SBOLAPI.createDnaComponent(doc, 'TetR_producer', 'TetR device',    'TetR producer', DNARole.Gene.iri, null);
  const pLacI     = SBOLAPI.createDnaComponent(doc, 'pLacI',         'pLacI promoter', 'LacI repressible promoter', DNARole.PROMOTER.iri, null);
  const rbs_tetr  = SBOLAPI.createDnaComponent(doc, 'rbs_tetR',      'rbs',            'tetR RBS',    DNARole.RBS.iri, null);
  const tetR      = SBOLAPI.createDnaComponent(doc, 'tetR',          'tetR',           'tetR coding sequence', DNARole.CDS.iri, null);
  const ter_tetr  = SBOLAPI.createDnaComponent(doc, 'ter_tetR',      'tetR terminator','Terminator',  DNARole.Terminator.iri, null);

  // TetR_producer assembly (SC1-SC4 DNA, SC5-SC8 non-DNA)
  SBOLAPI.appendComponent(doc, tetr_prod, pLacI);
  SBOLAPI.appendComponent(doc, tetr_prod, rbs_tetr);
  SBOLAPI.appendComponent(doc, tetr_prod, tetR);
  SBOLAPI.appendComponent(doc, tetr_prod, ter_tetr);
  SBOLAPI.addSubComponent(tetr_prod, tetr_p);
  const tp_laci_sc     = SBOLAPI.addSubComponent(tetr_prod, laci_p);
  const tp_iptg_sc     = SBOLAPI.addSubComponent(tetr_prod, iptg);
  const tp_iptglaci_sc = SBOLAPI.addSubComponent(tetr_prod, iptg_laci);

  // TetR_producer interactions
  SBOLAPI.createInteractionFromComponents([InteractionType.GeneticProduction.iri], tetr_prod, tetR,  [ParticipationType.Template.iri],  tetr_p, [ParticipationType.Product.iri]);
  SBOLAPI.createInteractionFromComponents([InteractionType.Inhibition.iri],        tetr_prod, pLacI, [ParticipationType.Inhibited.iri], laci_p, [ParticipationType.Inhibitor.iri]);
  const iptg_laci_binding = tetr_prod.createInteraction([InteractionType.NonCovalentBinding.iri]);
  SBOLAPI.createParticipation(iptg_laci_binding, [ParticipationType.Reactant.iri], tp_laci_sc);
  SBOLAPI.createParticipation(iptg_laci_binding, [ParticipationType.Reactant.iri], tp_iptg_sc);
  SBOLAPI.createParticipation(iptg_laci_binding, [ParticipationType.Product.iri],  tp_iptglaci_sc);

  // LacI_producer DNA parts
  const laci_prod = SBOLAPI.createDnaComponent(doc, 'LacI_producer', 'LacI producer', 'LacI producer', DNARole.Gene.iri, null);
  const pTetR     = SBOLAPI.createDnaComponent(doc, 'pTetR',         'pTetR',         'TetR repressible promoter', DNARole.PROMOTER.iri, null);
  const rbs_laci  = SBOLAPI.createDnaComponent(doc, 'rbs_lacI',      'rbs',           'RBS',           DNARole.RBS.iri, null);
  const lacI      = SBOLAPI.createDnaComponent(doc, 'lacI',          'lacI',          'lacI coding sequence', DNARole.CDS.iri, null);
  const rbs_gfp   = SBOLAPI.createDnaComponent(doc, 'rbs_gfp',       'rbs',           'RBS',           DNARole.RBS.iri, null);
  const gfp       = SBOLAPI.createDnaComponent(doc, 'gfp',           'gfp',           'gfp coding sequence', DNARole.CDS.iri, null);
  const ter_laci  = SBOLAPI.createDnaComponent(doc, 'ter_lacI',      'lacI terminator','Terminator',   DNARole.Terminator.iri, null);

  // LacI_producer assembly (SC1-SC6 DNA, SC7-SC11 non-DNA)
  SBOLAPI.appendComponent(doc, laci_prod, pTetR);
  SBOLAPI.appendComponent(doc, laci_prod, rbs_laci);
  SBOLAPI.appendComponent(doc, laci_prod, lacI);
  SBOLAPI.appendComponent(doc, laci_prod, rbs_gfp);
  SBOLAPI.appendComponent(doc, laci_prod, gfp);
  SBOLAPI.appendComponent(doc, laci_prod, ter_laci);
  SBOLAPI.addSubComponent(laci_prod, laci_p);
  SBOLAPI.addSubComponent(laci_prod, gfp_p);
  const lp_tetr_sc    = SBOLAPI.addSubComponent(laci_prod, tetr_p);
  const lp_atc_sc     = SBOLAPI.addSubComponent(laci_prod, atc);
  const lp_atctetr_sc = SBOLAPI.addSubComponent(laci_prod, atc_tetr);

  // LacI_producer interactions
  SBOLAPI.createInteractionFromComponents([InteractionType.GeneticProduction.iri], laci_prod, lacI,  [ParticipationType.Template.iri],  laci_p, [ParticipationType.Product.iri]);
  SBOLAPI.createInteractionFromComponents([InteractionType.GeneticProduction.iri], laci_prod, gfp,   [ParticipationType.Template.iri],  gfp_p,  [ParticipationType.Product.iri]);
  SBOLAPI.createInteractionFromComponents([InteractionType.Inhibition.iri],        laci_prod, pTetR, [ParticipationType.Inhibited.iri], tetr_p, [ParticipationType.Inhibitor.iri]);
  const atc_tetr_binding = laci_prod.createInteraction([InteractionType.NonCovalentBinding.iri]);
  SBOLAPI.createParticipation(atc_tetr_binding, [ParticipationType.Reactant.iri], lp_tetr_sc);
  SBOLAPI.createParticipation(atc_tetr_binding, [ParticipationType.Reactant.iri], lp_atc_sc);
  SBOLAPI.createParticipation(atc_tetr_binding, [ParticipationType.Product.iri],  lp_atctetr_sc);

  // Toggle switch container (v2: molecule1/molecule2 as abstract signalling proteins)
  const toggle = SBOLAPI.createComponentFromDisplayId(doc, 'toggle_switch', ComponentType.DNA.iri, 'Toggle Switch', 'Toggle Switch genetic circuit', DNARole.Gene.iri);

  SBOLAPI.addSubComponent(toggle, mol1);      // SC1 - for LacI
  SBOLAPI.addSubComponent(toggle, mol2);      // SC2 - for TetR
  SBOLAPI.addSubComponent(toggle, laci_prod); // SC3
  SBOLAPI.addSubComponent(toggle, tetr_prod); // SC4

  SBOLAPI.mapToChildSubComponent(toggle, laci_prod, laci_p, mol1);
  SBOLAPI.mapToChildSubComponent(toggle, tetr_prod, laci_p, mol1);
  SBOLAPI.mapToChildSubComponent(toggle, laci_prod, tetr_p, mol2);
  SBOLAPI.mapToChildSubComponent(toggle, tetr_prod, tetr_p, mol2);

  const result = {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };

  saveOutputs('toggle_switch_v2', result);
  return result;
}

module.exports = { generate };

if (require.main === module) {
  generate();
  console.log(`\nOutputs saved to ${OUTPUT_DIR}`);
}
