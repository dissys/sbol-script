import RDFUtil from '../otol/RDFUtil';
import TopLevel from './TopLevel';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class Agent extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Agent.iri);
            this.addAnnotationType(SBOLEntity.TopLevel.iri);
        }
    }

    static create(store: any, identifier: IRI): Agent {
        return new Agent(store, identifier);
    }

    static load(store: any, identifier: IRI): Agent {
        return new Agent(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Agent(${this.getIdentifier()})`;
    }
}
