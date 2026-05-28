import RDFUtil from '../otol/RDFUtil';
import TopLevel from './TopLevel';
import { SBOLEntity } from './Vocabulary';

declare const $rdf: any;
type IRI = string;

// ─── Prefix ──────────────────────────────────────────────────────────────────

export class Prefix extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.TopLevel.iri);
        }
    }

    setSymbol(symbol: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Prefix.properties.symbol, [$rdf.literal(symbol)]);
    }

    getSymbol(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Prefix.properties.symbol);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setHasFactor(factor: number): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Prefix.properties.hasFactor, String(factor));
     /*Keep for future:
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Prefix.properties.hasFactor,
            [$rdf.literal(String(factor), $rdf.sym('http://www.w3.org/2001/XMLSchema#float'))]);  */ 
    }

    getHasFactor(): number | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Prefix.properties.hasFactor);
        return vals && vals.length > 0 ? parseFloat(vals[0]) : null;
    }

    addAlternativeSymbol(symbol: string): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Prefix.properties.alternativeSymbol, [$rdf.literal(symbol)]);
    }

    getAlternativeSymbols(): string[] {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Prefix.properties.alternativeSymbol);
        return vals ? vals : [];
    }

    setLabel(label: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Prefix.properties.label, [$rdf.literal(label)]);
    }

    setLongComment(comment: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Prefix.properties.longComment, [$rdf.literal(comment)]);
    }

    getLongComment(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Prefix.properties.longComment);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    addAlternativeLabel(label: string): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Prefix.properties.alternativeLabel, [$rdf.literal(label)]);
    }
   
    getAlternativeLabels(): string[] {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Prefix.properties.alternativeLabel);
        return vals ? vals : [];
    }

    setComment(comment: string): void {    
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Prefix.properties.comment, [$rdf.literal(comment)]);
    }

    getComment(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Prefix.properties.comment);
        return vals && vals.length > 0 ? vals[0] : null;
    }   

    static create(store: any, identifier: IRI): Prefix {
        return new Prefix(store, identifier);
    }

    static load(store: any, identifier: IRI): Prefix {
        return new Prefix(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Prefix(${this.getIdentifier()}, symbol=${this.getSymbol()})`;
    }
}

// ─── SIPrefix ────────────────────────────────────────────────────────────────

export class SIPrefix extends Prefix {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.addAnnotationType(SBOLEntity.SIPrefix.iri);
        }
    }

    static create(store: any, identifier: IRI): SIPrefix {
        return new SIPrefix(store, identifier);
    }

    static load(store: any, identifier: IRI): SIPrefix {
        return new SIPrefix(store, identifier, true);
    }
}

// ─── BinaryPrefix ─────────────────────────────────────────────────────────────

export class BinaryPrefix extends Prefix {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.addAnnotationType(SBOLEntity.BinaryPrefix.iri);
        }
    }

    static create(store: any, identifier: IRI): BinaryPrefix {
        return new BinaryPrefix(store, identifier);
    }

    static load(store: any, identifier: IRI): BinaryPrefix {
        return new BinaryPrefix(store, identifier, true);
    }
}
