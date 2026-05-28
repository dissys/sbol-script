import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import TopLevel from './TopLevel';
import { Encoding, SBOLEntity } from './Vocabulary';

declare const $rdf: any;
type IRI = string;

export class Attachment extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Attachment.iri);
        }
    }

    setSource(sourceIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Attachment.properties.source, [sourceIRI]);
    }

    getSource(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Attachment.properties.source);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setFormat(format: any): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Attachment.properties.format, [format]);
    }

    getFormat(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Attachment.properties.format);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setSize(size: number): void {
    /*    RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Attachment.properties.size,
            [$rdf.literal(String(size), $rdf.sym('http://www.w3.org/2001/XMLSchema#integer'))]);
    */
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Attachment.properties.size, size);
    }

    getSize(): number | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Attachment.properties.size);
        return vals && vals.length > 0 ? parseInt(vals[0], 10) : null;
    }

    setHash(hash: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Attachment.properties.hash, [$rdf.literal(hash)]);
    }

    getHash(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Attachment.properties.hash);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setHashAlgorithm(algo: string): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Attachment.properties.hashAlgorithm, [$rdf.literal(algo)]);
    }

    getHashAlgorithm(): string | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Attachment.properties.hashAlgorithm);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    static create(store: any, identifier: IRI): Attachment {
        return new Attachment(store, identifier);
    }

    static load(store: any, identifier: IRI): Attachment {
        return new Attachment(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Attachment(${this.getIdentifier()})`;
    }
}
