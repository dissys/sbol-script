import RDFUtil from '../otol/RDFUtil';
import TopLevel from './TopLevel';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class Plan extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Plan.iri);
            this.addAnnotationType(SBOLEntity.TopLevel.iri);
        }
    }

    static create(store: any, identifier: IRI): Plan {
        return new Plan(store, identifier);
    }

    static load(store: any, identifier: IRI): Plan {
        return new Plan(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Plan(${this.getIdentifier()})`;
    }
}
