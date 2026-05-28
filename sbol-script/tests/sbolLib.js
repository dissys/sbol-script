'use strict';

// Set up global $rdf from rdflib before loading sbol-script (which expects it as a global)
const rdflib = require('rdflib');
global.$rdf = rdflib;

// Load the sbol-script webpack bundle (UMD – sets module.exports in Node)
const sbolScript = require('../dist/sbol-script.js');

module.exports = sbolScript;
