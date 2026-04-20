import RDFUtil, { RDFFormat } from './RDFUtil';

declare const $rdf: any;

export abstract class GraphDocument {
    store = $rdf.graph();
    baseIRI: string;
    protected customPrefixNames: Set<string> = new Set();

    constructor(baseIRI: string) {
        this.baseIRI = baseIRI;
        if (!this.store.namespaces) {
            this.store.namespaces = {};
        }
        this.store.setPrefixForURI('', baseIRI);
        this.store.namespaces[''] = baseIRI;
        this.customPrefixNames.add('');
    }

    addNamespace(prefix: string, uri: string): void {
        if (!this.store.namespaces) {
            this.store.namespaces = {};
        }
        this.store.setPrefixForURI(prefix, uri);
        this.customPrefixNames.add(prefix);
    }

    getCustomPrefixNames(): Set<string> {
        return this.customPrefixNames;
    }

    getNamespacePrefixes(): Array<{ prefix: string; uri: string }> {
        const prefixes: Array<{ prefix: string; uri: string }> = [];
        if (this.store.namespaces) {
            for (const prefix in this.store.namespaces) {
                prefixes.push({ prefix, uri: this.store.namespaces[prefix] });
            }
        }
        return prefixes;
    }

    toRDF(format: RDFFormat = RDFFormat.RDF_XML): string {
        return RDFUtil.toRDF(this.store, format, this.customPrefixNames);
    }
}
