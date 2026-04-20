import SBOLNamespaces from './SBOLNamespaces';
import Identified from './Identified';
import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import GraphUtil from '../otol/GraphUtil';
import { Orientation, SBOLEntity } from './Vocabulary';

declare const $rdf: any;
type IRI = string;

export default abstract class Feature extends Identified {

    constructor(store: any, identifier: IRI) {
        super(store, identifier);
    }

    // ── orientation ────────────────────────────────────────────────────────

    setOrientation(orientation: typeof Orientation.INLINE): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Feature.properties.orientation, [orientation]);
    }

    getOrientation(): typeof Orientation.INLINE | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Feature.properties.orientation);
        if (!vals || vals.length === 0) return null;
        const iri = vals[0];
        if (iri === Orientation.INLINE.iri) return Orientation.INLINE;
        if (iri === Orientation.REVERSE_COMPLEMENT.iri) return Orientation.REVERSE_COMPLEMENT;
        return null;
    }

    // ── role ───────────────────────────────────────────────────────────────

    setRole(role: any): void { this.setRoles([role]); }
    setRoles(roles: any[]): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Feature.properties.role, roles);
    }
    addRole(role: any): void { this.addRoles([role]); }
    addRoles(roles: any[]): void {
        SBOL3Util.addProperty(this.store, this.resource, SBOLEntity.Feature.properties.role, roles);
    }
    getRoles(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Feature.properties.role) as IRI[];
    }

    // ── hasLocation factory methods ────────────────────────────────────────
    // These create Location child entities on this Feature.

    createRange(start: number, end: number, identifier?: string): any {
        // Import lazily to avoid circular deps
        const { Range } = require('./Location');
        if (!identifier) {
            identifier = `Range${this.getLocationIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const range = Range.create(this.store, iri);
        range.setStart(start);
        range.setEnd(end);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Feature.properties.hasLocation, [iri]);
        return range;
    }

    createCut(at: number, identifier?: string): any {
        const { Cut } = require('./Location');
        if (!identifier) {
            identifier = `Cut${this.getLocationIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const cut = Cut.create(this.store, iri);
        cut.setAt(at);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Feature.properties.hasLocation, [iri]);
        return cut;
    }

    createEntireSequence(identifier?: string): any {
        const { EntireSequence } = require('./Location');
        if (!identifier) {
            identifier = `EntireSequence${this.getLocationIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const es = EntireSequence.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Feature.properties.hasLocation, [iri]);
        return es;
    }

    getLocationIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Feature.properties.hasLocation) as IRI[];
    }

    // ── toString ───────────────────────────────────────────────────────────

    toString(indent: string = ''): string {
        const orientation = this.getOrientation();
        let value = '';
        value += orientation ? `\n${indent}, orientation=${orientation.label} (${orientation.iri})` : '';
        return value;
    }
}
