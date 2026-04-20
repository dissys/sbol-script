import Identified from './Identified';
import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import { Cardinality, SBOLEntity } from './Vocabulary';

type IRI = string;

export class VariableFeature extends Identified {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.VariableFeature.iri);
        }
    }

    // ── cardinality ────────────────────────────────────────────────────────

    setCardinality(cardinality: typeof Cardinality.One): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.cardinality, [cardinality]);
    }

    getCardinality(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.cardinality);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── variable ───────────────────────────────────────────────────────────

    setVariable(featureIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.variable, [featureIRI]);
    }

    getVariable(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.variable);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── variant ────────────────────────────────────────────────────────────

    addVariant(componentIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.variant, [componentIRI]);
    }

    getVariants(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.variant) as IRI[];
    }

    addVariantCollection(collectionIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.variantCollection, [collectionIRI]);
    }

    getVariantCollections(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.variantCollection) as IRI[];
    }

    addVariantDerivation(derivationIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.variantDerivation, [derivationIRI]);
    }

    getVariantDerivations(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.variantDerivation) as IRI[];
    }

    addVariantMeasure(measureIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.variantMeasure, [measureIRI]);
    }

    getVariantMeasures(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.VariableFeature.properties.variantMeasure) as IRI[];
    }

    static create(store: any, identifier: IRI): VariableFeature {
        return new VariableFeature(store, identifier);
    }

    static load(store: any, identifier: IRI): VariableFeature {
        return new VariableFeature(store, identifier, true);
    }

    toString(indent: string = ''): string {
        return `${indent}VariableFeature(${this.getIdentifier()}, cardinality=${this.getCardinality()})`;
    }
}
