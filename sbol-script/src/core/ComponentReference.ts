import RDFUtil from '../otol/RDFUtil';
import Feature from './Feature';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class ComponentReference extends Feature {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.ComponentReference.iri);
        }
    }

    // ── inChildOf ─────────────────────────────────────────────────────────

    setInChildOf(subComponentIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.ComponentReference.properties.inChildOf, [subComponentIRI]);
    }

    getInChildOf(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.ComponentReference.properties.inChildOf);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── refersTo ──────────────────────────────────────────────────────────

    setRefersTo(featureIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.ComponentReference.properties.refersTo, [featureIRI]);
    }

    getRefersTo(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.ComponentReference.properties.refersTo);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    static create(store: any, identifier: IRI): ComponentReference {
        return new ComponentReference(store, identifier);
    }

    static load(store: any, identifier: IRI): ComponentReference {
        return new ComponentReference(store, identifier, true);
    }

    toString(indent: string = ''): string {
        let value = `${indent}ComponentReference(${this.getIdentifier()})`;
        value += this.getRefersTo() ? `\n${indent}, refersTo=${this.getRefersTo()}` : '';
        return value;
    }
}
