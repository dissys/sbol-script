import SBOLNamespaces from './SBOLNamespaces';
import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import GraphUtil from '../otol/GraphUtil';
import { Orientation, RoleIntegration, SBOLEntity } from './Vocabulary';
import Feature from './Feature';
import { Component } from './Component';
import { Range, Cut, EntireSequence } from './Location';

declare const $rdf: any;
type IRI = string;

export class SubComponent extends Feature {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.SubComponent.iri);
        }
    }

    // ── instanceOf ─────────────────────────────────────────────────────────

    setInstanceOf(instanceOf: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.SubComponent.properties.instanceOf, [instanceOf]);
    }

    getInstanceOfIRI(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.SubComponent.properties.instanceOf);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    getInstanceOf(): Component {
        const iri = this.getInstanceOfIRI();
        if (!iri) throw new Error('instanceOf is not set');
        return Component.load(this.store, iri);
    }

    // ── roleIntegration ────────────────────────────────────────────────────

    setRoleIntegration(roleIntegration: typeof RoleIntegration.MergeRoles): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.SubComponent.properties.roleIntegration, [roleIntegration]);
    }

    getRoleIntegration(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.SubComponent.properties.roleIntegration);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── sourceLocation factory methods ─────────────────────────────────────

    createSourceRange(start: number, end: number, identifier?: string): Range {
        if (!identifier) {
            identifier = `SourceRange${this.getSourceLocationIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const range = Range.create(this.store, iri);
        range.setStart(start);
        range.setEnd(end);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.SubComponent.properties.sourceLocation, [iri]);
        return range;
    }

    createSourceCut(at: number, identifier?: string): Cut {
        if (!identifier) {
            identifier = `SourceCut${this.getSourceLocationIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const cut = Cut.create(this.store, iri);
        cut.setAt(at);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.SubComponent.properties.sourceLocation, [iri]);
        return cut;
    }

    createSourceEntireSequence(identifier?: string): EntireSequence {
        if (!identifier) {
            identifier = `SourceEntireSequence${this.getSourceLocationIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const es = EntireSequence.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.SubComponent.properties.sourceLocation, [iri]);
        return es;
    }

    getSourceLocationIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.SubComponent.properties.sourceLocation) as IRI[];
    }

    static create(store: any, identifier: IRI): SubComponent {
        return new SubComponent(store, identifier);
    }

    static load(store: any, identifier: IRI): SubComponent {
        return new SubComponent(store, identifier, true);
    }

    toString(indent: string = ''): string {
        let value = `${indent}SubComponent(${this.getIdentifier()})`;
        value += super.toString(indent);
        value += this.getInstanceOfIRI() ? `\n${indent}, instanceOf=${this.getInstanceOfIRI()}` : '';
        return value;
    }
}
