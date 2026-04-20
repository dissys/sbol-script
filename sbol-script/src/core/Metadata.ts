import RDFUtil from '../otol/RDFUtil';
import Identified from './Identified';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class Metadata extends Identified {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Metadata.iri);
        }
    }

    static create(store: any, identifier: IRI): Metadata {
        return new Metadata(store, identifier);
    }

    static load(store: any, identifier: IRI): Metadata {
        return new Metadata(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Metadata(${this.getIdentifier()})`;
    }
}
