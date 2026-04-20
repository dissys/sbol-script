'use strict';

const { SBOLDocument, RDFFormat, ComponentType,
        SingularUnit, SIPrefix, PrefixedUnit, UnitDivision, UnitMultiplication, UnitExponentiation,
        Measure } = require('../sbolLib');

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const OM  = 'http://www.ontology-of-units-of-measure.org/resource/om-2/';
  const doc = new SBOLDocument(NS + '/');

  const mole = SingularUnit.create(doc.store, NS + '/mole');
  mole.setNamespace(NS);
  mole.setName('mole');
  doc.store.add($rdf.sym(mole.getIdentifier()), $rdf.sym(OM + 'label'), $rdf.literal('mole'), $rdf.defaultGraph());
  doc.store.add($rdf.sym(mole.getIdentifier()), $rdf.sym(OM + 'symbol'), $rdf.literal('mol'), $rdf.defaultGraph());

  const kelvin = SingularUnit.create(doc.store, NS + '/kelvin');
  kelvin.setNamespace(NS);
  kelvin.setName('kelvin');
  doc.store.add($rdf.sym(kelvin.getIdentifier()), $rdf.sym(OM + 'label'), $rdf.literal('kelvin'), $rdf.defaultGraph());
  doc.store.add($rdf.sym(kelvin.getIdentifier()), $rdf.sym(OM + 'symbol'), $rdf.literal('kelvin'), $rdf.defaultGraph());

  const kelvinMole = UnitMultiplication.create(doc.store, NS + '/kelvinMole');
  kelvinMole.setNamespace(NS);
  kelvinMole.setName('kelvinMole');
  kelvinMole.setHasTerm1(kelvin.getIdentifier());
  kelvinMole.setHasTerm2(mole.getIdentifier());
  doc.store.add($rdf.sym(kelvinMole.getIdentifier()), $rdf.sym(OM + 'label'), $rdf.literal('kelvinMole'), $rdf.defaultGraph());
  doc.store.add($rdf.sym(kelvinMole.getIdentifier()), $rdf.sym(OM + 'symbol'), $rdf.literal('K mol'), $rdf.defaultGraph());

  const meter = SingularUnit.create(doc.store, NS + '/meter');
  meter.setNamespace(NS);
  meter.setName('meter');
  doc.store.add($rdf.sym(meter.getIdentifier()), $rdf.sym(OM + 'label'), $rdf.literal('meter'), $rdf.defaultGraph());
  doc.store.add($rdf.sym(meter.getIdentifier()), $rdf.sym(OM + 'symbol'), $rdf.literal('m'), $rdf.defaultGraph());

  const cubicMeter = UnitExponentiation.create(doc.store, NS + '/cubicMeter');
  cubicMeter.setNamespace(NS);
  cubicMeter.setName('cubicMeter');
  cubicMeter.setHasBase(meter.getIdentifier());
  cubicMeter.setHasExponent(3);
  doc.store.add($rdf.sym(cubicMeter.getIdentifier()), $rdf.sym(OM + 'label'), $rdf.literal('cubicMeter'), $rdf.defaultGraph());
  doc.store.add($rdf.sym(cubicMeter.getIdentifier()), $rdf.sym(OM + 'symbol'), $rdf.literal('m3'), $rdf.defaultGraph());

  const litre = SingularUnit.create(doc.store, NS + '/litre');
  litre.setNamespace(NS);
  litre.setName('liter');
  litre.setDescription('The litre is a unit of volume defined as 1.0e-3 cubic metre.');
  litre.setHasFactor(0.001);
  litre.setLabel('liter');
  litre.setSymbol('l');
  litre.addAlternativeLabel('liter');
  litre.addAlternativeLabel('litre2');
  litre.addAlternativeSymbol('L');
  litre.addAlternativeSymbol('L2');
  litre.setComment('The litre is a unit of volume defined as 1.0e-3 cubic metre.');
  litre.setLongComment('This is an example long comment.'); 

  
  const milli = SIPrefix.create(doc.store, NS + '/milli');
  milli.setNamespace(NS);
  milli.setName('milli');
  milli.setDescription('Comment for the milli prefix.');
  milli.setHasFactor(0.001);
  milli.setLabel('milli');
  milli.setSymbol('m');   
  milli.addAlternativeLabel('milli1');  
  milli.addAlternativeLabel('milli2');
  milli.addAlternativeSymbol('m1');  
  milli.addAlternativeSymbol('m2');  
  milli.setComment('Comment for the milli prefix.');
  milli.setLongComment('This is an example long comment for the milli prefix.');

  const millimole = PrefixedUnit.create(doc.store, NS + '/millimole');
  millimole.setNamespace(NS);
  millimole.setName('millimole');
  millimole.setHasPrefix(milli.getIdentifier());
  millimole.setHasUnit(mole.getIdentifier());
  doc.store.add($rdf.sym(millimole.getIdentifier()), $rdf.sym(OM + 'label'), $rdf.literal('millimole'), $rdf.defaultGraph());
  doc.store.add($rdf.sym(millimole.getIdentifier()), $rdf.sym(OM + 'symbol'), $rdf.literal('mmol'), $rdf.defaultGraph());

  const mmolPerL = UnitDivision.create(doc.store, NS + '/millimolePerLitre');
  mmolPerL.setNamespace(NS);
  mmolPerL.setName('millimolar');
  mmolPerL.setHasNumerator(millimole.getIdentifier());
  mmolPerL.setHasDenominator(litre.getIdentifier());
  mmolPerL.setLabel('millimolar');
  mmolPerL.setSymbol('mmol/l');

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
  measure1.addType('https://identifiers.org/SBO:0000196'); // concentration
  measure1.addType('https://identifiers.org/SBO:0000197'); // substance concentration
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
