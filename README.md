# sbol-script
Sbol-script is a TypeScript/JavaScript library for creating and serialising [SBOL3](https://sbolstandard.org/). It can be used with Node.js to develop applications or directly in the browser.

## LLM Experiments
LLM experiments are available from https://github.com/goksel/libSBOL3.js, which was used to derive the sbol-script library/

## Development History
- 2024 - libSBOLjs3-Light: Started as a proof-of-concept project named libSBOLjs3-Light to support the creation of client-side JS projects. Various TypeScript and JavaScript options were tested to create a single JS bundle. The project is available from https://github.com/goksel/libSBOLjs3-Light. 
- 2025 - libSBOL3.js : Started formalising the underlying graph framework and applied LLM experiments later. Available from https://github.com/goksel/libSBOL3.js.
- 2026 - sbol-script: The libSBOL3.js project from the final LLM experiment was checked against errors and released as sbol-script for community use.

We plan to make libSBOLjs3-Light and libSBOL3.js projects private after the review process to prevent developers from accessing incomplete projects that are not maintained. The sbol-script library in this repository is the final and maintained version.


## Repository Structure
```
sbol-script/
├── sbol-script/        # Main library package
│   ├── src/
│   ├── dist/
│   ├── tests/
│   └── ...
└── output/
    ├── examples/       # Generated example files
    └── comparison/     # Comparison reports
```

## Prerequisites

- Node.js ≥ 18
- npm
- [libSBOLj3](https://github.com/SynBioDex/libSBOLj) built locally at `../libSBOLj3/libSBOLj3/output/` *(required for comparison tests only)*

## Quick Start

Development build:
```
cd sbol-script
npm install
npm run build:dev
```

Open `sbol-script/ex_transcriptional_unit.html` in a browser after building for a working demo.

The build process creates a distributable file that can be included for client-side applications in `dist/sbol-script.js`.

Production build:
```
npm run build
```

## Browser Usage

Include [rdflib](https://unpkg.com/rdflib/dist/rdflib.min.js) and the sbol-script dependency together, as shown below using the same order:

A minimal working example for a simple promoter part:
```html
<script src="https://unpkg.com/rdflib/dist/rdflib.min.js"></script>
<script src="./dist/sbol-script.js"></script>
<script>
    const { SBOLDocument, SBOLAPI, RDFFormat, DNARole } = window.sbolScript;

    const doc = new SBOLDocument('https://example.org/');
    const promoter = SBOLAPI.createPromoterDNAComponent(doc, 'https://example.org/promA', 'https://example.org');
    promoter.setName('Promoter A');

    console.log(doc.toRDF(RDFFormat.RDF_XML));
</script>
```

After you build the project, open `ex_simple_part.html` for the working demo of the example above. The `ex_transcriptional_unit.html` provides a more complex example for a transcriptional unit:
- promoter1 - rbs1 - cds1 - ter1
- Interactions:
  - Genetic production to protein1
  - Degradation for protein1

### Referring to the library
When loaded as a JS bundle in the browser, the library is exposed as `window.sbolScript`. For details, please see `webpack.config.js`.

### Node.js examples:
Detailed examples are available under 'tests/entity'. The 'output/examples' and 'output/usecases' folders contain one folder for each example. Each example folder has the SBOL RDF outputs. 

Examples for six use cases using the high-level API are available from 'tests/usecases'.

### Browser-based (JS) examples
Each example folder in 'outputs/examples' includes an HTML file, which demonstrates how to use the library via low-level API methods. 


## Important Concepts

### `SBOLDocument`
SBOLDocument is the main class of the library and provides factory methods for all top-level SBOL entities.

```js
const doc = new SBOLDocument('https://example.org/');
const comp  = doc.createDNAComponent('https://example.org/comp1', 'https://example.org');
const seq   = doc.createDNASequence('https://example.org/seq1', 'https://example.org', 'ATCG');
```

### `SBOLAPI`
High-level helpers that automatically created the required child entities and relationships.

```js
SBOLAPI.createGeneticProductionInteraction(region, cdsIRI, proteinIRI, promoterIRI);
SBOLAPI.createDegradationInteraction(region, [proteinIRI]);
SBOLAPI.createInhibitionInteraction(region, inhibitorIRI, inhibitedIRI);
```

### Serialisation
All four serialisation types are supported. Ordered N-Triples can be used as an additional serialisation option:

```js
doc.toRDF(RDFFormat.TURTLE)
doc.toRDF(RDFFormat.RDF_XML)
doc.toRDF(RDFFormat.N_TRIPLES)
doc.toRDF(RDFFormat.N_TRIPLES_ORDERED)
doc.toRDF(RDFFormat.JSON_LD)
```

## Project Structure

```
sbol-script/
├── src/
│   ├── index.ts              # Entry point — re-exports core, api, validation
│   ├── core/                 # SBOL3 entity classes
│   │   ├── SBOLDocument.ts   # Top-level document container
│   │   ├── SBOLAPI.ts        # High-level factory helpers
│   │   ├── Component.ts      # Component and its subclasses
│   │   ├── Interaction.ts    # Interaction and its subclasses
│   │   ├── Participation.ts  # Participation and its subclasses
│   │   ├── Sequence.ts
│   │   ├── Vocabulary.ts     # IRIs, enums, and SBOL ontology terms
│   │   └── ...               # Other SBOL entities
│   ├── otol/                 # Low-level RDF graph utilities
│   │   ├── RDFUtil.ts        # Serialisation helpers and RDFFormat enum
│   │   ├── GraphDocument.ts  # Abstract base document
│   │   ├── GraphEntity.ts.   # Abstract base graph entity
│   │   └── GraphUtil.ts      # Utility graph methods, e.g. setters  
│   ├── api/                  # Scripting API layer (future)
├── tests/
│   ├── entity/               # One test file for each SBOL3 example (31 files)
│   ├── sbolLib.js            # Loads rdflib and the bundle for Node.js
│   ├── testRunner.js         # Generates all example outputs
│   ├── comparator.js         # Compares outputs against libSBOLj3 examples
│   └── compare.js            # Shared N-Triples comparison utility
├── dist/
│   └── sbol-script.js        # Webpack bundle, generated after building the library
├── ex_transcriptional_unit.html    # Demo
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## Running the Tests

All commands are run from inside the `sbol-script/` package directory. Comparison tests additionally require [libSBOLj3](https://github.com/SynBioDex/libSBOLj3) to be present at `../../libSBOLj3/libSBOLj3/output/`.

```bash
cd sbol-script
npm run build:dev
npm test
```

`npm test` runs `tests/run.js` which:

1. Executes all 31 generators → writes RDF/XML, Turtle, JSON-LD, N-Triples, and ordered N-Triples to `../output/examples/`

Individual step:
```bash
node tests/comparator.js
```

```
output/examples/
└── activity/
│   ├── activity.rdf          # RDF/XML
│   ├── activity.ttl          # Turtle
│   ├── activity.jsonld       # JSON-LD
│   ├── activity.nt           # N-Triples
│   └── activity_ordered.nt   # N-Triples (sorted)
└── ... (one folder per example)
```
2. Compares each `*_ordered.nt` against the corresponding example from libSBOLj3 and writes reports to the `../output/comparison/` folder.

Individual step:
```bash
node tests/comparator.js
```

The comparator will exit with an error if the libSBOLj3 output folder is not found. It creates the following files:

- `report`: All comparison results. If there is a failing test, it will include line-level differences.

- `report_mt_10`: Shows tests where the error rate > 10%.