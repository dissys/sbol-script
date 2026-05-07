'use strict';

const { SBOLDocument, RDFFormat, ComponentType, Orientation, InteractionType, ParticipationType } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const SBO = 'https://identifiers.org/SBO:';
  const doc = new SBOLDocument(NS + '/');

  const e0040_seq = doc.createDNASequence(NS + '/E0040_Sequence1', NS,
    'atgcgtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactttcggttatggtgttcaatgctttgcgagatacccagatcatatgaaacagcatgactttttcaagagtgccatgcccgaaggttatgtacaggaaagaactatatttttcaaagatgacgggaactacaagacacgtgctgaagtcaagtttgaaggtgatacccttgttaatagaatcgagttaaaaggtattgattttaaagaagatggaaacattcttggacacaaattggaatacaactataactcacacaatgtatacatcatggcagacaaacaaaagaatggaatcaaagttaacttcaaaattagacacaacattgaagatggaagcgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtccacacaatctgccctttcgaaagatcccaacgaaaagagagaccacatggtccttcttgagtttgtaacagctgctgggattacacatggcatggatgaactatacaaataataa');
  e0040_seq.setName('Sequence1');
  e0040_seq.setDescription('E0040 sequence');

  const e0040 = doc.createDNAComponent(NS + '/E0040', NS);
  e0040.addRole('https://identifiers.org/SO:0000316');
  e0040.setName('gfp');
  e0040.setDescription('gfp coding sequence');
  e0040.addSequence(e0040_seq.getIdentifier());

  const TetR = doc.createProteinComponent(NS + '/TetR', NS);
  

  const gfp_start = doc.createSequence(NS + '/gfp_start', NS);

  const sf1_e0040 = e0040.createSequenceFeature('SequenceFeature1');
  const es1 = sf1_e0040.createEntireSequence(gfp_start.getIdentifier(), 'EntireSequence1');

  const gfp_p = doc.createComponent(NS + '/GFP_protein', NS, [ComponentType.Protein.iri]);
  gfp_p.setName('GFP');
  gfp_p.setDescription('GFP');

  const i13504_seq = doc.createDNASequence(NS + '/i13504_Sequence1', NS,
    'atgcgtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactttcggttatggtgttcaatgctttgcgagatacccagatcatatgaaacagcatgactttttcaagagtgccatgcccgaaggttatgtacaggaaagaactatatttttcaaagatgacgggaactacaagacacgtgctgaagtcaagtttgaaggtgatacccttgttaatagaatcgagttaaaaggtattgattttaaagaagatggaaacattcttggacacaaattggaatacaactataactcacacaatgtatacatcatggcagacaaacaaaagaatggaatcaaagttaacttcaaaattagacacaacattgaagatggaagcgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtccacacaatctgccctttcgaaagatcccaacgaaaagagagaccacatggtccttcttgagtttgtaacagctgctgggattacacatggcatggatgaactatacaaataataa');
  i13504_seq.setName('Sequence1');
  i13504_seq.setDescription('i13504 sequence');

  const i13504 = doc.createDNAComponent(NS + '/i13504', NS);
  i13504.addRole('https://identifiers.org/SO:0000704');
  i13504.addSequence(i13504_seq.getIdentifier());

  const sc_i13504 = i13504.createSubComponent(e0040.getIdentifier(), 'SubComponent1');
  sc_i13504.setOrientation(Orientation.INLINE);
  const range1 = sc_i13504.createRange(i13504_seq.getIdentifier(), 1, 720, 'Range1');
  range1.setOrientation(Orientation.INLINE);

  const i13504_system = doc.createComponent(NS + '/i13504_system', NS, [ComponentType.DNA.iri]);
  i13504_system.setName('i13504 system');
  i13504_system.addRole(SBO + '0000289');
  i13504_system.addRole('https://identifiers.org/SO:0000704');

  const sc1 = i13504_system.createSubComponent(i13504.getIdentifier(), 'SubComponent1');
  const sc2 = i13504_system.createSubComponent(gfp_p.getIdentifier(), 'SubComponent2');

  const cr1 = i13504_system.createComponentReference(sc1.getIdentifier(), sc_i13504.getIdentifier(), 'ComponentReference1');

  const int1 = i13504_system.createInteraction(InteractionType.GeneticProduction, 'Interaction1');
  const p1_1 = int1.createParticipation(ParticipationType.Template, cr1.getIdentifier(), 'Participation1');
  const p1_2 = int1.createParticipation(ParticipationType.Product, sc2.getIdentifier(), 'Participation2');

  const int2 = i13504_system.createInteraction(SBO + '0000169', 'Interaction2');
  const p2_1 = int2.createParticipation(SBO + '0000020', null, 'Participation1');
  p2_1.setHigherOrderParticipant(int1.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
