'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const doc = new SBOLDocument(NS + '/');

  const laci_p = doc.createComponent(NS + '/LacI_protein', NS, [ComponentType.Protein.iri]);
  laci_p.addRole('https://identifiers.org/GO:0003700');
  laci_p.setName('LacI');
  laci_p.setDescription('LacI protein');

  const tetr_p = doc.createComponent(NS + '/TetR_protein', NS, [ComponentType.Protein.iri]);
  tetr_p.addRole('https://identifiers.org/GO:0003700');
  tetr_p.setName('TetR');
  tetr_p.setDescription('TetR protein');

  const atc = doc.createComponent(NS + '/aTC', NS, [ComponentType.SimpleChemical.iri]);
  atc.addRole('https://identifiers.org/CHEBI:35224');
  atc.setName('aTC');
  atc.setDescription('aTC');

  const laci_prod = doc.createComponent(NS + '/LacI_producer', NS, [ComponentType.DNA.iri]);
  laci_prod.setName('LacI produce');
  laci_prod.setDescription('LacI producer');
  laci_prod.addRole('https://identifiers.org/SO:0000704');

  const sc1 = laci_prod.createSubComponent(laci_p.getIdentifier(), 'SubComponent1');
  const sc2 = laci_prod.createSubComponent(tetr_p.getIdentifier(), 'SubComponent2');
  const sc3 = laci_prod.createSubComponent(atc.getIdentifier(), 'SubComponent3');

  const iface1 = laci_prod.createInterface('Interface1');
  iface1.addInput(sc1.getIdentifier());
  iface1.addInput(sc2.getIdentifier());
  iface1.addOutput(sc1.getIdentifier());
  iface1.addNondirectional(sc3.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
