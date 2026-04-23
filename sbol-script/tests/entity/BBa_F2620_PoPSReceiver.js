'use strict';

const { SBOLDocument, RDFFormat, ComponentType, Orientation } = require('../sbolLib');

function generate() {
  const NS  = 'https://synbiohub.org/public/igem';
  const SBO = 'https://identifiers.org/SBO:';
  const SO  = 'https://identifiers.org/SO:';
  const GO  = 'https://identifiers.org/GO:';
  const doc = new SBOLDocument(NS + '/');

  const seq_b0010 = doc.createDNASequence(NS + '/BBa_B0010_Sequence1', NS,
      'ccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctc');
  seq_b0010.setName('Sequence1'); seq_b0010.setDescription('BBa_B0010 sequence');

  const seq_b0012 = doc.createDNASequence(NS + '/BBa_B0012_Sequence1', NS,
      'tcacactggctcaccttcgggtgggcctttctgcgtttata');
  seq_b0012.setName('Sequence1'); seq_b0012.setDescription('BBa_B0012 sequence');

  const seq_b0015 = doc.createDNASequence(NS + '/BBa_B0015_Sequence1', NS,
      'ccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctctcacactggctcaccttcgggtgggcctttctgcgtttata');
  seq_b0015.setName('Sequence1'); seq_b0015.setDescription('BBa_B0015 sequence');

  const seq_b0034 = doc.createDNASequence(NS + '/BBa_B0034_Sequence1', NS, 'aaagaggagaaa');
  seq_b0034.setName('Sequence1'); seq_b0034.setDescription('BBa_B0034 sequence');

  const seq_c0062 = doc.createDNASequence(NS + '/BBa_C0062_Sequence1', NS,
      'atgaaaaacataaatgccgacgacacatacagaataattaataaaattaaagcttgtagaagcaataatgatattaatcaatgcttatctgatatgactaaaatggtacattgtgaatattatttactcgcgatcatttatcctcattctatggttaaatctgatatttcaatcctagataattaccctaaaaaatggaggcaatattatgatgacgctaatttaataaaatatgatcctatagtagattattctaactccaatcattcaccaattaattggaatatatttgaaaacaatgctgtaaataaaaaatctccaaatgtaattaaagaagcgaaaacatcaggtcttatcactgggtttagtttccctattcatacggctaacaatggcttcggaatgcttagttttgcacattcagaaaaagacaactatatagatagtttatttttacatgcgtgtatgaacataccattaattgttccttctctagttgataattatcgaaaaataaatatagcaaataataaatcaaacaacgatttaaccaaaagagaaaaagaatgtttagcgtgggcatgcgaaggaaaaagctcttgggatatttcaaaaatattaggttgcagtgagcgtactgtcactttccatttaaccaatgcgcaaatgaaactcaatacaacaaaccgctgccaaagtatttctaaagcaattttaacaggagcaattgattgcccatactttaaaaattaataacactgatagtgctagtgtagatcac');
  seq_c0062.setName('Sequence1'); seq_c0062.setDescription('BBa_C0062 sequence');

  const seq_r0040 = doc.createDNASequence(NS + '/BBa_R0040_Sequence1', NS,
      'tccctatcagtgatagagattgacatccctatcagtgatagagatactgagcac');
  seq_r0040.setName('Sequence1'); seq_r0040.setDescription('BBa_R0040 sequence');

  const seq_r0062 = doc.createDNASequence(NS + '/BBa_R0062_Sequence1', NS,
      'acctgtaggatcgtacaggtttacgcaagaaaatggtttgttatagtcgaataaa');
  seq_r0062.setName('Sequence1'); seq_r0062.setDescription('BBa_R0062 sequence');

  const seq_f2620 = doc.createDNASequence(NS + '/BBa_F2620_Sequence1', NS,
      'tccctatcagtgatagagattgacatccctatcagtgatagagatactgagcacaaagaggagaaaatgaaaaacataaatgccgacgacacatacagaataattaataaaattaaagcttgtagaagcaataatgatattaatcaatgcttatctgatatgactaaaatggtacattgtgaatattatttactcgcgatcatttatcctcattctatggttaaatctgatatttcaatcctagataattaccctaaaaaatggaggcaatattatgatgacgctaatttaataaaatatgatcctatagtagattattctaactccaatcattcaccaattaattggaatatatttgaaaacaatgctgtaaataaaaaatctccaaatgtaattaaagaagcgaaaacatcaggtcttatcactgggtttagtttccctattcatacggctaacaatggcttcggaatgcttagttttgcacattcagaaaaagacaactatatagatagtttatttttacatgcgtgtatgaacataccattaattgttccttctctagttgataattatcgaaaaataaatatagcaaataataaatcaaacaacgatttaaccaaaagagaaaaagaatgtttagcgtgggcatgcgaaggaaaaagctcttgggatatttcaaaaatattaggttgcagtgagcgtactgtcactttccatttaaccaatgcgcaaatgaaactcaatacaacaaaccgctgccaaagtatttctaaagcaattttaacaggagcaattgattgcccatactttaaaaattaataacactgatagtgctagtgtagatcacccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctctcacactggctcaccttcgggtgggcctttctgcgtttataacctgtaggatcgtacaggtttacgcaagaaaatggtttgttatagtcgaataaa');
  seq_f2620.setName('Sequence1'); seq_f2620.setDescription('BBa_F2620 sequence');

  const seq_c0062_prot = doc.createProteinSequence(NS + '/BBa_C0062_protein_Sequence1', NS, 'NNNNNNNNNNN');
  seq_c0062_prot.setName('Sequence1'); seq_c0062_prot.setDescription('BBa_C0062_protein sequence');

  const seq_tetr_prot = doc.createProteinSequence(NS + '/TetR_protein_Sequence1', NS, 'NNNNNNNNNNN');
  seq_tetr_prot.setName('Sequence1'); seq_tetr_prot.setDescription('TetR_protein sequence');

  const b0010 = doc.createComponent(NS + '/BBa_B0010', NS, [ComponentType.DNA.iri]);
  b0010.setName('BBa_B0010'); b0010.setDescription('Transcriptional terminator consisting of a 64 bp stem-loop');
  b0010.addRole(SO + '0000141'); b0010.addSequence(seq_b0010.getIdentifier());

  const b0012 = doc.createComponent(NS + '/BBa_B0012', NS, [ComponentType.DNA.iri]);
  b0012.setName('BBa_B0012'); b0012.setDescription('Double terminator consisting of BBa_B0010 and BBa_B0012');
  b0012.addRole(SO + '0000141'); b0012.addSequence(seq_b0012.getIdentifier());

  const b0034 = doc.createComponent(NS + '/BBa_B0034', NS, [ComponentType.DNA.iri]);
  b0034.setName('BBa_B0034'); b0034.setDescription('RBS based on Elowitz repressilator');
  b0034.addRole(SO + '0000139'); b0034.addSequence(seq_b0034.getIdentifier());

  const c0062 = doc.createComponent(NS + '/BBa_C0062', NS, [ComponentType.DNA.iri]);
  c0062.setName('luxR'); c0062.setDescription('luxR repressor/activator,  (no LVA?)');
  c0062.addRole(SO + '0000316'); c0062.addSequence(seq_c0062.getIdentifier());

  const r0040 = doc.createComponent(NS + '/BBa_R0040', NS, [ComponentType.DNA.iri]);
  r0040.setName('pTetR'); r0040.setDescription('TetR repressible promoter');
  r0040.addRole(SO + '0000167'); r0040.addSequence(seq_r0040.getIdentifier());

  const r0062 = doc.createComponent(NS + '/BBa_R0062', NS, [ComponentType.DNA.iri]);
  r0062.setName('lux pR'); r0062.setDescription('Promoter (luxR &amp; HSL regulated -- lux pR)');
  r0062.addRole(SO + '0000167'); r0062.addSequence(seq_r0062.getIdentifier());

  const b0015 = doc.createComponent(NS + '/BBa_B0015', NS, [ComponentType.DNA.iri]);
  b0015.setName('BBa_B0015'); b0015.setDescription('Double terminator consisting of BBa_B0010 and BBa_B0012');
  b0015.addRole(SO + '0000141'); b0015.addSequence(seq_b0015.getIdentifier());

  const b15_sc1 = b0015.createSubComponent(b0010.getIdentifier(), 'SubComponent1');
  b15_sc1.setOrientation(Orientation.INLINE);
  const b15_r1 = b15_sc1.createRange(seq_b0015.getIdentifier(), 1, 80, 'Range1');
  b15_r1.setOrientation(Orientation.INLINE);

  const b15_sc2 = b0015.createSubComponent(b0012.getIdentifier(), 'SubComponent2');
  b15_sc2.setOrientation(Orientation.INLINE);
  const b15_r2 = b15_sc2.createRange(seq_b0015.getIdentifier(), 81, 121, 'Range1');
  b15_r2.setOrientation(Orientation.INLINE);

  const c0062_prot = doc.createComponent(NS + '/BBa_C0062_protein', NS, [ComponentType.Protein.iri]);
  c0062_prot.setName('LuxR'); c0062_prot.setDescription('LuxR protein');
  c0062_prot.addRole(GO + '0003700'); c0062_prot.addSequence(seq_c0062_prot.getIdentifier());

  const tetr_prot = doc.createComponent(NS + '/TetR_protein', NS, [ComponentType.Protein.iri]);
  tetr_prot.setName('TetR'); tetr_prot.setDescription('TetR protein');
  tetr_prot.addRole(GO + '0003700'); tetr_prot.addSequence(seq_tetr_prot.getIdentifier());

  const f2620 = doc.createComponent(NS + '/BBa_F2620', NS, [ComponentType.DNA.iri]);
  f2620.setName('BBa_F2620'); f2620.setDescription('PoPS Receiver');
  f2620.addRole(SO + '0000704'); f2620.addSequence(seq_f2620.getIdentifier());

  const f_sc1 = f2620.createSubComponent(c0062_prot.getIdentifier(), 'SubComponent1');
  const f_sc2 = f2620.createSubComponent(tetr_prot.getIdentifier(), 'SubComponent2');

  const f_sc3 = f2620.createSubComponent(r0040.getIdentifier(), 'SubComponent3');
  f_sc3.setOrientation(Orientation.INLINE);
  const f_r3 = f_sc3.createRange(seq_f2620.getIdentifier(), 1, 54, 'Range1');
  f_r3.setOrientation(Orientation.INLINE);

  const f_sc4 = f2620.createSubComponent(b0034.getIdentifier(), 'SubComponent4');
  f_sc4.setOrientation(Orientation.INLINE);
  const f_r4 = f_sc4.createRange(seq_f2620.getIdentifier(), 55, 66, 'Range1');
  f_r4.setOrientation(Orientation.INLINE);

  const f_sc5 = f2620.createSubComponent(c0062.getIdentifier(), 'SubComponent5');
  f_sc5.setOrientation(Orientation.INLINE);
  const f_r5 = f_sc5.createRange(seq_f2620.getIdentifier(), 67, 847, 'Range1');
  f_r5.setOrientation(Orientation.INLINE);

  const f_sc6 = f2620.createSubComponent(b0015.getIdentifier(), 'SubComponent6');
  f_sc6.setOrientation(Orientation.INLINE);
  const f_r6 = f_sc6.createRange(seq_f2620.getIdentifier(), 848, 968, 'Range1');
  f_r6.setOrientation(Orientation.INLINE);

  const f_sc7 = f2620.createSubComponent(r0062.getIdentifier(), 'SubComponent7');
  f_sc7.setOrientation(Orientation.INLINE);
  const f_r7 = f_sc7.createRange(seq_f2620.getIdentifier(), 969, 1023, 'Range1');
  f_r7.setOrientation(Orientation.INLINE);

  const f_int1 = f2620.createInteraction('Interaction1');
  f_int1.setType({ iri: SBO + '0000589' });
  f_int1.createParticipation({ iri: SBO + '0000645' }, f_sc5.getIdentifier(), 'Participation1');
  f_int1.createParticipation({ iri: SBO + '0000011' }, f_sc1.getIdentifier(), 'Participation2');

  const f_int2 = f2620.createInteraction('Interaction2');
  f_int2.setType({ iri: SBO + '0000170' });
  f_int2.createParticipation({ iri: SBO + '0000643' }, f_sc7.getIdentifier(), 'Participation1');
  f_int2.createParticipation({ iri: SBO + '0000459' }, f_sc1.getIdentifier(), 'Participation2');

  const f_int3 = f2620.createInteraction('Interaction3');
  f_int3.setType({ iri: SBO + '0000170' });
  f_int3.createParticipation({ iri: SBO + '0000643' }, f_sc3.getIdentifier(), 'Participation1');
  f_int3.createParticipation({ iri: SBO + '0000459' }, f_sc2.getIdentifier(), 'Participation2');

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
