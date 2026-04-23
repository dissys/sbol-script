'use strict';

const { SBOLDocument, RDFFormat, ComponentType, Orientation, ConstraintRestriction } = require('../sbolLib');

function generate() {
  const NS   = 'https://synbiohub.org/public/igem';
  const SBO  = 'https://identifiers.org/SBO:';
  const SO   = 'https://identifiers.org/SO:';
  const doc  = new SBOLDocument(NS + '/');

  const seq_b0015 = doc.createDNASequence(NS + '/B0015_Sequence1', NS,
      'ccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctc');
  seq_b0015.setName('Sequence1'); seq_b0015.setDescription('B0015 sequence');

  const seq_b0034 = doc.createDNASequence(NS + '/B0034_Sequence1', NS, 'aaagaggagaaa');
  seq_b0034.setName('Sequence1'); seq_b0034.setDescription('B0034 sequence');

  const seq_e0040 = doc.createDNASequence(NS + '/E0040_Sequence1', NS,
      'atgcgtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactttcggttatggtgttcaatgctttgcgagatacccagatcatatgaaacagcatgactttttcaagagtgccatgcccgaaggttatgtacaggaaagaactatatttttcaaagatgacgggaactacaagacacgtgctgaagtcaagtttgaaggtgatacccttgttaatagaatcgagttaaaaggtattgattttaaagaagatggaaacattcttggacacaaattggaatacaactataactcacacaatgtatacatcatggcagacaaacaaaagaatggaatcaaagttaacttcaaaattagacacaacattgaagatggaagcgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtccacacaatctgccctttcgaaagatcccaacgaaaagagagaccacatggtccttcttgagtttgtaacagctgctgggattacacatggcatggatgaactatacaaataataa');
  seq_e0040.setName('Sequence1'); seq_e0040.setDescription('E0040 sequence');

  const seq_i13504 = doc.createDNASequence(NS + '/i13504_Sequence1', NS,
      'aaagaggagaaatactagatgcgtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactttcggttatggtgttcaatgctttgcgagatacccagatcatatgaaacagcatgactttttcaagagtgccatgcccgaaggttatgtacaggaaagaactatatttttcaaagatgacgggaactacaagacacgtgctgaagtcaagtttgaaggtgatacccttgttaatagaatcgagttaaaaggtattgattttaaagaagatggaaacattcttggacacaaattggaatacaactataactcacacaatgtatacatcatggcagacaaacaaaagaatggaatcaaagttaacttcaaaattagacacaacattgaagatggaagcgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtccacacaatctgccctttcgaaagatcccaacgaaaagagagaccacatggtccttcttgagtttgtaacagctgctgggattacacatggcatggatgaactatacaaataataatactagagccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctc');
  seq_i13504.setName('Sequence1'); seq_i13504.setDescription('i13504 sequence');

  const b0015 = doc.createComponent(NS + '/B0015', NS, [ComponentType.DNA.iri]);
  b0015.setName('terminator'); b0015.setDescription('B0015 double terminator');
  b0015.addRole(SO + '0000141'); b0015.addSequence(seq_b0015.getIdentifier());

  const b0034 = doc.createComponent(NS + '/B0034', NS, [ComponentType.DNA.iri]);
  b0034.setName('rbs'); b0034.setDescription('RBS (Elowitz 1999)');
  b0034.addRole(SO + '0000139'); b0034.addSequence(seq_b0034.getIdentifier());

  const e0040 = doc.createComponent(NS + '/E0040', NS, [ComponentType.DNA.iri]);
  e0040.setName('gfp'); e0040.setDescription('gfp coding sequence');
  e0040.addRole(SO + '0000316'); e0040.addSequence(seq_e0040.getIdentifier());

  const gfp_p = doc.createComponent(NS + '/GFP_protein', NS, [ComponentType.Protein.iri]);
  gfp_p.setName('GFP'); gfp_p.setDescription('GFP');

  const j23101 = doc.createComponent(NS + '/j23101', NS, [ComponentType.DNA.iri]);
  j23101.addRole(SO + '0000704');

  const j23106 = doc.createComponent(NS + '/j23106', NS, [ComponentType.DNA.iri]);
  j23106.addRole(SO + '0000704');

  const i13504 = doc.createComponent(NS + '/i13504', NS, [ComponentType.DNA.iri]);
  i13504.setName('i13504'); i13504.setDescription('Screening plasmid intermediate');
  i13504.addRole(SO + '0000804'); i13504.addSequence(seq_i13504.getIdentifier());

  const i_sc1 = i13504.createSubComponent(b0034.getIdentifier(), 'SubComponent1');
  i_sc1.setOrientation(Orientation.INLINE);
  const i_r1 = i_sc1.createRange(seq_i13504.getIdentifier(), 1, 12, 'Range1');
  i_r1.setOrientation(Orientation.INLINE);

  const i_sc2 = i13504.createSubComponent(e0040.getIdentifier(), 'SubComponent2');
  i_sc2.setOrientation(Orientation.INLINE);
  const i_r2 = i_sc2.createRange(seq_i13504.getIdentifier(), 19, 738, 'Range1');
  i_r2.setOrientation(Orientation.INLINE);

  const i_sc3 = i13504.createSubComponent(b0015.getIdentifier(), 'SubComponent3');
  i_sc3.setOrientation(Orientation.INLINE);
  const i_r3 = i_sc3.createRange(seq_i13504.getIdentifier(), 747, 826, 'Range1');
  i_r3.setOrientation(Orientation.INLINE);

  const sf1 = i13504.createSequenceFeature('SequenceFeature1');
  sf1.setOrientation(Orientation.INLINE);
  const sf1_r = sf1.createRange(seq_i13504.getIdentifier(), 13, 18, 'Range1');
  sf1_r.setOrientation(Orientation.INLINE);

  const sf2 = i13504.createSequenceFeature('SequenceFeature2');
  sf2.setOrientation(Orientation.INLINE);
  const sf2_r = sf2.createRange(seq_i13504.getIdentifier(), 739, 746, 'Range1');
  sf2_r.setOrientation(Orientation.INLINE);

  const i13504_sys = doc.createComponent(NS + '/i13504_system', NS, [ComponentType.FunctionalEntity.iri]);
  i13504_sys.setName('i13504 system');
  i13504_sys.addRole(SBO + '0000289');

  const sys_sc1 = i13504_sys.createSubComponent(i13504.getIdentifier(), 'SubComponent1');
  const sys_sc2 = i13504_sys.createSubComponent(gfp_p.getIdentifier(), 'SubComponent2');

  const sys_cr1 = i13504_sys.createComponentReference('ComponentReference1');
  sys_cr1.setInChildOf(sys_sc1.getIdentifier());
  sys_cr1.setRefersTo(i_sc2.getIdentifier());

  const sys_int1 = i13504_sys.createInteraction('Interaction1');
  sys_int1.setType({ iri: SBO + '0000589' });
  sys_int1.createParticipation({ iri: SBO + '0000645' }, sys_cr1.getIdentifier(), 'Participation1');
  sys_int1.createParticipation({ iri: SBO + '0000011' }, sys_sc2.getIdentifier(), 'Participation2');

  const dev1 = doc.createComponent(NS + '/interlab16device1', NS, [ComponentType.DNA.iri]);
  dev1.addRole(SO + '0000704');

  const d1_sc1 = dev1.createSubComponent(j23101.getIdentifier(), 'SubComponent1');
  const d1_sc2 = dev1.createSubComponent(i13504_sys.getIdentifier(), 'SubComponent2');

  const d1_cr1 = dev1.createComponentReference('ComponentReference1');
  d1_cr1.setInChildOf(d1_sc2.getIdentifier());
  d1_cr1.setRefersTo(sys_sc1.getIdentifier());

  const d1_c1 = dev1.createConstraint('Constraint1');
  d1_c1.setRestriction(ConstraintRestriction.Meets);
  d1_c1.setSubject(d1_sc1.getIdentifier());
  d1_c1.setObject(d1_cr1.getIdentifier());

  const dev2 = doc.createComponent(NS + '/interlab16device2', NS, [ComponentType.DNA.iri]);
  dev2.addRole(SO + '0000704');

  const d2_sc1 = dev2.createSubComponent(j23106.getIdentifier(), 'SubComponent1');
  const d2_sc2 = dev2.createSubComponent(i13504_sys.getIdentifier(), 'SubComponent2');

  const d2_cr1 = dev2.createComponentReference('ComponentReference1');
  d2_cr1.setInChildOf(d2_sc2.getIdentifier());
  d2_cr1.setRefersTo(sys_sc1.getIdentifier());

  const d2_c1 = dev2.createConstraint('Constraint1');
  d2_c1.setRestriction(ConstraintRestriction.Meets);
  d2_c1.setSubject(d2_sc1.getIdentifier());
  d2_c1.setObject(d2_cr1.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
