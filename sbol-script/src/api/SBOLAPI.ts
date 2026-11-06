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
    Interaction,
    InhibitionInteraction, StimulationInteraction, DegradationInteraction,
    BiochemicalReactionInteraction, NonCovalentBindingInteraction,
    GeneticProductionInteraction, ControlInteraction
} from '../core/Interaction';
import { ComponentType, ConstraintRestriction, Encoding, Orientation, InteractionType, ParticipationType, SBOLEntity } from '../core/Vocabulary';
import Feature from '../core/Feature';
import { SubComponent } from '../core/SubComponent';
import { Sequence } from '../core/Sequence';
import { SequenceFeature } from '../core/SequenceFeature';
import { Participation } from '../core/Participation';
import { Range } from '../core/Location';
import { Constraint } from '../core/Constraint';
import { ComponentReference } from '../core/ComponentReference';
import Identified from '../core/Identified';

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
    static createInhibitionInteraction( component: Component, inhibitorIRI: IRI, inhibitedIRI: IRI, identifier?: string ): InhibitionInteraction {
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
    static createStimulationInteraction( component: Component, stimulatorIRI: IRI, stimulatedIRI: IRI, identifier?: string ): StimulationInteraction {
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
    static createDegradationInteraction( component: Component, reactantIRIs: IRI[], identifier?: string ): DegradationInteraction {
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
    static createBiochemicalReactionInteraction( component: Component, reactantIRIs: IRI[], productIRIs: IRI[], identifier?: string ): BiochemicalReactionInteraction {
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
    static createNonCovalentBindingInteraction( component: Component, reactantIRIs: IRI[], productIRI: IRI, identifier?: string ): NonCovalentBindingInteraction {
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
    static createGeneticProductionInteraction( component: Component, templateIRI: IRI, productIRI: IRI, promoterIRI?: IRI, identifier?: string ): GeneticProductionInteraction {
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
    static createControlInteraction( component: Component, modifierIRI: IRI, modifiedIRI: IRI, identifier?: string ): ControlInteraction {
        const interaction = component.createControlInteraction(identifier);
        interaction.createModifierParticipation(modifierIRI);
        interaction.createModifiedParticipation(modifiedIRI);
        return interaction;
    }

    // ─── URI / display-ID utilities ────────────────────────────────────────

    /**
     * Appends an id segment to a URI, inserting '/' if the URI does not already
     * end with '/' or '#'.
     */
    static append(uri: IRI, id: string): IRI {
        if (uri.endsWith('/') || uri.endsWith('#')) {
            return `${uri}${id}`;
        }
        return `${uri}/${id}`;
    }

    /** Strips a trailing '/' from a URI string, matching the Java SBOLAPI.toNameSpace behaviour. */
    static toNameSpace(uri: IRI): IRI {
        return uri.endsWith('/') ? uri.slice(0, -1) : uri;
    }

    /** Extracts the local part of a URI (after '#', or after the first '/'). */
    private static getLocal(uri: IRI): string | null {
        const hashIdx = uri.indexOf('#');
        if (hashIdx !== -1 && hashIdx < uri.length - 1) {
            return uri.substring(hashIdx + 1);
        }
        const slashIdx = uri.indexOf('/');
        if (slashIdx !== -1 && slashIdx < uri.length - 1) {
            return uri.substring(slashIdx + 1);
        }
        return null;
    }

    /**
     * Creates a unique local display-id for an entity type within a list of
     * existing entities, starting the suffix at list.length + 1.
     */
    static createLocalName<T extends Identified>(entityType: IRI, items: T[]): string {
        const localBase = SBOLAPI.getLocal(entityType) ?? 'Entity';
        let suffix = items ? items.length + 1 : 1;
        let name: string;
        let valid = false;
        while (!valid) {
            name = `${localBase}${suffix}`;
            let unique = true;
            if (items) {
                for (const item of items) {
                    if (item.getIdentifier().endsWith(name)) {
                        suffix++;
                        unique = false;
                        break;
                    }
                }
            }
            if (unique) {
                valid = true;
            }
        }
        return name!;
    }

    /**
     * Creates a unique child URI for an entity by combining the parent URI with
     * a freshly generated local name.
     */
    static createLocalUri(identified: Identified, entityType: IRI, items: any[]): IRI {
        const displayId = SBOLAPI.createLocalName(entityType, items);
        return SBOLAPI.append(identified.getIdentifier(), displayId);
    }

    // ─── SubComponent helpers ──────────────────────────────────────────────

    /**
     * Returns all SubComponents of `parent` whose instanceOf is `child`.
     * If none exist, creates a new one.
     */
    static getOrCreateSubComponents(parent: Component, child: Component): SubComponent[] {
        let subComponents = SBOLAPI.getSubComponents(parent, child);
        if (!subComponents || subComponents.length === 0) {
            const sc = parent.createSubComponent(child.getIdentifier());
            subComponents = [sc];
        }
        return subComponents;
    }

    /**
     * Returns all SubComponents of `parent` whose instanceOf equals `child`'s IRI,
     * or null if none are found.
     */
    static getSubComponents(parent: Component, child: Component): SubComponent[] | null {
        let found: SubComponent[] | null = null;
        const features = parent.getSubComponents();
        if (features) {
            for (const feature of features) {
                if (feature.getInstanceOfIRI() === child.getIdentifier()) {
                    if (!found) found = [];
                    found.push(feature);
                }
            }
        }
        return found;
    }

    // ─── Cartesian product (private) ───────────────────────────────────────

    private static cartesianProduct<T>(lists: T[][]): T[][] {
        let result: T[][] = [[]];
        for (const list of lists) {
            const next: T[][] = [];
            for (const existing of result) {
                for (const item of list) {
                    next.push([...existing, item]);
                }
            }
            result = next;
        }
        return result;
    }

    // ─── Generic Interaction creation (Feature-level) ──────────────────────

    /**
     * Creates a single Interaction with two participants (each a single Feature).
     * @param interactionTypes - IRI array for interaction types
     * @param container - Parent Component containing the interaction
     * @param participant1 - First participant Feature
     * @param participant1Roles - Role IRIs for participant1
     * @param participant2 - Second participant Feature
     * @param participant2Roles - Role IRIs for participant2
     */
    static createInteractionFromFeaturePair( interactionTypes: IRI[], container: Component, participant1: Feature, participant1Roles: IRI[], participant2: Feature, participant2Roles: IRI[] ): Interaction {
        const interaction = container.createInteraction(interactionTypes);
        SBOLAPI.createParticipation(interaction, participant1Roles, participant1);
        SBOLAPI.createParticipation(interaction, participant2Roles, participant2);
        return interaction;
    }

    /**
     * Creates Interactions for every pair of features from two feature lists
     * (cross-product). Returns all created interactions.
     */
    static createInteractionFromFeatureLists( interactionTypes: IRI[], parent: Component, participant1Features: Feature[], participant1Roles: IRI[], participant2Features: Feature[], participant2Roles: IRI[] ): Interaction[] {
        const interactions: Interaction[] = [];
        if (participant1Features && participant2Features) {
            for (const f1 of participant1Features) {
                for (const f2 of participant2Features) {
                    interactions.push(
                        SBOLAPI.createInteractionFromFeaturePair(
                            interactionTypes, parent, f1, participant1Roles, f2, participant2Roles
                        )
                    );
                }
            }
        }
        return interactions;
    }

    /**
     * Creates Interactions between two Components by first resolving (or creating)
     * their SubComponents within `parent`, then creating a cross-product of interactions.
     */
    static createInteractionFromComponents( interactionTypes: IRI[], parent: Component, participant1: Component, participant1Roles: IRI[], participant2: Component, participant2Roles: IRI[] ): Interaction[] {
        const features1 = SBOLAPI.getOrCreateSubComponents(parent, participant1) as Feature[];
        const features2 = SBOLAPI.getOrCreateSubComponents(parent, participant2) as Feature[];
        return SBOLAPI.createInteractionFromFeatureLists(
            interactionTypes, parent, features1, participant1Roles, features2, participant2Roles
        );
    }

    /**
     * Creates a Participation for a Feature in an Interaction.
     * @param interaction - The Interaction to add the participation to
     * @param roles - Role IRIs for this participation
     * @param feature - The Feature that participates
     */
    static createParticipation(interaction: Interaction, roles: IRI[], feature: Feature): Participation {
        const participation = interaction.createParticipation(roles[0] ?? null, feature.getIdentifier());
        if (roles.length > 1) {
            participation.setRoles(roles);
        }
        return participation;
    }

    // ─── Reaction interaction (cartesian product) ──────────────────────────

    /**
     * Creates Interactions for every combination of source, target, and (optional)
     * modifier SubComponents resolved from the supplied Component lists.
     * One interaction is created per combination; all sources, targets, and
     * modifiers are added as participants to each interaction.
     *
     * A + B --> C + D + E [mod M]
     * where A,B,C,D,E,M are components and A1/A2, B1/B2, … are their SubComponents.
     */
    static createReactionInteraction( parent: Component, sources: Component[], sourceParticipantRoles: IRI[], targets: Component[], targetParticipantRoles: IRI[], interactionTypes: IRI[] ): Interaction[];
    static createReactionInteraction( parent: Component, sources: Component[], sourceParticipantRoles: IRI[], targets: Component[], targetParticipantRoles: IRI[], modifiers: Component[] | null, modifierParticipantRoles: IRI[] | null, interactionTypes: IRI[] ): Interaction[];
    static createReactionInteraction( parent: Component, sources: Component[], sourceParticipantRoles: IRI[], targets: Component[], targetParticipantRoles: IRI[], modifiersOrTypes: Component[] | IRI[] | null, modifierParticipantRoles?: IRI[] | null, interactionTypes?: IRI[] ): Interaction[] {
        let modifiers: Component[] | null = null;
        let modRoles: IRI[] | null = null;
        let types: IRI[];
        if (interactionTypes !== undefined) {
            // 8-arg overload
            modifiers = modifiersOrTypes as Component[] | null;
            modRoles = modifierParticipantRoles ?? null;
            types = interactionTypes;
        } else {
            // 6-arg overload — modifiersOrTypes is actually interactionTypes
            types = modifiersOrTypes as IRI[];
        }
        return SBOLAPI._createReactionInteraction(
            parent, sources, sourceParticipantRoles, targets, targetParticipantRoles,
            modifiers, modRoles, types
        );
    }

    private static _createReactionInteraction( parent: Component, sources: Component[], sourceParticipantRoles: IRI[], targets: Component[], targetParticipantRoles: IRI[], modifiers: Component[] | null, modifierParticipantRoles: IRI[] | null, interactionTypes: IRI[] ): Interaction[] {
        const interactions: Interaction[] = [];

        // Collect SubComponent lists for each source
        const sourceFeatureSets: SubComponent[][] = [];
        for (const source of sources) {
            const features = SBOLAPI.getOrCreateSubComponents(parent, source);
            if (!features || features.length === 0) return interactions;
            sourceFeatureSets.push(features);
        }

        // Collect SubComponent lists for each target
        const targetFeatureSets: SubComponent[][] = [];
        for (const target of targets) {
            const features = SBOLAPI.getOrCreateSubComponents(parent, target);
            if (!features || features.length === 0) return interactions;
            targetFeatureSets.push(features);
        }

        // Collect SubComponent lists for each modifier
        const modifierFeatureSets: SubComponent[][] = [];
        if (modifiers) {
            for (const modifier of modifiers) {
                const features = SBOLAPI.getOrCreateSubComponents(parent, modifier);
                if (!features || features.length === 0) return interactions;
                modifierFeatureSets.push(features);
            }
        }

        const modifierCombos: SubComponent[][] = modifierFeatureSets.length === 0
            ? [[]]
            : SBOLAPI.cartesianProduct(modifierFeatureSets);

        for (const sourceCombo of SBOLAPI.cartesianProduct(sourceFeatureSets)) {
            for (const targetCombo of SBOLAPI.cartesianProduct(targetFeatureSets)) {
                for (const modifierCombo of modifierCombos) {
                    const interaction = parent.createInteraction(interactionTypes);
                    for (const sf of sourceCombo) {
                        SBOLAPI.createParticipation(interaction, sourceParticipantRoles, sf);
                    }
                    for (const tf of targetCombo) {
                        SBOLAPI.createParticipation(interaction, targetParticipantRoles, tf);
                    }
                    if (modifierParticipantRoles) {
                        for (const mf of modifierCombo) {
                            SBOLAPI.createParticipation(interaction, modifierParticipantRoles, mf);
                        }
                    }
                    interactions.push(interaction);
                }
            }
        }
        return interactions;
    }

    /**
     * Creates Interactions for every combination of source, target, and (optional)
     * modifier feature sets (Feature[][] — each inner array is the set of features
     * for one logical participant). Modifiers may be null.
     */
    static createReactionInteractionFromFeatures( parent: Component, sourceFeatureSets: Feature[][], sourceParticipantRoles: IRI[], targetFeatureSets: Feature[][], targetParticipantRoles: IRI[], interactionTypes: IRI[] ): Interaction[];
    static createReactionInteractionFromFeatures( parent: Component, sourceFeatureSets: Feature[][], sourceParticipantRoles: IRI[], targetFeatureSets: Feature[][], targetParticipantRoles: IRI[], modifierFeatureSets: Feature[][] | null, modifierParticipantRoles: IRI[] | null, interactionTypes: IRI[] ): Interaction[];
    static createReactionInteractionFromFeatures( parent: Component, sourceFeatureSets: Feature[][], sourceParticipantRoles: IRI[], targetFeatureSets: Feature[][], targetParticipantRoles: IRI[], modifiersOrTypes: Feature[][] | IRI[] | null, modifierParticipantRoles?: IRI[] | null, interactionTypes?: IRI[] ): Interaction[] {
        let modifiers: Feature[][] | null = null;
        let modRoles: IRI[] | null = null;
        let types: IRI[];
        if (interactionTypes !== undefined) {
            modifiers = modifiersOrTypes as Feature[][] | null;
            modRoles = modifierParticipantRoles ?? null;
            types = interactionTypes;
        } else {
            types = modifiersOrTypes as IRI[];
        }

        const interactions: Interaction[] = [];
        const modifierCombos: Feature[][] = !modifiers || modifiers.length === 0
            ? [[]]
            : SBOLAPI.cartesianProduct(modifiers);

        for (const sourceCombo of SBOLAPI.cartesianProduct(sourceFeatureSets)) {
            for (const targetCombo of SBOLAPI.cartesianProduct(targetFeatureSets)) {
                for (const modifierCombo of modifierCombos) {
                    const interaction = parent.createInteraction(types);
                    for (const sf of sourceCombo) {
                        SBOLAPI.createParticipation(interaction, sourceParticipantRoles, sf);
                    }
                    for (const tf of targetCombo) {
                        SBOLAPI.createParticipation(interaction, targetParticipantRoles, tf);
                    }
                    if (modRoles) {
                        for (const mf of modifierCombo) {
                            SBOLAPI.createParticipation(interaction, modRoles, mf);
                        }
                    }
                    interactions.push(interaction);
                }
            }
        }
        return interactions;
    }

    // ─── Typed interaction helpers (Component-based) ───────────────────────

    /**
     * Creates InhibitionInteraction(s) between two Components within `parent`.
     * Resolves (or creates) their SubComponents and returns one interaction per
     * SubComponent pair.
     */
    static createInhibitionInteractionFromComponents( parent: Component, source: Component, target: Component ): Interaction[] {
        return SBOLAPI.createInteractionFromComponents(
            [InteractionType.Inhibition.iri], parent,
            source, [ParticipationType.Inhibitor.iri],
            target, [ParticipationType.Inhibited.iri]
        );
    }

    /**
     * Creates InhibitionInteraction(s) from Feature lists (cross-product).
     */
    static createInhibitionInteractionFromFeatureList( parent: Component, sourceFeatures: Feature[], targetFeatures: Feature[] ): Interaction[] {
        return SBOLAPI.createInteractionFromFeatureLists(
            [InteractionType.Inhibition.iri], parent,
            sourceFeatures, [ParticipationType.Inhibitor.iri],
            targetFeatures, [ParticipationType.Inhibited.iri]
        );
    }

    /**
     * Creates StimulationInteraction(s) between two Components within `parent`.
     */
    static createStimulationInteractionFromComponents( parent: Component, source: Component, target: Component ): Interaction[] {
        return SBOLAPI.createInteractionFromComponents(
            [InteractionType.Stimulation.iri], parent,
            source, [ParticipationType.Stimulator.iri],
            target, [ParticipationType.Stimulated.iri]
        );
    }

    /**
     * Creates StimulationInteraction(s) from Feature lists (cross-product).
     */
    static createStimulationInteractionFromFeatureList( parent: Component, sourceFeatures: Feature[], targetFeatures: Feature[] ): Interaction[] {
        return SBOLAPI.createInteractionFromFeatureLists(
            [InteractionType.Stimulation.iri], parent,
            sourceFeatures, [ParticipationType.Stimulator.iri],
            targetFeatures, [ParticipationType.Stimulated.iri]
        );
    }

    /**
     * Creates ControlInteraction(s) between two Components within `parent`.
     */
    static createControlInteractionFromComponents( parent: Component, source: Component, target: Component ): Interaction[] {
        return SBOLAPI.createInteractionFromComponents(
            [InteractionType.Control.iri], parent,
            source, [ParticipationType.Modifier.iri],
            target, [ParticipationType.Modified.iri]
        );
    }

    /**
     * Creates ControlInteraction(s) from Feature lists (cross-product).
     */
    static createControlInteractionFromFeatureList( parent: Component, sourceFeatures: Feature[], targetFeatures: Feature[] ): Interaction[] {
        return SBOLAPI.createInteractionFromFeatureLists(
            [InteractionType.Control.iri], parent,
            sourceFeatures, [ParticipationType.Modifier.iri],
            targetFeatures, [ParticipationType.Modified.iri]
        );
    }

    /**
     * Creates GeneticProductionInteraction(s) between two Components within `parent`.
     * Source acts as template; target is the product.
     */
    static createGeneticProductionInteractionFromComponents( parent: Component, source: Component, target: Component ): Interaction[] {
        return SBOLAPI.createInteractionFromComponents(
            [InteractionType.GeneticProduction.iri], parent,
            source, [ParticipationType.Template.iri],
            target, [ParticipationType.Product.iri]
        );
    }

    /**
     * Creates GeneticProductionInteraction(s) from Feature lists (cross-product).
     */
    static createGeneticProductionInteractionFromFeatureList( parent: Component, sourceFeatures: Feature[], targetFeatures: Feature[] ): Interaction[] {
        return SBOLAPI.createInteractionFromFeatureLists(
            [InteractionType.GeneticProduction.iri], parent,
            sourceFeatures, [ParticipationType.Template.iri],
            targetFeatures, [ParticipationType.Product.iri]
        );
    }

    /**
     * Creates DegradationInteraction(s) for a single source Component.
     * One interaction is created per SubComponent of `source` within `parent`.
     */
    static createDegradationInteractionFromComponent( parent: Component, source: Component ): Interaction[] {
        const features = SBOLAPI.getOrCreateSubComponents(parent, source) as Feature[];
        return SBOLAPI.createDegradationInteractionFromFeatureList(parent, features);
    }

    /**
     * Creates a DegradationInteraction for each Feature in the list.
     */
    static createDegradationInteractionFromFeatureList( parent: Component, features: Feature[] ): Interaction[] {
        const interactions: Interaction[] = [];
        if (features) {
            for (const feature of features) {
                const interaction = parent.createInteraction([InteractionType.Degradation.iri]);
                SBOLAPI.createParticipation(interaction, [ParticipationType.Reactant.iri], feature);
                interactions.push(interaction);
            }
        }
        return interactions;
    }

    /**
     * Creates BiochemicalReactionInteraction(s) for lists of source and target Components.
     */
    static createBiochemicalReactionInteractionFromComponents( parent: Component, sources: Component[], targets: Component[] ): Interaction[] {
        return SBOLAPI.createReactionInteraction(
            parent, sources, [ParticipationType.Reactant.iri],
            targets, [ParticipationType.Product.iri],
            [InteractionType.BiochemicalReaction.iri]
        );
    }

    /**
     * Creates BiochemicalReactionInteraction(s) from Feature set lists (cross-product).
     */
    static createBiochemicalReactionInteractionFromFeatureSets( parent: Component, sources: Feature[][], targets: Feature[][] ): Interaction[] {
        return SBOLAPI.createReactionInteractionFromFeatures(
            parent, sources, [ParticipationType.Reactant.iri],
            targets, [ParticipationType.Product.iri],
            [InteractionType.BiochemicalReaction.iri]
        );
    }

    /**
     * Creates NonCovalentBindingInteraction(s) for lists of source and target Components.
     */
    static createNonCovalentBindingInteractionFromComponents( parent: Component, sources: Component[], targets: Component[] ): Interaction[] {
        return SBOLAPI.createReactionInteraction(
            parent, sources, [ParticipationType.Reactant.iri],
            targets, [ParticipationType.Product.iri],
            [InteractionType.NonCovalentBinding.iri]
        );
    }

    /**
     * Creates NonCovalentBindingInteraction(s) from Feature set lists (cross-product).
     */
    static createNonCovalentBindingInteractionFromFeatureSets( parent: Component, sources: Feature[][], targets: Feature[][] ): Interaction[] {
        return SBOLAPI.createReactionInteractionFromFeatures(
            parent, sources, [ParticipationType.Reactant.iri],
            targets, [ParticipationType.Product.iri],
            [InteractionType.NonCovalentBinding.iri]
        );
    }

    // ─── Component factory methods ─────────────────────────────────────────

    /**
     * Creates a Component with a known URI (full IRI), a type, name, description
     * and optional role. Uses the document's baseIRI as the namespace.
     */
    static createComponentFromUri( doc: SBOLDocument, uri: IRI, type: IRI, name: string, description: string, role: IRI | null ): Component {
        const component = doc.createComponent(uri, SBOLAPI.toNameSpace(doc.baseIRI), [type]);
        if (name) component.setName(name);
        if (description) component.setDescription(description);
        if (role) component.setRoles([role]);
        return component;
    }

    /**
     * Creates a Component from a displayId (the IRI is constructed by appending
     * displayId to the document's baseIRI).
     */
    static createComponentFromDisplayId( doc: SBOLDocument, displayId: string, type: IRI, name: string, description: string, role: IRI | null ): Component {
        const uri = SBOLAPI.append(doc.baseIRI, displayId);
        return SBOLAPI.createComponentFromUri(doc, uri, type, name, description, role);
    }

    /**
     * Creates a DNA Component with an optional nucleic-acid sequence.
     * @param doc - SBOLDocument
     * @param displayId - Display identifier (appended to baseIRI)
     * @param name - Human-readable name
     * @param description - Description
     * @param role - Role IRI (e.g. a SO term)
     * @param sequence - Nucleic acid sequence string (or empty/null for none)
     */
    static createDnaComponent( doc: SBOLDocument, displayId: string, name: string, description: string, role: IRI, sequence: string ): Component {
        const dna = SBOLAPI.createComponentFromDisplayId(
            doc, displayId, ComponentType.DNA.iri, name, description, role
        );
        if (sequence && sequence.length > 0) {
            SBOLAPI.createSequenceForComponent(doc, dna, Encoding.IUPAC_DNA_RNA, sequence);
        }
        return dna;
    }

    /**
     * Creates a Protein Component with an optional amino-acid sequence.
     * Optionally places it as a SubComponent inside `container`.
     * @param doc - SBOLDocument
     * @param container - Parent Component to add a SubComponent into (or null)
     * @param displayId - Display identifier
     * @param name - Human-readable name
     * @param description - Description
     * @param role - Role IRI
     * @param sequence - Amino-acid sequence string (or empty/null for none)
     */
    static createProteinComponentInContainer( doc: SBOLDocument, container: Component | null, displayId: string, name: string, description: string, role: IRI, sequence: string ): Component {
        const protein = SBOLAPI.createComponentFromDisplayId(
            doc, displayId, ComponentType.Protein.iri, name, description, role
        );
        if (container) {
            container.createSubComponent(protein.getIdentifier());
        }
        if (sequence && sequence.length > 0) {
            SBOLAPI.createSequenceForComponent(doc, protein, Encoding.IUPAC_Protein, sequence);
        }
        return protein;
    }

    /**
     * Creates a Protein Component without a container.
     * @param doc - SBOLDocument
     * @param displayId - Display identifier
     * @param name - Human-readable name
     * @param description - Description
     * @param role - Role IRI
     * @param sequence - Amino-acid sequence string (or empty/null for none)
     */
    static createProteinComponentStandalone( doc: SBOLDocument, displayId: string, name: string, description: string, role: IRI, sequence: string ): Component {
        return SBOLAPI.createProteinComponentInContainer(
            doc, null, displayId, name, description, role, sequence
        );
    }

    /**
     * Adds a SubComponent to `parent` pointing at `child`.
     */
    static addSubComponent(parent: Component, child: Component): SubComponent {
        return parent.createSubComponent(child.getIdentifier());
    }

    /**
     * Gets or creates SubComponents for `comp1` and `comp2` inside `container`,
     * then creates a Constraint between them with the given restriction.
     * Mirrors Java: SBOLAPI.createConstraint(container, comp1, comp2, restriction)
     */
    static createConstraint(container: Component, comp1: Component, comp2: Component, restriction: any): Constraint[] {
        const scs1 = SBOLAPI.getOrCreateSubComponents(container, comp1);
        const scs2 = SBOLAPI.getOrCreateSubComponents(container, comp2);
        const result: Constraint[] = [];
        for (const sc1 of scs1) {
            for (const sc2 of scs2) {
                const c = container.createConstraint(sc1.getIdentifier(), restriction, sc2.getIdentifier());
                result.push(c);
            }
        }
        return result;
    }

    /**
     * Mirrors Java: SBOLAPI.mapTo(container, toContainer, toEntity)
     * Creates a ComponentReference for `child` (nested inside `parent`) in `container`. No constraint.
     */
    static mapToRef(container: Component, parent: Component, child: Component): ComponentReference[] {
        const scsParentInContainer = container.getSubComponents().filter(sc => sc.getInstanceOfIRI() === parent.getIdentifier());
        const scsChildInParent     = parent.getSubComponents().filter(sc => sc.getInstanceOfIRI() === child.getIdentifier());
        const refs: ComponentReference[] = [];
        for (const scParent of scsParentInContainer) {
            for (const scChild of scsChildInParent) {
                const cr = container.createComponentReference(scParent.getIdentifier(), scChild.getIdentifier());
                refs.push(cr);
            }
        }
        return refs;
    }

    /**
     * Mirrors Java: SBOLAPI.mapTo(container, parent, child, containerChild)
     * Creates a ComponentReference for `child` (nested inside `parent`) in `container`, then creates
     * a Constraint between that ComponentReference and the SubComponent of `sibling` in `container`.
     * Restriction: VerifyIdentical if child.uri === sibling.uri, else Replaces.
     */
    static mapToChildSubComponent(container: Component, parent: Component, child: Component, sibling: Component): ComponentReference[] {
        const scsParentInContainer  = container.getSubComponents().filter(sc => sc.getInstanceOfIRI() === parent.getIdentifier());
        const scsChildInParent      = parent.getSubComponents().filter(sc => sc.getInstanceOfIRI() === child.getIdentifier());
        const scsSiblingInContainer = container.getSubComponents().filter(sc => sc.getInstanceOfIRI() === sibling.getIdentifier());

        const restriction = child.getIdentifier() === sibling.getIdentifier()
            ? ConstraintRestriction.VerifyIdentical
            : ConstraintRestriction.Replaces;

        const refs: ComponentReference[] = [];
        for (const scParent of scsParentInContainer) {
            for (const scChild of scsChildInParent) {
                const cr = container.createComponentReference(scParent.getIdentifier(), scChild.getIdentifier());
                refs.push(cr);
            }
        }
        for (const cr of refs) {
            for (const scSibling of scsSiblingInContainer) {
                container.createConstraint(cr.getIdentifier(), restriction, scSibling.getIdentifier());
            }
        }
        return refs;
    }

    /**
     * Mirrors Java: SBOLAPI.mapTo(container, parent1, child1, parent2, child2)
     * Creates ComponentReferences for `child1` (inside `parent1`) and `child2` (inside `parent2`)
     * in `container`, then creates a Constraint between them.
     * Restriction: VerifyIdentical if child1.uri === child2.uri, else Replaces.
     */
    static mapToChildren(container: Component, parent1: Component, child1: Component, parent2: Component, child2: Component): ComponentReference[] {
        const scsInCont1   = container.getSubComponents().filter(sc => sc.getInstanceOfIRI() === parent1.getIdentifier());
        const scsInParent1 = parent1.getSubComponents().filter(sc => sc.getInstanceOfIRI() === child1.getIdentifier());
        const scsInCont2   = container.getSubComponents().filter(sc => sc.getInstanceOfIRI() === parent2.getIdentifier());
        const scsInParent2 = parent2.getSubComponents().filter(sc => sc.getInstanceOfIRI() === child2.getIdentifier());

        const restriction = child1.getIdentifier() === child2.getIdentifier()
            ? ConstraintRestriction.VerifyIdentical
            : ConstraintRestriction.Replaces;

        const refs1: ComponentReference[] = [];
        const refs2: ComponentReference[] = [];

        for (const scCont of scsInCont1) {
            for (const scPar of scsInParent1) {
                const cr = container.createComponentReference(scCont.getIdentifier(), scPar.getIdentifier());
                refs1.push(cr);
            }
        }
        for (const scCont of scsInCont2) {
            for (const scPar of scsInParent2) {
                const cr = container.createComponentReference(scCont.getIdentifier(), scPar.getIdentifier());
                refs2.push(cr);
            }
        }

        for (const cr1 of refs1) {
            for (const cr2 of refs2) {
                container.createConstraint(cr1.getIdentifier(), restriction, cr2.getIdentifier());
            }
        }

        return [...refs1, ...refs2];
    }

    // ─── Sequence factory methods ──────────────────────────────────────────

    /**
     * Creates a new Sequence for a Component and sets it as the component's sequence.
     * Uses a generated local name derived from the number of existing sequences.
     * The component's existing sequences are replaced with just this new one.
     */
    static createSequenceForComponent( doc: SBOLDocument, component: Component, encoding: typeof Encoding.IUPAC_DNA_RNA, elements: string ): Sequence {
        const localName = SBOLAPI.createLocalName(SBOLEntity.Sequence.iri, component.getSequences());
        const seqIdentifier = `${component.getIdentifier()}_${localName}`;
        const seq = doc.createSequence(seqIdentifier, SBOLAPI.toNameSpace(doc.baseIRI));
        //seq.setName(`${component.getDisplayId() ?? ''} sequence`);
        seq.setName(localName);
        seq.setDescription(`${component.getDisplayId() ?? ''} sequence`);
        if (elements != null) seq.setElements(elements);
        seq.setEncoding(encoding);
        component.setSequences([seqIdentifier]);
        return seq;
    }

    /**
     * Creates a new Sequence for a Component and adds it to the component's sequence list
     * (preserving any existing sequences).
     */
    static addSequenceToComponent( doc: SBOLDocument, component: Component, encoding: typeof Encoding.IUPAC_DNA_RNA, elements: string ): Sequence {
        const localName = SBOLAPI.createLocalName(SBOLEntity.Sequence.iri, component.getSequences());
        const seqIdentifier = `${component.getIdentifier()}_${localName}`;
        const seq = doc.createSequence(seqIdentifier, SBOLAPI.toNameSpace(doc.baseIRI));
        seq.setName(`${component.getDisplayId() ?? ''} sequence`);
        if (elements != null) seq.setElements(elements);
        seq.setEncoding(encoding);
        const existingIRIs = component.getSequenceIRIs() ?? [];
        component.setSequences([...existingIRIs, seqIdentifier]);
        return seq;
    }

    /**
     * Creates a new Sequence for a Component with automatically determined encoding
     * (based on the component's type and the sequence content).
     */
    static addSequenceAutoEncoding( doc: SBOLDocument, component: Component, elements: string ): Sequence {
        const encoding = SBOLAPI.getEncodingType(doc, component, elements);
        return SBOLAPI.addSequenceToComponent(doc, component, encoding, elements);
    }

    /**
     * Determines the appropriate encoding for a sequence string based on the
     * component's types. Throws if no matching encoding can be determined.
     */
    static getEncodingType( doc: SBOLDocument, component: Component, elements: string ): typeof Encoding.IUPAC_DNA_RNA {
        const types = component.getTypes();
        if (!types || types.length === 0) {
            throw new Error('Component must have at least one type to determine encoding.');
        }
        for (const typeIRI of types) {
            if (typeIRI === ComponentType.DNA.iri || typeIRI === ComponentType.RNA.iri) {
                return Encoding.IUPAC_DNA_RNA;
            } else if (typeIRI === ComponentType.Protein.iri) {
                return Encoding.IUPAC_Protein;
            } else if (typeIRI === ComponentType.SimpleChemical.iri) {
                return elements.startsWith('InChI=') ? Encoding.InChI : Encoding.SMILES;
            }
        }
        throw new Error('No encoding found for the provided sequence and component types.');
    }

    // ─── Append (sequence-aware SubComponent / SequenceFeature) ───────────

    /**
     * Appends `child` as a SubComponent of `parent` (default: inline orientation).
     * If the child has a sequence, a Range location is created on the subcomponent
     * pointing to the appropriate region in the parent's sequence.
     */
    static appendComponent( doc: SBOLDocument, parent: Component, child: Component, orientation: typeof Orientation.Inline = Orientation.Inline ): SubComponent {
        const subComponent = parent.createSubComponent(child.getIdentifier());
        subComponent.setOrientation(orientation);
        const childSequences = child.getSequences();
        if (childSequences && childSequences.length > 0) {
            const childElements = childSequences[0].getElements();
            if (childElements) {
                SBOLAPI._createRange(doc, parent, subComponent, childElements, orientation);
            }
        }
        return subComponent;
    }

    /**
     * Appends a SequenceFeature (inline, default orientation) to `parent` and
     * extends the parent's sequence by `elements`. Returns the created SequenceFeature.
     */
    static appendSequenceFeature( doc: SBOLDocument, parent: Component, elements: string, orientation: typeof Orientation.Inline ): SequenceFeature | null {
        if (!elements || elements.length === 0) return null;

        const sequences = parent.getSequences();
        let sequence: Sequence;
        let start: number;
        let end: number;

        if (sequences && sequences.length > 0) {
            sequence = sequences[0];
            start = (sequence.getElements() ?? '').length + 1;
            end = start + elements.length - 1;
        } else {
            sequence = SBOLAPI.createSequenceForComponent(doc, parent, Encoding.IUPAC_DNA_RNA, '');
            start = 1;
            end = elements.length - 1;
        }

        if (orientation === Orientation.Inline) {
            sequence.setElements((sequence.getElements() ?? '') + elements);
        } else {
            throw new Error('Reverse complement sequence addition has not been implemented yet!');
        }

        const feature = parent.createSequenceFeature();
        feature.setOrientation(orientation);
        const range: any = feature.createRange(sequence.getIdentifier(), start, end);
        if (range && typeof range.setOrientation === 'function') {
            range.setOrientation(orientation);
        }
        return feature;
    }

    /**
     * Private helper: creates a Range location on `subComponent` within `parent`,
     * appending `elements` to the parent sequence (reverse-complementing if needed).
     */
    private static _createRange( doc: SBOLDocument, parent: Component, subComponent: SubComponent, elements: string, orientation: typeof Orientation.Inline ): Range | null {
        if (!elements || elements.length === 0) return null;

        const sequences = parent.getSequences();
        let sequence: Sequence;
        let start: number;
        let end: number;

        if (sequences && sequences.length > 0) {
            sequence = sequences[0];
            start = (sequence.getElements() ?? '').length + 1;
            end = start + elements.length - 1;
        } else {
            sequence = SBOLAPI.createSequenceForComponent(doc, parent, Encoding.IUPAC_DNA_RNA, '');
            start = 1;
            end = elements.length;
        }

        let actualElements = elements;
        if (orientation === Orientation.ReverseComplement) {
            actualElements = SBOLAPI._getReverseComplement(elements);
        }
        sequence.setElements((sequence.getElements() ?? '') + actualElements);

        const range: any = subComponent.createRange(sequence.getIdentifier(), start, end);
        range.setOrientation(orientation);
        return range as Range;
    }

    /** Computes the reverse complement of a nucleic acid sequence. */
    private static _getReverseComplement(elements: string): string {
        const complement: { [key: string]: string } = {
            'a': 't', 't': 'a', 'g': 'c', 'c': 'g', 'u': 'a',
            'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G', 'U': 'A',
            'n': 'n', 'N': 'N', 'r': 'y', 'R': 'Y', 'y': 'r', 'Y': 'R',
            'k': 'm', 'K': 'M', 'm': 'k', 'M': 'K', 's': 's', 'S': 'S',
            'w': 'w', 'W': 'W', 'b': 'v', 'B': 'V', 'v': 'b', 'V': 'B',
            'd': 'h', 'D': 'H', 'h': 'd', 'H': 'D',
        };
        return elements.split('').reverse().map(c => complement[c] ?? c).join('');
    }
}
