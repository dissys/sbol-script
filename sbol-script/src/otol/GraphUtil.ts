import RDFUtil from './RDFUtil';

type IRI = string;

export default class GraphUtil {
    static extractIRI(IRI_or_objectWithIRI: any): string {
        let iri = null;
        if (IRI_or_objectWithIRI && typeof IRI_or_objectWithIRI === "object" && IRI_or_objectWithIRI.iri) {
            iri = IRI_or_objectWithIRI.iri;
        }
        else if (typeof IRI_or_objectWithIRI === "string") {
            iri = IRI_or_objectWithIRI;
        }
        else {
            throw new Error("Requires an object with an iri property or a IRI string.");
        }
        return iri;
    }

    static setProperty(store: any, resource: any, property: IRI, values: any[]): void {
        const uris = values.map(value => this.extractIRI(value));
        RDFUtil.setProperty(store, resource, property, uris);
    }

    static addProperty(store: any, resource: any, property: IRI, values: any[]): void {
        const uris = values.map(value => this.extractIRI(value));
        RDFUtil.addProperty(store, resource, property, uris);
    }

    static loadByProperty<T>(store: any, typeProperty: IRI, typeValue: IRI, loadFunction: (store: any, identifier: string) => T): T[] {
        const objects: T[] = [];
        const statements = store.match(null, typeProperty, typeValue);
        statements.forEach((statement: any) => {
            const identifier = statement.subject.value;
            objects.push(loadFunction(store, identifier));
        });
        return objects;
    }

    static resolveChildIRI(parentIRI: string, identifier: string): string {
        return identifier.includes('://') ? identifier : `${parentIRI}/${identifier}`;
    }

    static formatObjectArray(objects: any[], propertyName: string, indent: string): string {
        if (!objects || objects.length === 0) {
            return '';
        }
        let value = `\n${indent}, ${propertyName}=[`;
        value += `\n${objects.map(obj => obj.toString(indent + '   ')).join(',\n')}`;
        value += `\n${indent}]`;
        return value;
    }
}
