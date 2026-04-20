import Identified from './Identified';
import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import { SBOLEntity } from './Vocabulary';

type IRI = string;

export class Association extends Identified {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Association.iri);
            this.addAnnotationType(SBOLEntity.Identified.iri);
        }
    }

    setAgent(agentIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Association.properties.agent, [agentIRI]);
    }

    getAgent(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Association.properties.agent);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    setHadPlan(planIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Association.properties.hadPlan, [planIRI]);
    }

    getHadPlan(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Association.properties.hadPlan);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    addHadRole(role: any): void {
        SBOL3Util.addProperty(this.store, this.resource, SBOLEntity.Association.properties.hadRole, [role]);
    }

    getHadRoles(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Association.properties.hadRole) as IRI[];
    }

    static create(store: any, identifier: IRI): Association {
        return new Association(store, identifier);
    }

    static load(store: any, identifier: IRI): Association {
        return new Association(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}Association(${this.getIdentifier()}, agent=${this.getAgent()})`;
    }
}
