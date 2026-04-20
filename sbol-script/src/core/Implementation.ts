import RDFUtil from '../otol/RDFUtil';
import TopLevel from './TopLevel';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class Implementation extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Implementation.iri);
        }
    }

    setBuilt(componentIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Implementation.properties.built, [componentIRI]);
    }

    getBuilt(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Implementation.properties.built);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    static create(store: any, identifier: IRI): Implementation {
        return new Implementation(store, identifier);
    }

    static load(store: any, identifier: IRI): Implementation {
        return new Implementation(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Implementation(${this.getIdentifier()})`;
    }
}
