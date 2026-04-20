import Identified from './Identified';
import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class Usage extends Identified {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Usage.iri);
            this.addAnnotationType(SBOLEntity.Identified.iri);
        }
    }

    setEntity(entityIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Usage.properties.entity, [entityIRI]);
    }

    getEntity(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Usage.properties.entity);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    addHadRole(role: any): void {
        SBOL3Util.addProperty(this.store, this.resource, SBOLEntity.Usage.properties.hadRole, [role]);
    }

    getHadRoles(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Usage.properties.hadRole) as IRI[];
    }

    static create(store: any, identifier: IRI): Usage {
        return new Usage(store, identifier);
    }

    static load(store: any, identifier: IRI): Usage {
        return new Usage(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Usage(${this.getIdentifier()}, entity=${this.getEntity()})`;
    }
}
