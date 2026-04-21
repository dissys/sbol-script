import { SBOLDocument } from '../core/SBOLDocument';
import {
    Component,
    PromoterDNAComponent, RBSDNAComponent, CDSDNAComponent, TerminatorDNAComponent,
    GeneDNAComponent, OperatorDNAComponent, EngineeredRegionDNAComponent, GenericDNAComponent,
    RNAComponent, ProteinComponent, SimpleChemicalComponent, NonCovalentComplexComponent,
    FunctionalEntityComponent, TranscriptionFactorProteinComponent, EffectorSimpleChemicalComponent,
    DNAComponent
} from '../core/Component';
import {
    InhibitionInteraction, StimulationInteraction, DegradationInteraction,
    BiochemicalReactionInteraction, NonCovalentBindingInteraction,
    GeneticProductionInteraction, ControlInteraction
} from '../core/Interaction';
import { ComponentType, Encoding } from '../core/Vocabulary';

type IRI = string;

/**
 * SBOLAPI provides high-level factory methods for common SBOL3 constructs.
 * These methods automatically create all required child entities (participants, etc.)
 * so that users do not need to manually specify participant roles.
 */
export class SBOLAPI {

    // ─── Named Component factories ─────────────────────────────────────────

    static createPromoterDNAComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): PromoterDNAComponent {
        const comp = PromoterDNAComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    static createRBSDNAComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): RBSDNAComponent {
        const comp = RBSDNAComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    static createCDSDNAComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): CDSDNAComponent {
        const comp = CDSDNAComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    static createTerminatorDNAComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): TerminatorDNAComponent {
        const comp = TerminatorDNAComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    static createGeneDNAComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): GeneDNAComponent {
        const comp = GeneDNAComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    static createOperatorDNAComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): OperatorDNAComponent {
        const comp = OperatorDNAComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    static createEngineeredRegionDNAComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): EngineeredRegionDNAComponent {
        const comp = EngineeredRegionDNAComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    static createRNAComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): RNAComponent {
        const comp = RNAComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    static createProteinComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): ProteinComponent {
        const comp = ProteinComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    static createSimpleChemicalComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): SimpleChemicalComponent {
        const comp = SimpleChemicalComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    static createTranscriptionFactorProteinComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): TranscriptionFactorProteinComponent {
        const comp = TranscriptionFactorProteinComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    static createEffectorSimpleChemicalComponent(doc: SBOLDocument, identifier: IRI, namespace: IRI): EffectorSimpleChemicalComponent {
        const comp = EffectorSimpleChemicalComponent.create(doc.store, identifier);
        comp.setNamespace(namespace);
        return comp;
    }

    // ─── Interaction factories ─────────────────────────────────────────────

    /**
     * Creates an InhibitionInteraction with an inhibitor and inhibited participant.
     * @param component - Parent component to contain the interaction
     * @param inhibitorIRI - IRI of the inhibitor Feature (e.g. SubComponent)
     * @param inhibitedIRI - IRI of the inhibited Feature
     * @param identifier - Optional identifier for the interaction
     */
    static createInhibitionInteraction(
        component: Component,
        inhibitorIRI: IRI,
        inhibitedIRI: IRI,
        identifier?: string
    ): InhibitionInteraction {
        const interaction = component.createInhibitionInteraction(identifier);
        interaction.createInhibitorParticipation(inhibitorIRI);
        interaction.createInhibitedParticipation(inhibitedIRI);
        return interaction;
    }

    /**
     * Creates a StimulationInteraction with a stimulator and stimulated participant.
     * @param component - Parent component
     * @param stimulatorIRI - IRI of the stimulator Feature
     * @param stimulatedIRI - IRI of the stimulated Feature
     * @param identifier - Optional identifier
     */
    static createStimulationInteraction(
        component: Component,
        stimulatorIRI: IRI,
        stimulatedIRI: IRI,
        identifier?: string
    ): StimulationInteraction {
        const interaction = component.createStimulationInteraction(identifier);
        interaction.createStimulatorParticipation(stimulatorIRI);
        interaction.createStimulatedParticipation(stimulatedIRI);
        return interaction;
    }

    /**
     * Creates a DegradationInteraction for one or more reactant features.
     * @param component - Parent component
     * @param reactantIRIs - IRIs of Feature(s) being degraded
     * @param identifier - Optional identifier
     */
    static createDegradationInteraction(
        component: Component,
        reactantIRIs: IRI[],
        identifier?: string
    ): DegradationInteraction {
        const interaction = component.createDegradationInteraction(identifier);
        reactantIRIs.forEach((iri, i) => {
            interaction.createReactantParticipation(iri, `Reactant${i + 1}`);
        });
        return interaction;
    }

    /**
     * Creates a BiochemicalReactionInteraction with reactants and products.
     * @param component - Parent component
     * @param reactantIRIs - IRIs of reactant Features
     * @param productIRIs - IRIs of product Features
     * @param identifier - Optional identifier
     */
    static createBiochemicalReactionInteraction(
        component: Component,
        reactantIRIs: IRI[],
        productIRIs: IRI[],
        identifier?: string
    ): BiochemicalReactionInteraction {
        const interaction = component.createBiochemicalReactionInteraction(identifier);
        reactantIRIs.forEach((iri, i) => {
            interaction.createReactantParticipation(iri, `Reactant${i + 1}`);
        });
        productIRIs.forEach((iri, i) => {
            interaction.createProductParticipation(iri, `Product${i + 1}`);
        });
        return interaction;
    }

    /**
     * Creates a NonCovalentBindingInteraction with reactants forming a product complex.
     * @param component - Parent component
     * @param reactantIRIs - IRIs of reactant Features binding together
     * @param productIRI - IRI of the resulting complex Feature
     * @param identifier - Optional identifier
     */
    static createNonCovalentBindingInteraction(
        component: Component,
        reactantIRIs: IRI[],
        productIRI: IRI,
        identifier?: string
    ): NonCovalentBindingInteraction {
        const interaction = component.createNonCovalentBindingInteraction(identifier);
        reactantIRIs.forEach((iri, i) => {
            interaction.createReactantParticipation(iri, `Reactant${i + 1}`);
        });
        interaction.createProductParticipation(productIRI, 'Product1');
        return interaction;
    }

    /**
     * Creates a GeneticProductionInteraction with template and product participants.
     * @param component - Parent component
     * @param templateIRI - IRI of the template Feature (DNA/RNA being expressed)
     * @param productIRI - IRI of the product Feature (RNA/Protein produced)
     * @param promoterIRI - Optional IRI of the promoter Feature
     * @param identifier - Optional identifier
     */
    static createGeneticProductionInteraction(
        component: Component,
        templateIRI: IRI,
        productIRI: IRI,
        promoterIRI?: IRI,
        identifier?: string
    ): GeneticProductionInteraction {
        const interaction = component.createGeneticProductionInteraction(identifier);
        if (promoterIRI) {
            interaction.createPromoterParticipation(promoterIRI);
        }
        interaction.createTemplateParticipation(templateIRI);
        interaction.createProductParticipation(productIRI);
        return interaction;
    }

    /**
     * Creates a ControlInteraction with a modifier and modified participant.
     * @param component - Parent component
     * @param modifierIRI - IRI of the modifier Feature
     * @param modifiedIRI - IRI of the modified Feature
     * @param identifier - Optional identifier
     */
    static createControlInteraction(
        component: Component,
        modifierIRI: IRI,
        modifiedIRI: IRI,
        identifier?: string
    ): ControlInteraction {
        const interaction = component.createControlInteraction(identifier);
        interaction.createModifierParticipation(modifierIRI);
        interaction.createModifiedParticipation(modifiedIRI);
        return interaction;
    }
}
