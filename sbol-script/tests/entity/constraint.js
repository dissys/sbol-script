'use strict';

const { SBOLDocument, RDFFormat, ComponentType, ConstraintRestriction } = require('../sbolLib');

function generate() {
  const NS  = 'https://synbiohub.org/public/igem';
  const SBO = 'https://identifiers.org/SBO:';
  const doc = new SBOLDocument(NS + '/');

  const i13504 = doc.createComponent(NS + '/i13504', NS, [ComponentType.DNA.iri]);
  i13504.setDescription('Screening plasmid intermediate');
  i13504.setName('i13504');
  i13504.addRole('https://identifiers.org/SO:0000704');

  const i13504_system = doc.createComponent(NS + '/i13504_system', NS, [ComponentType.FunctionalEntity.iri]);
  i13504_system.setName('i13504 system');
  i13504_system.addRole(SBO + '0000289');

  const sc1_sys = i13504_system.createSubComponent(i13504.getIdentifier(), 'SubComponent1');

  const j23101 = doc.createComponent(NS + '/j23101', NS, [ComponentType.DNA.iri]);
  j23101.addRole('https://identifiers.org/SO:0000704');

  const device = doc.createComponent(NS + '/interlab16device1', NS, [ComponentType.DNA.iri]);
  device.addRole('https://identifiers.org/SO:0000704');

  const sc1 = device.createSubComponent(i13504_system.getIdentifier(), 'SubComponent1');
  const sc2 = device.createSubComponent(j23101.getIdentifier(), 'SubComponent2');

  const cr1 = device.createComponentReference(sc1.getIdentifier(), sc1_sys.getIdentifier(), 'ComponentReference1');

  const c1 = device.createConstraint('Constraint1');
  c1.setRestriction(ConstraintRestriction.Meets);
  c1.setSubject(sc2.getIdentifier());
  c1.setObject(cr1.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
