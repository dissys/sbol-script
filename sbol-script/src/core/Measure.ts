import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import TopLevel from './TopLevel';
import { SBOLEntity } from './Vocabulary';

declare const $rdf: any;
type IRI = string;

export class Measure extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Measure.iri);
            this.addAnnotationType(SBOLEntity.Identified.iri);
        }
    }

    setHasNumericalValue(value: number): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Measure.properties.hasNumericalValue, String(value)); 
    }

    getHasNumericalValue(): number | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Measure.properties.hasNumericalValue);
        return vals && vals.length > 0 ? parseFloat(vals[0]) : null;
    }

    setHasUnit(unitIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Measure.properties.hasUnit, [unitIRI]);
    }

    getHasUnit(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Measure.properties.hasUnit);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setType(type: any): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Measure.properties.type, [type]);
    }

    getType(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Measure.properties.type);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    addType(type: any): void {
        SBOL3Util.addProperty(this.store, this.resource, SBOLEntity.Measure.properties.type, [type]);
    }

    static create(store: any, identifier: IRI): Measure {
        return new Measure(store, identifier);
    }

    static load(store: any, identifier: IRI): Measure {
        return new Measure(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Measure(${this.getIdentifier()}, value=${this.getHasNumericalValue()}, unit=${this.getHasUnit()})`;
    }
}
