import Identified from './Identified';
import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import { Orientation, SBOLEntity } from './Vocabulary';

declare const $rdf: any;
type IRI = string;

// ─── Abstract Location ──────────────────────────────────────────────────────

export abstract class Location extends Identified {

    constructor(store: any, identifier: IRI) {
        super(store, identifier);
    }

    // ── orientation ────────────────────────────────────────────────────────

    setOrientation(orientation: typeof Orientation.INLINE): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Location.properties.orientation, [orientation]);
    }

    getOrientation(): typeof Orientation.INLINE | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Location.properties.orientation);
        if (!vals || vals.length === 0) return null;
        const iri = vals[0];
        if (iri === Orientation.INLINE.iri) return Orientation.INLINE;
        if (iri === Orientation.REVERSE_COMPLEMENT.iri) return Orientation.REVERSE_COMPLEMENT;
        return null;
    }

    // ── order ──────────────────────────────────────────────────────────────

    setOrder(order: number): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Location.properties.order, order);
    }

    getOrder(): number | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Location.properties.order);
        return vals && vals.length > 0 ? parseInt(vals[0], 10) : null;
    }

    // ── hasSequence ────────────────────────────────────────────────────────

    setSequenceIRI(sequenceIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Location.properties.hasSequence, [sequenceIRI]);
    }

    getSequenceIRI(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Location.properties.hasSequence);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    toString(indent: string = ''): string {
        return `${indent}Location(${this.getIdentifier()})`;
    }
}

// ─── Range ──────────────────────────────────────────────────────────────────

export class Range extends Location {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Range.iri);
        }
    }

    setStart(start: number): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Range.properties.start, start);
    }

    getStart(): number | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Range.properties.start);
        return vals && vals.length > 0 ? parseInt(vals[0], 10) : null;
    }

    setEnd(end: number): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Range.properties.end, end);
    }

    getEnd(): number | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Range.properties.end);
        return vals && vals.length > 0 ? parseInt(vals[0], 10) : null;
    }

    static create(store: any, identifier: IRI): Range {
        return new Range(store, identifier);
    }

    static load(store: any, identifier: IRI): Range {
        return new Range(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Range(${this.getIdentifier()}, start=${this.getStart()}, end=${this.getEnd()})`;
    }
}

// ─── Cut ────────────────────────────────────────────────────────────────────

export class Cut extends Location {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Cut.iri);
        }
    }

    setAt(at: number): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Cut.properties.at, at);
    }

    getAt(): number | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Cut.properties.at);
        return vals && vals.length > 0 ? parseInt(vals[0], 10) : null;
    }

    static create(store: any, identifier: IRI): Cut {
        return new Cut(store, identifier);
    }

    static load(store: any, identifier: IRI): Cut {
        return new Cut(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Cut(${this.getIdentifier()}, at=${this.getAt()})`;
    }
}

// ─── EntireSequence ─────────────────────────────────────────────────────────

export class EntireSequence extends Location {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.EntireSequence.iri);
        }
    }

    static create(store: any, identifier: IRI): EntireSequence {
        return new EntireSequence(store, identifier);
    }

    static load(store: any, identifier: IRI): EntireSequence {
        return new EntireSequence(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}EntireSequence(${this.getIdentifier()})`;
    }
}
