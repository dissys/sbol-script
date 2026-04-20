import RDFUtil from '../otol/RDFUtil';
import TopLevel from './TopLevel';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class Collection extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Collection.iri);
        }
    }

    addMember(topLevelIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Collection.properties.member, [topLevelIRI]);
    }

    getMembers(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Collection.properties.member) as IRI[];
    }

    static create(store: any, identifier: IRI): Collection {
        return new Collection(store, identifier);
    }

    static load(store: any, identifier: IRI): Collection {
        return new Collection(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Collection(${this.getIdentifier()})`;
    }
}

// ─── Experiment (subclass of Collection) ─────────────────────────────────────

export class Experiment extends Collection {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, true);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Experiment.iri);
        }
    }

    static create(store: any, identifier: IRI): Experiment {
        return new Experiment(store, identifier);
    }

    static load(store: any, identifier: IRI): Experiment {
        return new Experiment(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Experiment(${this.getIdentifier()})`;
    }
}
