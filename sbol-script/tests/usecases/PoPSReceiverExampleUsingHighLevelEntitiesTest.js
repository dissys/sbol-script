'use strict';

const fs   = require('fs');
const path = require('path');
const {
  SBOLDocument, RDFFormat, Orientation,
  SBOLNamespaces
} = require('../sbolLib');

const OUTPUT_DIR = path.resolve(__dirname, '../../../output/usecases/BBa_F2620_PoPSReceiver');

function saveOutputs(name, result) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUTPUT_DIR, name + '.rdf'),         result.rdfXml);
  fs.writeFileSync(path.join(OUTPUT_DIR, name + '.ttl'),         result.turtle);
  fs.writeFileSync(path.join(OUTPUT_DIR, name + '.jsonld'),      result.jsonLd);
  fs.writeFileSync(path.join(OUTPUT_DIR, name + '.nt'),          result.nTriples);
  fs.writeFileSync(path.join(OUTPUT_DIR, name + '_ordered.nt'),  result.nTriplesOrdered);
}

function generate() {
  const NS  = 'https://synbiohub.org/public/igem';
  const doc = new SBOLDocument(NS + '/');

  // ── DNA parts ─────────────────────────────────────────────────────────────

  const popsReceiver = doc.createDNAComponent(NS + '/BBa_F2620', NS);
  popsReceiver.setName('BBa_F2620');
  popsReceiver.setDescription('PoPS Receiver');
  popsReceiver.setRole(SBOLNamespaces.SO('0000704'));

  const pTetR = doc.createDNAComponent(NS + '/BBa_R0040', NS);
  pTetR.setName('pTetR');
  pTetR.setDescription('TetR repressible promoter');
  pTetR.setRole(SBOLNamespaces.SO('0000167'));
  const pTetR_seq = doc.createDNASequence(NS + '/BBa_R0040_Sequence1', NS, 'tccctatcagtgatagagattgacatccctatcagtgatagagatactgagcac');
  pTetR_seq.setName('Sequence1');
  pTetR_seq.setDescription('BBa_R0040 sequence');
  pTetR.setSequence(pTetR_seq.getIdentifier());

  const rbs = doc.createDNAComponent(NS + '/BBa_B0034', NS);
  rbs.setName('BBa_B0034');
  rbs.setDescription('RBS based on Elowitz repressilator');
  rbs.setRole(SBOLNamespaces.SO('0000139'));
  const rbs_seq = doc.createDNASequence(NS + '/BBa_B0034_Sequence1', NS, 'aaagaggagaaa');
  rbs_seq.setName('Sequence1');
  rbs_seq.setDescription('BBa_B0034 sequence');
  rbs.setSequence(rbs_seq.getIdentifier());

  const luxR = doc.createDNAComponent(NS + '/BBa_C0062', NS);
  luxR.setName('luxR');
  luxR.setDescription('luxR repressor/activator,  (no LVA?)');
  luxR.setRole(SBOLNamespaces.SO('0000316'));
  const luxR_seq = doc.createDNASequence(NS + '/BBa_C0062_Sequence1', NS,
    'atgaaaaacataaatgccgacgacacatacagaataattaataaaattaaagcttgtagaagcaataatgatattaatcaatgcttatctgatatgactaaaatggtacattgtgaatattatttactcgcgatcatttatcctcattctatggttaaatctgatatttcaatcctagataattaccctaaaaaatggaggcaatattatgatgacgctaatttaataaaatatgatcctatagtagattattctaactccaatcattcaccaattaattggaatatatttgaaaacaatgctgtaaataaaaaatctccaaatgtaattaaagaagcgaaaacatcaggtcttatcactgggtttagtttccctattcatacggctaacaatggcttcggaatgcttagttttgcacattcagaaaaagacaactatatagatagtttatttttacatgcgtgtatgaacataccattaattgttccttctctagttgataattatcgaaaaataaatatagcaaataataaatcaaacaacgatttaaccaaaagagaaaaagaatgtttagcgtgggcatgcgaaggaaaaagctcttgggatatttcaaaaatattaggttgcagtgagcgtactgtcactttccatttaaccaatgcgcaaatgaaactcaatacaacaaaccgctgccaaagtatttctaaagcaattttaacaggagcaattgattgcccatactttaaaaattaataacactgatagtgctagtgtagatcac');
  luxR_seq.setName('Sequence1');
  luxR_seq.setDescription('BBa_C0062 sequence');
  luxR.setSequence(luxR_seq.getIdentifier());

  const doubleTerminator = doc.createDNAComponent(NS + '/BBa_B0015', NS);
  doubleTerminator.setName('BBa_B0015');
  doubleTerminator.setDescription('Double terminator consisting of BBa_B0010 and BBa_B0012');
  doubleTerminator.setRole(SBOLNamespaces.SO('0000141'));

  const pLuxR = doc.createDNAComponent(NS + '/BBa_R0062', NS);
  pLuxR.setName('lux pR');
  pLuxR.setDescription('Promoter (luxR &amp; HSL regulated -- lux pR)');
  pLuxR.setRole(SBOLNamespaces.SO('0000167'));
  const pLuxR_seq = doc.createDNASequence(NS + '/BBa_R0062_Sequence1', NS, 'acctgtaggatcgtacaggtttacgcaagaaaatggtttgttatagtcgaataaa');
  pLuxR_seq.setName('Sequence1');
  pLuxR_seq.setDescription('BBa_R0062 sequence');
  pLuxR.setSequence(pLuxR_seq.getIdentifier());

  const b0010 = doc.createDNAComponent(NS + '/BBa_B0010', NS);
  b0010.setName('BBa_B0010');
  b0010.setDescription('Transcriptional terminator consisting of a 64 bp stem-loop');
  b0010.setRole(SBOLNamespaces.SO('0000141'));
  const b0010_seq = doc.createDNASequence(NS + '/BBa_B0010_Sequence1', NS, 'ccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctc');
  b0010_seq.setName('Sequence1');
  b0010_seq.setDescription('BBa_B0010 sequence');
  b0010.setSequence(b0010_seq.getIdentifier());

  const b0012 = doc.createDNAComponent(NS + '/BBa_B0012', NS);
  b0012.setName('BBa_B0012');
  b0012.setDescription('Double terminator consisting of BBa_B0010 and BBa_B0012');
  b0012.setRole(SBOLNamespaces.SO('0000141'));
  const b0012_seq = doc.createDNASequence(NS + '/BBa_B0012_Sequence1', NS, 'tcacactggctcaccttcgggtgggcctttctgcgtttata');
  b0012_seq.setName('Sequence1');
  b0012_seq.setDescription('BBa_B0012 sequence');
  b0012.setSequence(b0012_seq.getIdentifier());

  // ── Protein parts ──────────────────────────────────────────────────────────

  const luxR_protein = doc.createProteinComponent(NS + '/BBa_C0062_protein', NS);
  luxR_protein.setName('LuxR');
  luxR_protein.setDescription('LuxR protein');
  luxR_protein.setRole(SBOLNamespaces.GO('0003700'));
  const luxR_protein_seq = doc.createProteinSequence(NS + '/BBa_C0062_protein_Sequence1', NS, 'NNNNNNNNNNN');
  luxR_protein_seq.setName('Sequence1');
  luxR_protein_seq.setDescription('BBa_C0062_protein sequence');
  luxR_protein.setSequence(luxR_protein_seq.getIdentifier());
  const luxR_protein_sc = popsReceiver.createSubComponent(luxR_protein.getIdentifier());

  const tetR_protein = doc.createProteinComponent(NS + '/TetR_protein', NS);
  tetR_protein.setName('TetR');
  tetR_protein.setDescription('TetR protein');
  tetR_protein.setRole(SBOLNamespaces.GO('0003700'));
  const tetR_protein_seq = doc.createProteinSequence(NS + '/TetR_protein_Sequence1', NS, 'NNNNNNNNNNN');
  tetR_protein_seq.setName('Sequence1');
  tetR_protein_seq.setDescription('TetR_protein sequence');
  tetR_protein.setSequence(tetR_protein_seq.getIdentifier());
  const tetR_protein_sc = popsReceiver.createSubComponent(tetR_protein.getIdentifier());

  // ── Assemble doubleTerminator ──────────────────────────────────────────────

  const doubleTerminator_seq = doc.createDNASequence(NS + '/BBa_B0015_Sequence1', NS,
    'ccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctc' +
    'tcacactggctcaccttcgggtgggcctttctgcgtttata');
  doubleTerminator_seq.setName('Sequence1');
  doubleTerminator_seq.setDescription('BBa_B0015 sequence');
  doubleTerminator.setSequence(doubleTerminator_seq.getIdentifier());

  const dt_sc_b0010 = doubleTerminator.createSubComponent(b0010.getIdentifier());
  dt_sc_b0010.setOrientation(Orientation.INLINE);
  const dt_r1 = dt_sc_b0010.createRange(doubleTerminator_seq.getIdentifier(), 1, 80, 'Range1');
  dt_r1.setOrientation(Orientation.INLINE);

  const dt_sc_b0012 = doubleTerminator.createSubComponent(b0012.getIdentifier());
  dt_sc_b0012.setOrientation(Orientation.INLINE);
  const dt_r2 = dt_sc_b0012.createRange(doubleTerminator_seq.getIdentifier(), 81, 121, 'Range1');
  dt_r2.setOrientation(Orientation.INLINE);

  // ── Assemble popsReceiver ──────────────────────────────────────────────────

  const popsReceiver_seq = doc.createDNASequence(NS + '/BBa_F2620_Sequence1', NS,
    'tccctatcagtgatagagattgacatccctatcagtgatagagatactgagcac' +
    'aaagaggagaaa' +
    'atgaaaaacataaatgccgacgacacatacagaataattaataaaattaaagcttgtagaagcaataatgatattaatcaatgcttatctgatatgactaaaatggtacattgtgaatattatttactcgcgatcatttatcctcattctatggttaaatctgatatttcaatcctagataattaccctaaaaaatggaggcaatattatgatgacgctaatttaataaaatatgatcctatagtagattattctaactccaatcattcaccaattaattggaatatatttgaaaacaatgctgtaaataaaaaatctccaaatgtaattaaagaagcgaaaacatcaggtcttatcactgggtttagtttccctattcatacggctaacaatggcttcggaatgcttagttttgcacattcagaaaaagacaactatatagatagtttatttttacatgcgtgtatgaacataccattaattgttccttctctagttgataattatcgaaaaataaatatagcaaataataaatcaaacaacgatttaaccaaaagagaaaaagaatgtttagcgtgggcatgcgaaggaaaaagctcttgggatatttcaaaaatattaggttgcagtgagcgtactgtcactttccatttaaccaatgcgcaaatgaaactcaatacaacaaaccgctgccaaagtatttctaaagcaattttaacaggagcaattgattgcccatactttaaaaattaataacactgatagtgctagtgtagatcac' +
    'ccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctc' +
    'tcacactggctcaccttcgggtgggcctttctgcgtttata' +
    'acctgtaggatcgtacaggtttacgcaagaaaatggtttgttatagtcgaataaa');
  popsReceiver_seq.setName('Sequence1');
  popsReceiver_seq.setDescription('BBa_F2620 sequence');
  popsReceiver.setSequence(popsReceiver_seq.getIdentifier());

  const sc_pTetR = popsReceiver.createSubComponent(pTetR.getIdentifier());
  sc_pTetR.setOrientation(Orientation.INLINE);
  const r_pTetR = sc_pTetR.createRange(popsReceiver_seq.getIdentifier(), 1, 54, 'Range1');
  r_pTetR.setOrientation(Orientation.INLINE);

  const sc_rbs = popsReceiver.createSubComponent(rbs.getIdentifier());
  sc_rbs.setOrientation(Orientation.INLINE);
  const r_rbs = sc_rbs.createRange(popsReceiver_seq.getIdentifier(), 55, 66, 'Range1');
  r_rbs.setOrientation(Orientation.INLINE);

  const sc_luxR = popsReceiver.createSubComponent(luxR.getIdentifier());
  sc_luxR.setOrientation(Orientation.INLINE);
  const r_luxR = sc_luxR.createRange(popsReceiver_seq.getIdentifier(), 67, 847, 'Range1');
  r_luxR.setOrientation(Orientation.INLINE);

  const sc_dt = popsReceiver.createSubComponent(doubleTerminator.getIdentifier());
  sc_dt.setOrientation(Orientation.INLINE);
  const r_dt = sc_dt.createRange(popsReceiver_seq.getIdentifier(), 848, 968, 'Range1');
  r_dt.setOrientation(Orientation.INLINE);

  const sc_pLuxR = popsReceiver.createSubComponent(pLuxR.getIdentifier());
  sc_pLuxR.setOrientation(Orientation.INLINE);
  const r_pLuxR = sc_pLuxR.createRange(popsReceiver_seq.getIdentifier(), 969, 1023, 'Range1');
  r_pLuxR.setOrientation(Orientation.INLINE);

  // ── Interactions ──────────────────────────────────────────────────────────

  // luxR (Template) → luxR_protein (Product)
  const gp_interaction = popsReceiver.createGeneticProductionInteraction('Interaction1');
  gp_interaction.createTemplateParticipation(sc_luxR.getIdentifier(), 'Participation1');
  gp_interaction.createProductParticipation(luxR_protein_sc.getIdentifier(), 'Participation2');

  // luxR_protein (Stimulator) → pLuxR (Stimulated)
  const stim1 = popsReceiver.createStimulationInteraction('Interaction2');
  stim1.createStimulatedParticipation(sc_pLuxR.getIdentifier(), 'Participation1');
  stim1.createStimulatorParticipation(luxR_protein_sc.getIdentifier(), 'Participation2');

  // tetR_protein (Stimulator) → pTetR (Stimulated)
  const stim2 = popsReceiver.createStimulationInteraction('Interaction3');
  stim2.createStimulatedParticipation(sc_pTetR.getIdentifier(), 'Participation1');
  stim2.createStimulatorParticipation(tetR_protein_sc.getIdentifier(), 'Participation2');

  const result = {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };

  saveOutputs('BBa_F2620_PoPSReceiver_HighLevelClasses', result);
  return result;
}

module.exports = { generate };

if (require.main === module) { generate(); }
