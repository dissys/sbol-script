import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import TopLevel from './TopLevel';
import { SBOLEntity } from './Vocabulary';

declare const $rdf: any;
type IRI = string;

// ─── Abstract Unit ───────────────────────────────────────────────────────────

export class Unit extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.TopLevel.iri);
        }
    }

    setSymbol(symbol: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Unit.properties.symbol, [$rdf.literal(symbol)]);
    }

    getSymbol(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Unit.properties.symbol);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    addAlternativeSymbol(symbol: string): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Unit.properties.alternativeSymbol, [$rdf.literal(symbol)]);
    }

    setLongComment(comment: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Unit.properties.longComment, [$rdf.literal(comment)]);
    }

    getLongComment(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Unit.properties.longComment);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setHasUnit(unitIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Unit.properties.hasUnit, [unitIRI]);
    }

    getHasUnit(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Unit.properties.hasUnit);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setLabel(label: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Unit.properties.label, [$rdf.literal(label)]);
    }

    getLabel(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Unit.properties.label);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setComment(comment: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Unit.properties.comment, [$rdf.literal(comment)]);
    }
    
    getComment(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Unit.properties.comment);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    addAlternativeLabel(label: string): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Unit.properties.alternativeLabel, [$rdf.literal(label)]);
    }

    getAlternativeLabels(): string[] {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Unit.properties.alternativeLabel);
        return vals ? vals : [];
    }

    static create(store: any, identifier: IRI): Unit {
        return new Unit(store, identifier);
    }

    static load(store: any, identifier: IRI): Unit {
        return new Unit(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Unit(${this.getIdentifier()}, symbol=${this.getSymbol()})`;
    }
}

// ─── SingularUnit ─────────────────────────────────────────────────────────────

export class SingularUnit extends Unit {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.addAnnotationType(SBOLEntity.SingularUnit.iri);
        }
    }

    setHasFactor(factor: number): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.SingularUnit.properties.hasFactor,String(factor));
    }

    getHasFactor(): number | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.SingularUnit.properties.hasFactor);
        return vals && vals.length > 0 ? parseFloat(vals[0]) : null;
    }

    static create(store: any, identifier: IRI): SingularUnit {
        return new SingularUnit(store, identifier);
    }

    static load(store: any, identifier: IRI): SingularUnit {
        return new SingularUnit(store, identifier, true);
    }
}

// ─── PrefixedUnit ─────────────────────────────────────────────────────────────

export class PrefixedUnit extends Unit {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.addAnnotationType(SBOLEntity.PrefixedUnit.iri);
        }
    }

    setHasPrefix(prefixIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.PrefixedUnit.properties.hasPrefix, [prefixIRI]);
    }

    getHasPrefix(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.PrefixedUnit.properties.hasPrefix);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    static create(store: any, identifier: IRI): PrefixedUnit {
        return new PrefixedUnit(store, identifier);
    }

    static load(store: any, identifier: IRI): PrefixedUnit {
        return new PrefixedUnit(store, identifier, true);
    }
}

// ─── UnitMultiplication ───────────────────────────────────────────────────────

export class UnitMultiplication extends Unit {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.addAnnotationType(SBOLEntity.UnitMultiplication.iri);
        }
    }

    setHasTerm1(unitIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.UnitMultiplication.properties.hasTerm1, [unitIRI]);
    }

    getHasTerm1(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.UnitMultiplication.properties.hasTerm1);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setHasTerm2(unitIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.UnitMultiplication.properties.hasTerm2, [unitIRI]);
    }

    getHasTerm2(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.UnitMultiplication.properties.hasTerm2);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    static create(store: any, identifier: IRI): UnitMultiplication {
        return new UnitMultiplication(store, identifier);
    }

    static load(store: any, identifier: IRI): UnitMultiplication {
        return new UnitMultiplication(store, identifier, true);
    }
}

// ─── UnitDivision ─────────────────────────────────────────────────────────────

export class UnitDivision extends Unit {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.addAnnotationType(SBOLEntity.UnitDivision.iri);
        }
    }

    setHasNumerator(unitIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.UnitDivision.properties.hasNumerator, [unitIRI]);
    }

    getHasNumerator(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.UnitDivision.properties.hasNumerator);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setHasDenominator(unitIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.UnitDivision.properties.hasDenominator, [unitIRI]);
    }

    getHasDenominator(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.UnitDivision.properties.hasDenominator);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    static create(store: any, identifier: IRI): UnitDivision {
        return new UnitDivision(store, identifier);
    }

    static load(store: any, identifier: IRI): UnitDivision {
        return new UnitDivision(store, identifier, true);
    }
}

// ─── UnitExponentiation ───────────────────────────────────────────────────────

export class UnitExponentiation extends Unit {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.addAnnotationType(SBOLEntity.UnitExponentiation.iri);
        }
    }

    setHasBase(unitIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.UnitExponentiation.properties.hasBase, [unitIRI]);
    }

    getHasBase(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.UnitExponentiation.properties.hasBase);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setHasExponent(exponent: number): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.UnitExponentiation.properties.hasExponent, exponent);
    }

    getHasExponent(): number | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.UnitExponentiation.properties.hasExponent);
        return vals && vals.length > 0 ? parseInt(vals[0], 10) : null;
    }

    static create(store: any, identifier: IRI): UnitExponentiation {
        return new UnitExponentiation(store, identifier);
    }

    static load(store: any, identifier: IRI): UnitExponentiation {
        return new UnitExponentiation(store, identifier, true);
    }
}
