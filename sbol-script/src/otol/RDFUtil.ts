declare const $rdf: any;
type IRI = string;

export enum RDFFormat {
    RDF_XML = 'application/rdf+xml',
    TURTLE = 'text/turtle',
    JSON_LD = 'application/ld+json',
    N_TRIPLES = 'application/n-triples',
    N_TRIPLES_ORDERED = 'application/n-triples'
}

export default class RDFUtil {
    static createResource(store: any, identifier: IRI, resType: IRI): any {
        const resource = $rdf.sym(identifier);
        if (store.any(resource)) {
            throw new Error(`Resource with identifier ${identifier} already exists in the store.`);
        }
        else {
            store.add(resource, $rdf.sym('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), $rdf.sym(resType));
        }
        return resource;
    }

    private static toRDFNode(value: any): any {
        if (value && value.termType) {
            return value;
        }
        else if (typeof value === 'string' && (/^https?:\/\/.+/.test(value) || value.startsWith('urn:'))) {
            return $rdf.sym(value);
        }
        else if (typeof value === 'string') {
            return $rdf.literal(value);
        }
        else {
            return $rdf.literal(String(value));
        }
    }

    /* Version with datatype inference (keep for future use if the community prefers to keep the data types):
    private static toRDFNode(value: any): any {
        if (value && value.termType) {
            return value;
        }
        else if (typeof value === 'string' && (/^https?:\/\/.+/.test(value) || value.startsWith('urn:'))) {
            return $rdf.sym(value);
        }
        else if (typeof value === 'string') {
            return $rdf.literal(value);
        }
        else if (typeof value === 'number') {
            const xsdType = Number.isInteger(value)
                ? 'http://www.w3.org/2001/XMLSchema#integer'
                : 'http://www.w3.org/2001/XMLSchema#decimal';
            return new $rdf.Literal(String(value), null, $rdf.sym(xsdType));
        }
        else if (typeof value === 'boolean') {
            return new $rdf.Literal(String(value), null, $rdf.sym('http://www.w3.org/2001/XMLSchema#boolean'));
        }
        else {
            return $rdf.literal(String(value));
        }
    }
    */

    static setProperty(store: any, resource: any, property: IRI, values: any | any[]): any {
        const pred = $rdf.sym(property);
        store.removeMany(resource, pred, null);
        const valuesArray = Array.isArray(values) ? values : [values];
        valuesArray.forEach(value => {
            store.add(resource, pred, this.toRDFNode(value));
        });
    }

    static addProperty(store: any, resource: any, property: IRI, values: any | any[]): any {
        const pred = $rdf.sym(property);
        const valuesArray = Array.isArray(values) ? values : [values];
        valuesArray.forEach(value => {
            store.add(resource, pred, this.toRDFNode(value));
        });
    }

    static getProperty(store: any, resource: any, property: IRI): any {
        const pred = $rdf.sym(property);
        const objects = store.each(resource, pred, null) || [];
        return objects.map((obj: any) => {
            if (!obj) return obj;
            if (obj.termType === 'NamedNode' || obj.termType === 'BlankNode') {
                return obj.value;
            } else if (obj.termType === 'Literal') {
                return obj.value;
            } else {
                return obj;
            }
        });
    }

    static toRDF(store: any, format: RDFFormat = RDFFormat.RDF_XML, customPrefixNames?: Set<string>): string {
        let returnResult = '';
        $rdf.serialize(undefined, store, undefined, format, (err: any, result: any) => {
            if (err) {
                console.error('Serialize error:', err);
            } else {
                returnResult = result;
            }
        });

        if (format === RDFFormat.N_TRIPLES_ORDERED && returnResult) {
            returnResult = returnResult
                .split('\n')
                .filter((line: string) => line.trim().length > 0)
                .sort()
                .join('\n') + '\n';
        }

        return returnResult;
    }
}
