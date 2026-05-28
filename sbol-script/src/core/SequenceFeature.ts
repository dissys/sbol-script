import RDFUtil from '../otol/RDFUtil';
import Feature from './Feature';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class SequenceFeature extends Feature {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.SequenceFeature.iri);
        }
    }

    static create(store: any, identifier: IRI): SequenceFeature {
        return new SequenceFeature(store, identifier);
    }

    static load(store: any, identifier: IRI): SequenceFeature {
        return new SequenceFeature(store, identifier, true);
    }

    toString(indent: string = ''): string {
        let value = `${indent}SequenceFeature(${this.getIdentifier()})`;
        value += super.toString(indent);
        return value;
    }
}
