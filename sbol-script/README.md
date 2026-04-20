# sbol-script

A TypeScript/JavaScript library for creating and serialising [SBOL3](https://sbolstandard.org/) documents in the browser and Node.js.

## Project Structure

```
sbol-script/
├── src/
│   ├── index.ts              # Entry point — re-exports core, api, validation
│   ├── core/                 # SBOL3 entity classes
│   │   ├── SBOLDocument.ts   # Top-level document container
│   │   ├── SBOLAPI.ts        # High-level factory helpers
│   │   ├── Component.ts      # Component and typed subclasses
│   │   ├── Interaction.ts    # Interaction and typed subclasses
│   │   ├── Participation.ts  # Participation and typed subclasses
│   │   ├── Sequence.ts
│   │   ├── Vocabulary.ts     # IRIs, enums, and SBOL ontology terms
│   │   └── ...               # Other SBOL entities
│   ├── otol/                 # Low-level RDF graph utilities
│   │   ├── RDFUtil.ts        # Serialisation helpers and RDFFormat enum
│   │   ├── GraphDocument.ts  # Abstract base document
│   │   ├── GraphEntity.ts
│   │   └── GraphUtil.ts
│   ├── api/                  # Scripting API layer (future)
│   └── validation/           # Validation rules (future)
├── tests/
│   ├── entity/               # One generator per SBOL3 example (31 files)
│   ├── sbolLib.js            # Loads rdflib and the bundle for Node.js
│   ├── testRunner.js         # Generates all example outputs
│   ├── comparator.js         # Compares outputs against libSBOLj3 reference
│   └── compare.js            # Shared N-Triples comparison utility
├── dist/
│   └── sbol-script.js        # Webpack UMD bundle (generated)
├── main.html               # Browser demo
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## Prerequisites

- Node.js ≥ 18
- npm

## Install

```bash
npm install
```

## Build

Development build (source maps included):
```bash
npm run build:dev
```

Production build (minified):
```bash
npm run build
```

Output: `dist/sbol-script.js`

## Browser Usage

Include [rdflib](https://github.com/linkeddata/rdflib.js) before the bundle (it is a required peer dependency):

```html
<script src="https://unpkg.com/rdflib/dist/rdflib.min.js"></script>
<script src="./dist/sbol-script.js"></script>
<script>
    const { SBOLDocument, SBOLAPI, RDFFormat, DNARole } = window.sbolScript;

    const doc = new SBOLDocument('https://example.org/');

    const promoter = SBOLAPI.createPromoterDNAComponent(
        doc, 'https://example.org/promoter1', 'https://example.org'
    );
    promoter.setName('MyPromoter');

    console.log(doc.toRDF(RDFFormat.TURTLE));
</script>
```

Open `main.html` in a browser after building for a full working demo.

## Key Classes

### `SBOLDocument`
Top-level container. Provides factory methods for all SBOL entities.

```js
const doc = new SBOLDocument('https://example.org/');
const comp  = doc.createDNAComponent('https://example.org/comp1', 'https://example.org');
const seq   = doc.createDNASequence('https://example.org/seq1', 'https://example.org', 'ATCG');
```

### `SBOLAPI`
High-level helpers that wire up participants and child entities automatically.

```js
SBOLAPI.createGeneticProductionInteraction(region, cdsIRI, proteinIRI, promoterIRI);
SBOLAPI.createDegradationInteraction(region, [proteinIRI]);
SBOLAPI.createInhibitionInteraction(region, inhibitorIRI, inhibitedIRI);
```

### Serialisation

```js
doc.toRDF(RDFFormat.TURTLE)
doc.toRDF(RDFFormat.RDF_XML)
doc.toRDF(RDFFormat.N_TRIPLES)
doc.toRDF(RDFFormat.N_TRIPLES_ORDERED)
doc.toRDF(RDFFormat.JSON_LD)
```

## Tests

All commands are run from this directory (`sbol-script/`).

### Prerequisites

- The bundle must be built before running any tests.
- Comparison tests additionally require [libSBOLj3](https://github.com/SynBioDex/libSBOLj) to be present at `../../libSBOLj3/libSBOLj3/output/` relative to this directory.

### Build

```bash
npm run build:dev
```

### Run all tests

```bash
npm test
```

`npm test` invokes `tests/run.js`, which runs both steps in sequence and prints a combined summary:

```
=== Step 1: Generate examples ===
  activity ... OK
  annotation ... OK
  ...
  Results: 31 passed, 0 failed

=== Step 2: Compare against libSBOLj3 ===
  activity ... PASS
  annotation ... PASS
  ...
  Results: 30 passed, 1 failed, 0 skipped

=== Summary ===
  Generation : 31 OK, 0 failed
  Comparison : 30 passed, 1 failed, 0 skipped
  Total      : 61 OK, 1 failed
```

Exits with code 0 only when all steps pass.

### Step 1 — Generate example outputs (standalone)

Runs all 31 generators and writes five serialisation formats for each:

```bash
node tests/testRunner.js
```

Output files are placed under `../output/examples/<name>/`:

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

### Step 2 — Compare against libSBOLj3 reference outputs (standalone)

Compares each `*_ordered.nt` output against the corresponding file in the libSBOLj3 Java library output:

```bash
node tests/comparator.js
```

The comparator will exit with an error if the libSBOLj3 output folder is not found. Reports are written to `../output/comparison/`:

| File | Contents |
|------|----------|
| `report` | Full per-test results (PASS / FAIL with line-level diffs) |
| `report_mt_10` | Tests where the error rate exceeds 10% |

## Global Name

When loaded as a UMD bundle in the browser the library is exposed as `window.sbolScript` (configured in `webpack.config.js` via `library.name`).
