declare const $rdf: any;
//import * as $rdf from 'rdflib';
export default class SBOLNamespaces {
    // URI constants
    private static readonly SBOL_URI = 'http://sbols.org/v3#';
    private static readonly RDF_URI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
    private static readonly SO_URI = 'https://identifiers.org/SO:';
    private static readonly SBO_URI = 'https://identifiers.org/SBO:';
    private static readonly CHEBI_URI = 'https://identifiers.org/CHEBI:';
    private static readonly GO_URI = 'https://identifiers.org/GO:';
    private static readonly EDAM_URI = 'https://identifiers.org/edam:';
    private static readonly PROV_URI = 'http://www.w3.org/ns/prov#';
    private static readonly OM_URI = 'http://www.ontology-of-units-of-measure.org/resource/om-2/';
    private static readonly RDFS_URI = 'http://www.w3.org/2000/01/rdf-schema#';

    // Namespace functions
    static SBOL = $rdf.Namespace(this.SBOL_URI);
    static RDF = $rdf.Namespace(this.RDF_URI);
    static SO = $rdf.Namespace(this.SO_URI);
    static SBO = $rdf.Namespace(this.SBO_URI);
    static CHEBI = $rdf.Namespace(this.CHEBI_URI);
    static GO = $rdf.Namespace(this.GO_URI);
    static EDAM = $rdf.Namespace(this.EDAM_URI);
    static PROV = $rdf.Namespace(this.PROV_URI);
    static OM = $rdf.Namespace(this.OM_URI);
    static RDFS = $rdf.Namespace(this.RDFS_URI);

    static getNamespaceMappings(): Array<{prefix: string, uri: string}> {
        return [
            { prefix: 'sbol', uri: this.SBOL_URI },
            { prefix: 'rdf', uri: this.RDF_URI },
            { prefix: 'SO', uri: this.SO_URI },
            { prefix: 'SBO', uri: this.SBO_URI },
            { prefix: 'CHEBI', uri: this.CHEBI_URI },
            { prefix: 'GO', uri: this.GO_URI },
            { prefix: 'EDAM', uri: this.EDAM_URI },
            { prefix: 'prov', uri: this.PROV_URI },
            { prefix: 'om', uri: this.OM_URI },
            { prefix: 'rdfs', uri: this.RDFS_URI }
        ];
    }
}
