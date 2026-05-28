import SBOLNamespaces from './SBOLNamespaces';
import Identified from './Identified';
import RDFUtil from '../otol/RDFUtil';
import { SBOLEntity } from './Vocabulary';

declare const $rdf: any;
type IRI = string;

export default abstract class TopLevel extends Identified {

    constructor(store: any, identifier: IRI) {
        super(store, identifier);
    }

    // ── hasNamespace ───────────────────────────────────────────────────────

    getNamespace(): IRI | null {
        const namespace = this.store.any(this.resource, $rdf.sym(SBOLNamespaces.SBOL('hasNamespace')));
        return namespace ? namespace.value : null;
    }

    setNamespace(namespace: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.TopLevel.properties.hasNamespace, [namespace]);
    }

    // ── hasAttachment ─────────────────────────────────────────────────────

    addAttachmentIRI(attachmentIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.TopLevel.properties.hasAttachment, [attachmentIRI]);
    }

    getAttachmentIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.TopLevel.properties.hasAttachment) as IRI[];
    }

    // ── toString ───────────────────────────────────────────────────────────

    toString(): string {
        let value = super.toString();
        value += this.getNamespace() ? `, namespace=${this.getNamespace()}\n` : '';
        return value;
    }
}
