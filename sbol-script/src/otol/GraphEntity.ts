declare const $rdf: any;

type IRI = string;

export class IRIValidator {
    static isValid(iri: string): boolean {
        try {
            new URL(iri);
            return true;
        } catch {
            return false;
        }
    }

    static create(iri: string): IRI {
        if (!this.isValid(iri)) {
            throw new Error(`Invalid URI: ${iri}`);
        }
        return iri;
    }
}

export default class GraphEntity {
    resource: any;
    identifier: IRI;
    store: any;

    constructor(store: any, identifier: string) {
        this.store = store;
        const resolved = GraphEntity.resolveIdentifier(identifier, store?.namespaces?.['']);
        this.identifier = IRIValidator.create(resolved);
        this.resource = $rdf.sym(this.identifier);
    }

    static resolveIdentifier(identifier: string, baseUri?: string): string {
        if (identifier.includes('://') || identifier.startsWith('urn:')) {
            return identifier;
        }
        if (baseUri) {
            const base = baseUri.endsWith('/') ? baseUri : `${baseUri}/`;
            return `${base}${identifier}`;
        }
        return identifier;
    }

    getIdentifier(): IRI {
        return this.identifier;
    }

    validate(): string[] {
        const errors: string[] = [];
        if (!this.identifier) {
            errors.push("Identifier is required");
        } else if (!IRIValidator.isValid(this.identifier)) {
            errors.push(`Invalid identifier URI: ${this.identifier}`);
        }
        return errors;
    }

    addAnnotationType(typeIRI: IRI): void {
        this.store.add(this.resource, $rdf.sym('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), $rdf.sym(typeIRI), $rdf.defaultGraph());
    }
  
    addAnnotationIRIValue(propIRI: IRI, valueIRI: IRI): void {
        this.store.add(this.resource, $rdf.sym(propIRI), $rdf.sym(valueIRI), $rdf.defaultGraph());
    }

    addAnnotationLiteralValue(propIRI: IRI, value: string | number | boolean, datatype?: IRI): void {
        let node: any;
        if (datatype) {
            node = new $rdf.Literal(String(value), null, $rdf.sym(datatype));
        } else if (typeof value === 'number') {
            const xsdType = Number.isInteger(value)
                ? 'http://www.w3.org/2001/XMLSchema#int'
                : 'http://www.w3.org/2001/XMLSchema#decimal';
            node = new $rdf.Literal(String(value), null, $rdf.sym(xsdType));
        } else if (typeof value === 'boolean') {
            node = new $rdf.Literal(String(value), null, $rdf.sym('http://www.w3.org/2001/XMLSchema#boolean'));
        } else {
            node = $rdf.literal(value);
        }
        this.store.add(this.resource, $rdf.sym(propIRI), node, $rdf.defaultGraph());
    }

    toString(indent: string = ''): string {
        return `${indent}GraphEntity(${this.identifier})`;
    }
}
