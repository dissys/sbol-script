import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import TopLevel from './TopLevel';
import { ModelLanguage, ModelFramework, SBOLEntity } from './Vocabulary';

type IRI = string;

export class Model extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Model.iri);
        }
    }

    setSource(sourceIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Model.properties.source, [sourceIRI]);
    }

    getSource(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Model.properties.source);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setLanguage(language: any): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Model.properties.language, [language]);
    }

    getLanguage(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Model.properties.language);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setFramework(framework: any): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Model.properties.framework, [framework]);
    }

    getFramework(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Model.properties.framework);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    static create(store: any, identifier: IRI): Model {
        return new Model(store, identifier);
    }

    static load(store: any, identifier: IRI): Model {
        return new Model(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Model(${this.getIdentifier()})`;
    }
}
