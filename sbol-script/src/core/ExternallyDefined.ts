import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import Feature from './Feature';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class ExternallyDefined extends Feature {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.ExternallyDefined.iri);
        }
    }

    // ── definition ────────────────────────────────────────────────────────

    setDefinition(definitionIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.ExternallyDefined.properties.definition, [definitionIRI]);
    }

    getDefinition(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.ExternallyDefined.properties.definition);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── type ──────────────────────────────────────────────────────────────

    setType(type: any): void { this.setTypes([type]); }
    setTypes(types: any[]): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Component.properties.type, types);
    }
    addType(type: any): void { this.addTypes([type]); }
    addTypes(types: any[]): void {
        SBOL3Util.addProperty(this.store, this.resource, SBOLEntity.Component.properties.type, types);
    }
    getTypes(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Component.properties.type) as IRI[];
    }

    static create(store: any, identifier: IRI): ExternallyDefined {
        return new ExternallyDefined(store, identifier);
    }

    static load(store: any, identifier: IRI): ExternallyDefined {
        return new ExternallyDefined(store, identifier, true);
    }

    toString(indent: string = ''): string {
        let value = `${indent}ExternallyDefined(${this.getIdentifier()})`;
        value += this.getDefinition() ? `\n${indent}, definition=${this.getDefinition()}` : '';
        value += super.toString(indent);
        return value;
    }
}
