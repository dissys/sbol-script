'use strict';

const { SBOLDocument, RDFFormat, ComponentType } = require('../sbolLib');

function generate() {
  const NS  = 'https://synbiohub.org/public/igem';
  const doc = new SBOLDocument(NS + '/');

  const bba_f2620 = doc.createComponent(NS + '/BBa_F2620', NS, [ComponentType.DNA.iri]);
  bba_f2620.addRole('https://identifiers.org/SO:0000704');
  bba_f2620.setName('BBa_F2620');
  bba_f2620.setDescription('PoPS Receiver');

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };
