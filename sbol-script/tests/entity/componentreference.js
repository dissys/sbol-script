'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS  = 'https://synbiohub.org/public/igem';
  const SBO = 'https://identifiers.org/SBO:';
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

  const i13504 = doc.createComponent(NS + '/i13504', NS, [ComponentType.DNA.iri]);
  i13504.addRole('https://identifiers.org/SO:0000704');

  const i13504_system = doc.createComponent(NS + '/i13504_system', NS, [ComponentType.DNA.iri]);
  i13504_system.setName('i13504 system');
  i13504_system.addRole(SBO + '0000289');
  i13504_system.addRole('https://identifiers.org/SO:0000704');

  const sc1_sys = i13504_system.createSubComponent(i13504.getIdentifier(), 'SubComponent1');

  const seq_simple = doc.createDNASequence(NS + '/simpleDevice_Sequence1', NS, '');
  seq_simple.setName('Sequence1');
  seq_simple.setDescription('simpleDevice sequence');

  const simpleDevice = doc.createComponent(NS + '/simpleDevice', NS, [ComponentType.DNA.iri]);
  simpleDevice.addRole('https://identifiers.org/SO:0000704');
  simpleDevice.addSequence(seq_simple.getIdentifier());
  simpleDevice.createSubComponent(b0015.getIdentifier(), 'SubComponent1');

  const device = doc.createComponent(NS + '/interlab16device1', NS, [ComponentType.DNA.iri]);
  device.addRole('https://identifiers.org/SO:0000704');

  const sc1 = device.createSubComponent(i13504_system.getIdentifier(), 'SubComponent1');

  const cr1 = device.createComponentReference('ComponentReference1');
  cr1.setInChildOf(sc1.getIdentifier());
  cr1.setRefersTo(sc1_sys.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
