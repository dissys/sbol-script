import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import GraphUtil from '../otol/GraphUtil';
import TopLevel from './TopLevel';
import { VariableFeature } from './VariableFeature';
import { CombinatorialDerivationStrategy, SBOLEntity } from './Vocabulary';

type IRI = string;

export class CombinatorialDerivation extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.CombinatorialDerivation.iri);
        }
    }

    // ── strategy ───────────────────────────────────────────────────────────

    setStrategy(strategy: typeof CombinatorialDerivationStrategy.Enumerate): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.CombinatorialDerivation.properties.strategy, [strategy]);
    }

    getStrategy(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.CombinatorialDerivation.properties.strategy);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── template ───────────────────────────────────────────────────────────

    setTemplate(componentIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.CombinatorialDerivation.properties.template, [componentIRI]);
    }

    getTemplate(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.CombinatorialDerivation.properties.template);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── hasVariableFeature factory ─────────────────────────────────────────

    createVariableFeature(identifier?: string): VariableFeature {
        if (!identifier) {
            identifier = `VariableFeature${this.getVariableFeatureIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const vf = VariableFeature.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.CombinatorialDerivation.properties.hasVariableFeature, [iri]);
        return vf;
    }

    getVariableFeatureIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.CombinatorialDerivation.properties.hasVariableFeature) as IRI[];
    }

    static create(store: any, identifier: IRI): CombinatorialDerivation {
        return new CombinatorialDerivation(store, identifier);
    }

    static load(store: any, identifier: IRI): CombinatorialDerivation {
        return new CombinatorialDerivation(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}CombinatorialDerivation(${this.getIdentifier()}, strategy=${this.getStrategy()})`;
    }
}
