'use strict';

const { SBOLDocument, RDFFormat, ComponentType,
        SingularUnit, SIPrefix, PrefixedUnit, UnitDivision, Measure } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const OM  = 'http://www.ontology-of-units-of-measure.org/resource/om-2/';
  const doc = new SBOLDocument(NS + '/');

  const mole = SingularUnit.create(doc.store, OM + 'mole');
  mole.setNamespace(OM.slice(0, -1));
  mole.setName('mole');
  doc.store.add($rdf.sym(mole.getIdentifier()), $rdf.sym(OM + 'label'), $rdf.literal('mole'), $rdf.defaultGraph());
  doc.store.add($rdf.sym(mole.getIdentifier()), $rdf.sym(OM + 'symbol'), $rdf.literal('mol'), $rdf.defaultGraph());

  const litre = SingularUnit.create(doc.store, OM + 'litre');
  litre.setNamespace(OM.slice(0, -1));
  litre.setName('liter');
  doc.store.add($rdf.sym(litre.getIdentifier()), $rdf.sym(OM + 'label'), $rdf.literal('liter'), $rdf.defaultGraph());
  doc.store.add($rdf.sym(litre.getIdentifier()), $rdf.sym(OM + 'symbol'), $rdf.literal('l'), $rdf.defaultGraph());

  const milli = SIPrefix.create(doc.store, OM + 'milli');
  milli.setNamespace(OM.slice(0, -1));
  milli.setName('milli');
  milli.setHasFactor(0.001);
  doc.store.add($rdf.sym(milli.getIdentifier()), $rdf.sym(OM + 'label'), $rdf.literal('milli'), $rdf.defaultGraph());
  doc.store.add($rdf.sym(milli.getIdentifier()), $rdf.sym(OM + 'symbol'), $rdf.literal('m'), $rdf.defaultGraph());

  const millimole = PrefixedUnit.create(doc.store, OM + 'millimole');
  millimole.setNamespace(OM.slice(0, -1));
  millimole.setName('millimole');
  millimole.setHasPrefix(milli.getIdentifier());
  millimole.setHasUnit(mole.getIdentifier());
  doc.store.add($rdf.sym(millimole.getIdentifier()), $rdf.sym(OM + 'label'), $rdf.literal('millimole'), $rdf.defaultGraph());
  doc.store.add($rdf.sym(millimole.getIdentifier()), $rdf.sym(OM + 'symbol'), $rdf.literal('mmol'), $rdf.defaultGraph());

  const mmolPerL = UnitDivision.create(doc.store, OM + 'millimolePerLitre');
  mmolPerL.setNamespace(OM.slice(0, -1));
  mmolPerL.setName('millimolar');
  mmolPerL.setHasNumerator(millimole.getIdentifier());
  mmolPerL.setHasDenominator(litre.getIdentifier());
  doc.store.add($rdf.sym(mmolPerL.getIdentifier()), $rdf.sym(OM + 'label'), $rdf.literal('millimolar'), $rdf.defaultGraph());
  doc.store.add($rdf.sym(mmolPerL.getIdentifier()), $rdf.sym(OM + 'symbol'), $rdf.literal('mmol/l'), $rdf.defaultGraph());

  const m9 = doc.createComponent(NS + '/M9_Glucose_CAA', NS, [ComponentType.FunctionalEntity.iri]);
  m9.setName('M9 Glucose CAA');
  m9.setDescription('M9 Glucose CAA growth media');

  const ed1 = m9.createExternallyDefined('ExternallyDefined1');
  ed1.setDefinition('https://identifiers.org/CHEBI:3312');
  ed1.addType(ComponentType.SimpleChemical);

  const measureIRI = NS + '/M9_Glucose_CAA/ExternallyDefined1/measure1';
  const measure1 = Measure.create(doc.store, measureIRI);
  measure1.setDisplayId('measure1');
  measure1.setHasNumericalValue(0.1);
  measure1.setHasUnit(mmolPerL.getIdentifier());
  ed1.addMeasureIRI(measureIRI);

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
