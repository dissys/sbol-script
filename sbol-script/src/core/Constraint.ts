import Identified from './Identified';
import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import { ConstraintRestriction, SBOLEntity } from './Vocabulary';

type IRI = string;

export class Constraint extends Identified {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Constraint.iri);
        }
    }

    // ── restriction ────────────────────────────────────────────────────────

    setRestriction(restriction: any): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Constraint.properties.restriction, [restriction]);
    }

    getRestriction(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Constraint.properties.restriction);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── subject ────────────────────────────────────────────────────────────

    setSubject(featureIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Constraint.properties.subject, [featureIRI]);
    }

    getSubject(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Constraint.properties.subject);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── object ─────────────────────────────────────────────────────────────

    setObject(featureIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Constraint.properties.object, [featureIRI]);
    }

    getObject(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Constraint.properties.object);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    static create(store: any, identifier: IRI): Constraint {
        return new Constraint(store, identifier);
    }

    static load(store: any, identifier: IRI): Constraint {
        return new Constraint(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Constraint(${this.getIdentifier()}, restriction=${this.getRestriction()})`;
    }
}
