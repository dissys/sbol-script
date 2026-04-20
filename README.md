# sbol-script

A TypeScript/JavaScript library for creating and serialising [SBOL3](https://sbolstandard.org/) documents in the browser and Node.js.

## Repository Structure

```
sbol-script/
├── sbol-script/        # Main library package (see sbol-script/README.md for full docs)
│   ├── src/
│   ├── dist/
│   ├── tests/
│   │   ├── entity/     # One generator per SBOL3 example (31 files)
│   │   ├── sbolLib.js  # Loads the bundle for Node.js tests
│   │   ├── testRunner.js   # Generates all example outputs
│   │   └── comparator.js   # Compares outputs against libSBOLj3 reference
│   └── ...
└── output/
    ├── examples/       # Generated RDF files (one sub-folder per example)
    └── comparison/     # Comparison reports against libSBOLj3
        ├── report          # Full per-test results
        └── report_mt_10    # Tests with >10% error rate only
```

## Prerequisites

- Node.js ≥ 18
- npm
- [libSBOLj3](https://github.com/SynBioDex/libSBOLj) built locally at `../libSBOLj3/libSBOLj3/output/` *(required for comparison tests only)*

## Quick Start

```bash
cd sbol-script
npm install
npm run build:dev
```

Open `sbol-script/main.html` in a browser after building for a full working demo.

## Running the Tests

All commands are run from inside the `sbol-script/` package directory.

```bash
cd sbol-script
```

**Step 1 — Build the bundle** (required once before testing):
```bash
npm run build:dev
```

**Step 2 — Run all tests** (generates all examples then compares against libSBOLj3):
```bash
npm test
```

`npm test` runs `tests/run.js` which:
1. Executes all 31 generators → writes RDF/XML, Turtle, JSON-LD, N-Triples, and ordered N-Triples to `../output/examples/`
2. Compares each `*_ordered.nt` against the libSBOLj3 Java reference → writes reports to `../output/comparison/`

Requires `../../libSBOLj3/libSBOLj3/output/` to exist for the comparison step.

See [sbol-script/README.md](sbol-script/README.md) for full documentation.
