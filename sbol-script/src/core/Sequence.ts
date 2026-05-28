import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import TopLevel from './TopLevel';
import { Encoding, NucleicAcidTopology, SBOLEntity } from './Vocabulary';

declare const $rdf: any;
type IRI = string;

export class Sequence extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Sequence.iri);
        }
    }

    // ── elements ───────────────────────────────────────────────────────────

    setElements(elements: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Sequence.properties.elements, [$rdf.literal(elements)]);
    }

    getElements(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Sequence.properties.elements);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── encoding ───────────────────────────────────────────────────────────

    setEncoding(encoding: any): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Sequence.properties.encoding, [encoding]);
    }

    getEncoding(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Sequence.properties.encoding);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    static create(store: any, identifier: IRI): Sequence {
        return new Sequence(store, identifier);
    }

    static load(store: any, identifier: IRI): Sequence {
        return new Sequence(store, identifier, true);
    }

    toString(indent: string = ''): string {
        let value = `${indent}Sequence(${this.getIdentifier()})`;
        value += this.getElements() ? `\n${indent}, elements=${this.getElements()}` : '';
        value += this.getEncoding() ? `\n${indent}, encoding=${this.getEncoding()}` : '';
        return value;
    }
}

// ─── SequenceWithElements ────────────────────────────────────────────────────

export class SequenceWithElements extends Sequence {
    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
    }
    static create(store: any, identifier: IRI): SequenceWithElements {
        return new SequenceWithElements(store, identifier);
    }
    static load(store: any, identifier: IRI): SequenceWithElements {
        return new SequenceWithElements(store, identifier, true);
    }
}

// ─── DNASequence ─────────────────────────────────────────────────────────────

export class DNASequence extends SequenceWithElements {
    protected constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setEncoding(Encoding.IUPAC_DNA_RNA);
    }
    static create(store: any, identifier: IRI): DNASequence {
        return new DNASequence(store, identifier);
    }
    static load(store: any, identifier: IRI): DNASequence {
        return new DNASequence(store, identifier);
    }
}

// ─── RNASequence ─────────────────────────────────────────────────────────────

export class RNASequence extends SequenceWithElements {
    protected constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setEncoding(Encoding.IUPAC_DNA_RNA);
    }
    static create(store: any, identifier: IRI): RNASequence {
        return new RNASequence(store, identifier);
    }
    static load(store: any, identifier: IRI): RNASequence {
        return new RNASequence(store, identifier);
    }
}

// ─── ProteinSequence ─────────────────────────────────────────────────────────

export class ProteinSequence extends SequenceWithElements {
    protected constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setEncoding(Encoding.IUPAC_Protein);
    }
    static create(store: any, identifier: IRI): ProteinSequence {
        return new ProteinSequence(store, identifier);
    }
    static load(store: any, identifier: IRI): ProteinSequence {
        return new ProteinSequence(store, identifier);
    }
}

// ─── InChISequence ───────────────────────────────────────────────────────────

export class InChISequence extends SequenceWithElements {
    protected constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setEncoding(Encoding.InChI);
    }
    static create(store: any, identifier: IRI): InChISequence {
        return new InChISequence(store, identifier);
    }
    static load(store: any, identifier: IRI): InChISequence {
        return new InChISequence(store, identifier);
    }
}

// ─── SMILESSequence ──────────────────────────────────────────────────────────

export class SMILESSequence extends SequenceWithElements {
    protected constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setEncoding(Encoding.SMILES);
    }
    static create(store: any, identifier: IRI): SMILESSequence {
        return new SMILESSequence(store, identifier);
    }
    static load(store: any, identifier: IRI): SMILESSequence {
        return new SMILESSequence(store, identifier);
    }
}
