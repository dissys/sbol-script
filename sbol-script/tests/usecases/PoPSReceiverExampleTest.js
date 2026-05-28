'use strict';

const fs   = require('fs');
const path = require('path');
const {
  SBOLDocument, RDFFormat, Orientation,
  InteractionType, ParticipationType,
  SBOLAPI, SBOLNamespaces
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

  const popsReceiver = SBOLAPI.createDnaComponent(doc, 'BBa_F2620', 'BBa_F2620', 'PoPS Receiver', SBOLNamespaces.SO('0000704'), null);
  const pTetR = SBOLAPI.createDnaComponent(doc, 'BBa_R0040', 'pTetR', 'TetR repressible promoter', SBOLNamespaces.SO('0000167'),
    'tccctatcagtgatagagattgacatccctatcagtgatagagatactgagcac');
  const rbs = SBOLAPI.createDnaComponent(doc, 'BBa_B0034', 'BBa_B0034', 'RBS based on Elowitz repressilator', SBOLNamespaces.SO('0000139'), 'aaagaggagaaa');
  const luxR = SBOLAPI.createDnaComponent(doc, 'BBa_C0062', 'luxR', 'luxR repressor/activator,  (no LVA?)', SBOLNamespaces.SO('0000316'),
    'atgaaaaacataaatgccgacgacacatacagaataattaataaaattaaagcttgtagaagcaataatgatattaatcaatgcttatctgatatgactaaaatggtacattgtgaatattatttactcgcgatcatttatcctcattctatggttaaatctgatatttcaatcctagataattaccctaaaaaatggaggcaatattatgatgacgctaatttaataaaatatgatcctatagtagattattctaactccaatcattcaccaattaattggaatatatttgaaaacaatgctgtaaataaaaaatctccaaatgtaattaaagaagcgaaaacatcaggtcttatcactgggtttagtttccctattcatacggctaacaatggcttcggaatgcttagttttgcacattcagaaaaagacaactatatagatagtttatttttacatgcgtgtatgaacataccattaattgttccttctctagttgataattatcgaaaaataaatatagcaaataataaatcaaacaacgatttaaccaaaagagaaaaagaatgtttagcgtgggcatgcgaaggaaaaagctcttgggatatttcaaaaatattaggttgcagtgagcgtactgtcactttccatttaaccaatgcgcaaatgaaactcaatacaacaaaccgctgccaaagtatttctaaagcaattttaacaggagcaattgattgcccatactttaaaaattaataacactgatagtgctagtgtagatcac');
  const doubleTerminator = SBOLAPI.createDnaComponent(doc, 'BBa_B0015', 'BBa_B0015', 'Double terminator consisting of BBa_B0010 and BBa_B0012', SBOLNamespaces.SO('0000141'), null);
  const pLuxR = SBOLAPI.createDnaComponent(doc, 'BBa_R0062', 'lux pR', 'Promoter (luxR &amp; HSL regulated -- lux pR)', SBOLNamespaces.SO('0000167'),
    'acctgtaggatcgtacaggtttacgcaagaaaatggtttgttatagtcgaataaa');
  const b0010 = SBOLAPI.createDnaComponent(doc, 'BBa_B0010', 'BBa_B0010', 'Transcriptional terminator consisting of a 64 bp stem-loop', SBOLNamespaces.SO('0000141'),
    'ccaggcatcaaataaaacgaaaggctcagtcgaaagactgggcctttcgttttatctgttgtttgtcggtgaacgctctc');
  const b0012 = SBOLAPI.createDnaComponent(doc, 'BBa_B0012', 'BBa_B0012', 'Double terminator consisting of BBa_B0010 and BBa_B0012', SBOLNamespaces.SO('0000141'),
    'tcacactggctcaccttcgggtgggcctttctgcgtttata');

  const luxR_protein = SBOLAPI.createProteinComponentInContainer(doc, popsReceiver, 'BBa_C0062_protein', 'LuxR', 'LuxR protein', SBOLNamespaces.GO('0003700'), 'NNNNNNNNNNN');
  const tetR_protein = SBOLAPI.createProteinComponentInContainer(doc, popsReceiver, 'TetR_protein', 'TetR', 'TetR protein', SBOLNamespaces.GO('0003700'), 'NNNNNNNNNNN');

  SBOLAPI.appendComponent(doc, doubleTerminator, b0010, Orientation.INLINE);
  SBOLAPI.appendComponent(doc, doubleTerminator, b0012, Orientation.INLINE);

  SBOLAPI.appendComponent(doc, popsReceiver, pTetR, Orientation.INLINE);
  SBOLAPI.appendComponent(doc, popsReceiver, rbs, Orientation.INLINE);
  SBOLAPI.appendComponent(doc, popsReceiver, luxR, Orientation.INLINE);
  SBOLAPI.appendComponent(doc, popsReceiver, doubleTerminator, Orientation.INLINE);
  SBOLAPI.appendComponent(doc, popsReceiver, pLuxR, Orientation.INLINE);

  SBOLAPI.createInteractionFromComponents([InteractionType.GeneticProduction], popsReceiver, luxR, [ParticipationType.Template], luxR_protein, [ParticipationType.Product]);
  SBOLAPI.createInteractionFromComponents([InteractionType.Stimulation], popsReceiver, pLuxR, [ParticipationType.Stimulated], luxR_protein, [ParticipationType.Stimulator]);
  SBOLAPI.createInteractionFromComponents([InteractionType.Stimulation], popsReceiver, pTetR, [ParticipationType.Stimulated], tetR_protein, [ParticipationType.Stimulator]);

  const result = {
    rdfXml:          doc.toRDF(RDFFormat.RDF_XML),
    turtle:          doc.toRDF(RDFFormat.TURTLE),
    jsonLd:          doc.toRDF(RDFFormat.JSON_LD),
    nTriples:        doc.toRDF(RDFFormat.N_TRIPLES),
    nTriplesOrdered: doc.toRDF(RDFFormat.N_TRIPLES_ORDERED),
  };

  saveOutputs('BBa_F2620_PoPSReceiver', result);
  return result;
}

module.exports = { generate };

if (require.main === module) { generate(); }
