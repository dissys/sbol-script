import RDFUtil from '../otol/RDFUtil';
import GraphUtil from '../otol/GraphUtil';
import TopLevel from './TopLevel';
import { Usage } from './Usage';
import { Association } from './Association';
import { SBOLEntity } from './Vocabulary';

declare const $rdf: any;
type IRI = string;

export class Activity extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Activity.iri);
            this.addAnnotationType(SBOLEntity.TopLevel.iri);
        }
    }

    // ── time ───────────────────────────────────────────────────────────────

    setStartedAtTime(dateTime: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Activity.properties.startedAtTime,dateTime);
        /*Keep fot future use:
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Activity.properties.startedAtTime,
            [$rdf.literal(dateTime, $rdf.sym('http://www.w3.org/2001/XMLSchema#dateTime'))]);*/
            
    }

    getStartedAtTime(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Activity.properties.startedAtTime);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setEndedAtTime(dateTime: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Activity.properties.endedAtTime, dateTime);
    }

    getEndedAtTime(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Activity.properties.endedAtTime);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── wasInformedBy ─────────────────────────────────────────────────────

    addWasInformedBy(activityIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Activity.properties.wasInformedBy, [activityIRI]);
    }

    getWasInformedBy(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Activity.properties.wasInformedBy) as IRI[];
    }

    // ── qualifiedUsage factory ────────────────────────────────────────────

    createUsage(entityIRI: IRI, identifier?: string): any {
        const count = this.getUsageIRIs().length;
        if (!identifier) identifier = `Usage${count + 1}`;
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const usage = Usage.create(this.store, iri);
        usage.setEntity(entityIRI);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Activity.properties.qualifiedUsage, [iri]);
        return usage;
    }

    getUsageIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Activity.properties.qualifiedUsage) as IRI[];
    }

    // ── qualifiedAssociation factory ──────────────────────────────────────

    createAssociation(agentIRI: IRI, identifier?: string): any {
        const count = this.getAssociationIRIs().length;
        if (!identifier) identifier = `Association${count + 1}`;
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const assoc = Association.create(this.store, iri);
        assoc.setAgent(agentIRI);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Activity.properties.qualifiedAssociation, [iri]);
        return assoc;
    }

    getAssociationIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Activity.properties.qualifiedAssociation) as IRI[];
    }

    static create(store: any, identifier: IRI): Activity {
        return new Activity(store, identifier);
    }

    static load(store: any, identifier: IRI): Activity {
        return new Activity(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Activity(${this.getIdentifier()})`;
    }
}
