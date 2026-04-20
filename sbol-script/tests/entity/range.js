'use strict';

const { SBOLDocument, RDFFormat, Orientation } = require('../sbolLib');

function generate() {
  const NS  = 'https://synbiohub.org/public/igem';
  const doc = new SBOLDocument(NS + '/');

  const seq_b0015 = doc.createDNASequence(NS + '/B0015_Sequence1', NS,
    'ccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctc');
  seq_b0015.setName('Sequence1');
  seq_b0015.setDescription('B0015 sequence');

  const b0015 = doc.createDNAComponent(NS + '/B0015', NS);
  b0015.addRole('https://identifiers.org/SO:0000141');
  b0015.setName('terminator');
  b0015.setDescription('B0015 double terminator');
  b0015.addSequence(seq_b0015.getIdentifier());

  const seq_i13504 = doc.createDNASequence(NS + '/i13504_Sequence1', NS,
    'ccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctc');
  seq_i13504.setName('Sequence1');
  seq_i13504.setDescription('i13504 sequence');

  const i13504 = doc.createDNAComponent(NS + '/i13504', NS);
  i13504.addRole('https://identifiers.org/SO:0000704');
  i13504.addSequence(seq_i13504.getIdentifier());

  const sc1 = i13504.createSubComponent(b0015.getIdentifier(), 'SubComponent1');
  sc1.setOrientation(Orientation.INLINE);
  const range1 = sc1.createRange(1, 80, 'Range1');
  range1.setSequenceIRI(seq_i13504.getIdentifier());
  range1.setOrientation(Orientation.INLINE);
  range1.setOrder(1);

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
