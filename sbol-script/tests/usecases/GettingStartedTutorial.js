'use strict';

/**
 * COMBINE 2020 SBOL 3 Tutorial
 * October, 2020
 * This tutorial code goes with the slides at:
 * https://github.com/SynBioDex/Community-Media/blob/master/2020/IWBDA20/SBOL3-IWBDA-2020.pptx
 */

const fs   = require('fs');
const path = require('path');

const {
  SBOLDocument, RDFFormat,
  ComponentType, Orientation, InteractionType, ParticipationType, ConstraintRestriction,
  SBOLAPI, SBOLNamespaces, DNARole
} = require('../sbolLib');

// Output directory: <workspace>/output/usecases/combine2020/
const OUTPUT_DIR = path.resolve(__dirname, '../../../output/usecases/combine2020');

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
  const NS  = 'https://synbiohub.org/public/igem';
  const doc = new SBOLDocument(NS + '/');

  // ── Slide 26: GFP expression cassette ────────────────────────────────────
  // Component
  //   identity: iGEM#I13504
  //   name: "iGEM 2016 interlab reporter"
  //   description: "GFP expression cassette used for 2016 iGEM interlab"
  //   type: SBO:0000251 (DNA)
  //   role: SO:0000804 (Engineered Region)
  console.log('Creating GFP expression cassette');
  const device = SBOLAPI.createDnaComponent(doc, 'i13504', 'i13504', 'Screening plasmid intermediate', SBOLNamespaces.SO('0000804'), null);
  console.log(`Created GFP expression cassette component: ${device.getIdentifier()}`);

  // ── Slide 28: expression cassette parts ──────────────────────────────────

  // Create the RBS component
  const rbs = SBOLAPI.createDnaComponent(doc, 'B0034', 'rbs', 'RBS (Elowitz 1999)', SBOLNamespaces.SO('0000139'), 'aaagaggagaaa');

  // Start assembling the i13504 device's sequence by adding the RBS component.
  SBOLAPI.appendComponent(doc, device, rbs, Orientation.INLINE);
  console.log(`Added the RBS subcomponent: ${rbs.getIdentifier()}`);

  // Add the scar sequence between the RBS and CDS components
  const scar1 = SBOLAPI.appendSequenceFeature(doc, device, 'tactag', Orientation.INLINE);
  console.log(`Added the scar sequence between the RBS and the CDS components: ${scar1.getIdentifier()}`);

  // Create the GFP component and add it as a subcomponent to continue assembling the i13504 device.
  const gfp_na = 'atgcgtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactttcggttatggtgttcaatgctttgcgagatacccagatcatatgaaacagcatgactttttcaagagtgccatgcccgaaggttatgtacaggaaagaactatatttttcaaagatgacgggaactacaagacacgtgctgaagtcaagtttgaaggtgatacccttgttaatagaatcgagttaaaaggtattgattttaaagaagatggaaacattcttggacacaaattggaatacaactataactcacacaatgtatacatcatggcagacaaacaaaagaatggaatcaaagttaacttcaaaattagacacaacattgaagatggaagcgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtccacacaatctgccctttcgaaagatcccaacgaaaagagagaccacatggtccttcttgagtttgtaacagctgctgggattacacatggcatggatgaactatacaaataataa';
  const gfp = SBOLAPI.createDnaComponent(doc, 'E0040', 'gfp', 'gfp coding sequence', SBOLNamespaces.SO('0000316'), gfp_na);
  const gfpSubComponent = SBOLAPI.appendComponent(doc, device, gfp, Orientation.INLINE);
  console.log(`Added the GFP subcomponent ${gfp.getIdentifier()}`);

  // Add the scar between the CDS and terminator components
  const scar2 = SBOLAPI.appendSequenceFeature(doc, device, 'tactagag', Orientation.INLINE);
  console.log(`Added the scar sequence between the CDS and the terminator components: ${scar2.getIdentifier()}`);

  // Create the terminator component
  const term_na = 'ccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctc';
  const term = SBOLAPI.createDnaComponent(doc, 'B0015', 'terminator', 'B0015 double terminator', SBOLNamespaces.SO('0000141'), term_na);

  // Add the terminator as a subcomponent.
  SBOLAPI.appendComponent(doc, device, term, Orientation.INLINE);
  console.log(`Added the terminator subcomponent ${term.getIdentifier()}`);

  // ── Slide 32: GFP production from expression cassette ────────────────────
  const i13504_system = SBOLAPI.createComponentFromDisplayId(doc, 'i13504_system', ComponentType.FunctionalEntity, 'i13504 system', null, SBOLNamespaces.SBO('0000289'));
  const GFP = SBOLAPI.createComponentFromDisplayId(doc, 'GFP_protein', ComponentType.Protein, 'GFP', 'GFP', null);

  const i13504SubComponent = SBOLAPI.addSubComponent(i13504_system, device);
  const gfpProteinSubComponent = SBOLAPI.addSubComponent(i13504_system, GFP);

  // Create a ComponentReference so the GFP CDS feature inside device can be referenced
  // from i13504_system: refersTo=gfpSubComponent (feature in device), inChildOf=i13504SubComponent
  const gfpCDSReference = i13504_system.createComponentReference(i13504SubComponent.getIdentifier(), gfpSubComponent.getIdentifier());

  //const interaction = SBOLAPI. createGeneticProductionInteraction(i13504_system, gfpCDSReference.iri, gfpProteinSubComponent.iri);
  // Alternative way to create the same interaction using the more general SBOLAPI.createInteractionFromComponents() method:
  // const interaction = SBOLAPI.createInteractionFromComponents([InteractionType.GeneticProduction.iri], i13504_system, null, [ParticipationType.Template.iri], gfpCDSReference, [ParticipationType.Product.iri], gfpProteinSubComponent);

  const interaction = i13504_system.createInteraction([InteractionType.GeneticProduction]);
  interaction.createParticipation(ParticipationType.Template, gfpCDSReference.getIdentifier());
  interaction.createParticipation(ParticipationType.Product, gfpProteinSubComponent.getIdentifier());

  // ── Slide 34: Example: concatenating & reusing components ─────────────────

  // Left hand side of slide: interlab16device1
  const ilab16_dev1 = SBOLAPI.createDnaComponent(doc, 'interlab16device1', null, null, DNARole.Gene, null);
  
  const j23101 = SBOLAPI.createDnaComponent(doc, 'j23101', null, null, DNARole.Gene, null);

  const sc_j23101 = SBOLAPI.addSubComponent(ilab16_dev1, j23101);
  const sc_i13504_system = SBOLAPI.addSubComponent(ilab16_dev1, i13504_system);

  // ComponentReference: 
  //   refersTo=i13504SubComponent (device sc inside i13504_system),
  //   inChildOf=sc_i13504_system (i13504_system sc inside ilab16_dev1)
  const compRef_i13504_dev1 = ilab16_dev1.createComponentReference(sc_i13504_system.getIdentifier(), i13504SubComponent.getIdentifier());

  const c1 = ilab16_dev1.createConstraint(sc_j23101.getIdentifier(), ConstraintRestriction.Meets, compRef_i13504_dev1.getIdentifier());

  // Right hand side of slide: interlab16device2
  const ilab16_dev2 = SBOLAPI.createDnaComponent(doc, 'interlab16device2', null, null, DNARole.Gene, null);

  const j23106 = SBOLAPI.createDnaComponent(doc, 'j23106', null, null, DNARole.Gene, null);

  const sc_j23106 = SBOLAPI.addSubComponent(ilab16_dev2, j23106);
  const sc_i13504_system_dev2 = SBOLAPI.addSubComponent(ilab16_dev2, i13504_system);

  const compRef_i13504_dev2 = ilab16_dev2.createComponentReference(sc_i13504_system_dev2.getIdentifier(), i13504SubComponent.getIdentifier());

  const c2 = ilab16_dev2.createConstraint(sc_j23106.getIdentifier(), ConstraintRestriction.Meets, compRef_i13504_dev2.getIdentifier());

  const result = {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };

  saveOutputs('GettingStartedTutorial', result);

  return result;
}

module.exports = { generate };

if (require.main === module) {
  generate();
  console.log(`\nOutputs saved to ${OUTPUT_DIR}`);
}
