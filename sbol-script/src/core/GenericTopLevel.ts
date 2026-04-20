import RDFUtil from '../otol/RDFUtil';
import TopLevel from './TopLevel';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class GenericTopLevel extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.GenericTopLevel.iri);
        }
    }

    static create(store: any, identifier: IRI): GenericTopLevel {
        return new GenericTopLevel(store, identifier);
    }

    static load(store: any, identifier: IRI): GenericTopLevel {
        return new GenericTopLevel(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}GenericTopLevel(${this.getIdentifier()})`;
    }
}
