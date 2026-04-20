import RDFUtil from '../otol/RDFUtil';
import TopLevel from './TopLevel';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class ExperimentalData extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.ExperimentalData.iri);
        }
    }

    addAttachment(attachmentIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.ExperimentalData.properties.attachment, [attachmentIRI]);
    }

    getAttachments(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.ExperimentalData.properties.attachment) as IRI[];
    }

    static create(store: any, identifier: IRI): ExperimentalData {
        return new ExperimentalData(store, identifier);
    }

    static load(store: any, identifier: IRI): ExperimentalData {
        return new ExperimentalData(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}ExperimentalData(${this.getIdentifier()})`;
    }
}
