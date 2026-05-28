'use strict';

const { SBOLDocument, RDFFormat, ComponentType, Metadata } = require('../sbolLib');

const SBOL      = 'http://sbols.org/v3#';
const IGEM      = 'http://parts.igem.org/';

function generate() {
  const NS  = 'https://sbolstandard.org/examples';
  const doc   = new SBOLDocument(NS + '/');
  const store = doc.store;

  // ── Top-level repos (custom igem:Repository type) ──────────────────────
  const sbhRepo = doc.createGenericTopLevel(NS + '/SynBioHubRepository', NS);
  sbhRepo.addAnnotationType(IGEM + 'Repository');
  sbhRepo.setName('SynBioHub');

  const igemRepo = doc.createGenericTopLevel(NS + '/iGEMRepository', NS);
  igemRepo.addAnnotationType(IGEM + 'Repository');
  igemRepo.setName('iGEM Registry');
  igemRepo.setDescription('Registry of Standard Biological Parts');
  igemRepo.addAnnotationIRIValue(IGEM + 'website', 'http://parts.igem.org/Main_Page');

  // ── BBa_J23119 Component ───────────────────────────────────────────────
  const bba = doc.createComponent(NS + '/BBa_J23119', NS, [ComponentType.DNA.iri]);
  bba.setName('BBa_J23119 part');
  bba.setDescription('Parts J23100 through J23119 are a family of constitutive promoter parts isolated from a small combinatorial library.');
  bba.addRole('https://identifiers.org/SO:0000167');
  bba.addAnnotationLiteralValue(IGEM + 'group', 'iGEM2006_Berkeley');
  bba.addAnnotationIRIValue(IGEM + 'belongsTo', sbhRepo.getIdentifier());
  bba.addAnnotationIRIValue(IGEM + 'belongsTo', igemRepo.getIdentifier());
  bba.addAnnotationIRIValue(IGEM + 'experienceURL', 'http://parts.igem.org/Part:BBa_J23119:Experience');

  // ── Child Metadata entities (sbol:Identified) ──────────────────────────

  // information1
  const info1 = Metadata.create(store, NS + '/BBa_J23119/information1');
  info1.addAnnotationType(IGEM + 'Information');
  info1.setName('BBa_J23119_experience');
  info1.setDescription("The experience page captures users' experience using the BBa_J23119 part");
  info1.addAnnotationIRIValue(IGEM + 'source', bba.getIdentifier());
  info1.addAnnotationLiteralValue(IGEM + 'sigmaFactor', '//rnap/prokaryote/ecoli/sigma70');
  info1.addAnnotationLiteralValue(IGEM + 'regulation', '//regulation/constitutive');
  info1.addAnnotationLiteralValue(IGEM + 'regulation', '//regulation/second_regulation');
  bba.addAnnotationIRIValue(IGEM + 'hasInformation', info1.getIdentifier());

  // information2
  const info2 = Metadata.create(store, NS + '/BBa_J23119/information2');
  info2.addAnnotationType(IGEM + 'A_Information');
  info2.setName('BBa_J23119_experience2');
  bba.addAnnotationIRIValue(IGEM + 'hasInformation', info2.getIdentifier());

  // information3
  const info3 = Metadata.create(store, NS + '/BBa_J23119/information3');
  info3.addAnnotationType(IGEM + 'Z_Information');
  info3.setName('BBa_J23119_experience3');
  bba.addAnnotationIRIValue(IGEM + 'hasInformation', info3.getIdentifier());

  // twinParts (child of usage1)
  const twinParts = Metadata.create(store, NS + '/BBa_J23119/usage1/twinParts');
  twinParts.addAnnotationType(IGEM + 'TwinPartUsage');
  twinParts.setName('twin parts');
  twinParts.addAnnotationIRIValue(IGEM + 'twinURL', 'http://parts.igem.org/wiki/index.php?title=Part:BBa_J72073');
  twinParts.addAnnotationIRIValue(IGEM + 'twinURL', 'http://parts.igem.org/wiki/index.php?title=Part:BBa_M1638');
  twinParts.addAnnotationIRIValue(IGEM + 'twinURL', 'http://parts.igem.org/wiki/index.php?title=Part:BBa_M36800');

  // usage1
  const usage1 = Metadata.create(store, NS + '/BBa_J23119/usage1');
  usage1.addAnnotationType(IGEM + 'iGEMUsage');
  usage1.setName('BBa_J23119_usage');
  usage1.setDescription('BBa_J23119 usage statistics');
  usage1.addAnnotationLiteralValue(IGEM + 'uses', '442');
  usage1.addAnnotationLiteralValue(IGEM + 'uses2', 442);
  usage1.addAnnotationLiteralValue(IGEM + 'twins', '7');
  usage1.addAnnotationLiteralValue(IGEM + 'registryStar', '1');
  usage1.addAnnotationLiteralValue(IGEM + 'inStock', 'true');
  usage1.addAnnotationIRIValue(IGEM + 'twinURLs', twinParts.getIdentifier());
  bba.addAnnotationIRIValue(IGEM + 'hasUsage', usage1.getIdentifier());

  // usage2
  const usage2 = Metadata.create(store, NS + '/BBa_J23119/usage2');
  usage2.addAnnotationType(IGEM + 'A_iGEMUsage');
  usage2.setName('BBa_J23119_usage_2');
  usage2.addAnnotationLiteralValue(IGEM + 'twins', '7');
  bba.addAnnotationIRIValue(IGEM + 'hasUsage', usage2.getIdentifier());

  // usage3
  const usage3 = Metadata.create(store, NS + '/BBa_J23119/usage3');
  usage3.addAnnotationType(IGEM + 'Z_iGEMUsage');
  usage3.setName('BBa_J23119_usage_3');
  bba.addAnnotationIRIValue(IGEM + 'hasUsage', usage3.getIdentifier());

  return {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };
}

module.exports = { generate };

