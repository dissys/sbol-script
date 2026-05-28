import GraphEntity from '../otol/GraphEntity';
import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import { SBOLEntity } from './Vocabulary';

declare const $rdf: any;
type IRI = string;

export default abstract class Identified extends GraphEntity {

    constructor(store: any, identifier: string) {
        super(store, identifier);
    }

    // ── inferDisplayId ─────────────────────────────────────────────────────

    /**
     * Extracts the displayId from a URI by taking the last path segment,
     * provided the URI string ends with that segment.
     * Returns null for non-URL URIs (e.g. URNs).
     * Throws if the URI is a URL but has no valid displayId segment.
     */
    static inferDisplayId(uri: string): string | null {
        if (uri.startsWith('urn:')) {
            return null; // URN — no displayId to infer
        }
        let parsed: URL;
        try {
            parsed = new URL(uri);
        } catch {
            return null; // non-URL URI — no displayId to infer
        }
        const path = parsed.pathname;
        const index = path.lastIndexOf('/');
        const result = path.length > index + 1 ? path.substring(index + 1) : null;
        if (result && uri.endsWith(result)) {
            return result;
        } else {
            throw new Error(`An SBOL URI MUST include the display id fragment. URI: ${uri}`);
        }
    }

    protected _inferDisplayId(uri: string): void {
        if (!this.getDisplayId()) {
            const result = Identified.inferDisplayId(uri);
            if (result) {
                this.setDisplayId(result);
            }
        }
    }

    /**
     * Registers this entity in the RDF store with the given type IRI and
     * infers its displayId from its URI. Call this in subclass constructors
     * instead of RDFUtil.createResource directly.
     */
    protected initResource(typeIRI: IRI): void {
        RDFUtil.createResource(this.store, this.identifier, typeIRI);
        this._inferDisplayId(this.identifier);
    }

    // ── displayId ──────────────────────────────────────────────────────────

    setDisplayId(displayId: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Identified.properties.displayId, [$rdf.literal(displayId)]);
    }

    getDisplayId(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Identified.properties.displayId);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── name ───────────────────────────────────────────────────────────────

    setName(name: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Identified.properties.name, [$rdf.literal(name)]);
    }

    getName(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Identified.properties.name);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── description ────────────────────────────────────────────────────────

    setDescription(description: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Identified.properties.description, [$rdf.literal(description)]);
    }

    getDescription(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Identified.properties.description);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── wasDerivedFrom ─────────────────────────────────────────────────────

    addWasDerivedFrom(iri: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Identified.properties.wasDerivedFrom, [iri]);
    }

    getWasDerivedFrom(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Identified.properties.wasDerivedFrom) as IRI[];
    }

    // ── wasGeneratedBy ─────────────────────────────────────────────────────

    setWasGeneratedBy(activityIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Identified.properties.wasGeneratedBy, [activityIRI]);
    }

    getWasGeneratedBy(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Identified.properties.wasGeneratedBy);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── hasMeasure ─────────────────────────────────────────────────────────

    addMeasureIRI(measureIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Identified.properties.hasMeasure, [measureIRI]);
    }

    getMeasureIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Identified.properties.hasMeasure) as IRI[];
    }

    // ── toString ───────────────────────────────────────────────────────────

    toString(indent: string = ''): string {
        return `${indent}Identified(${this.identifier})`;
    }
}
