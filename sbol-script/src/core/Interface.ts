import Identified from './Identified';
import RDFUtil from '../otol/RDFUtil';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class Interface extends Identified {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Interface.iri);
        }
    }

    // ── input ──────────────────────────────────────────────────────────────

    addInput(featureIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Interface.properties.input, [featureIRI]);
    }

    getInputs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Interface.properties.input) as IRI[];
    }

    // ── output ─────────────────────────────────────────────────────────────

    addOutput(featureIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Interface.properties.output, [featureIRI]);
    }

    getOutputs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Interface.properties.output) as IRI[];
    }

    // ── nondirectional ─────────────────────────────────────────────────────

    addNondirectional(featureIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Interface.properties.nondirectional, [featureIRI]);
    }

    getNondirectional(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Interface.properties.nondirectional) as IRI[];
    }

    static create(store: any, identifier: IRI): Interface {
        return new Interface(store, identifier);
    }

    static load(store: any, identifier: IRI): Interface {
        return new Interface(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Interface(${this.getIdentifier()})`;
    }
}
