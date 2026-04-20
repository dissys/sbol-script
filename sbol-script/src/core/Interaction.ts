import Identified from './Identified';
import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import GraphUtil from '../otol/GraphUtil';
import { InteractionType, ParticipationType, SBOLEntity } from './Vocabulary';

import {
    Participation,
    InhibitorParticipation, InhibitedParticipation,
    StimulatorParticipation, StimulatedParticipation,
    ReactantParticipation, ProductParticipation,
    PromoterParticipation, ModifierParticipation, ModifiedParticipation, TemplateParticipation
} from './Participation';

type IRI = string;

// ─── Interaction ────────────────────────────────────────────────────────────

export class Interaction extends Identified {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Interaction.iri);
        }
    }

    static create(store: any, identifier: IRI): Interaction {
        return new Interaction(store, identifier);
    }

    static load(store: any, identifier: IRI): Interaction {
        return new Interaction(store, identifier, true);
    }

    // ── type ───────────────────────────────────────────────────────────────

    setType(type: any): void { this.setTypes([type]); }
    setTypes(types: any[]): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Interaction.properties.type, types);
    }
    addType(type: any): void {
        SBOL3Util.addProperty(this.store, this.resource, SBOLEntity.Interaction.properties.type, [type]);
    }
    getTypes(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Interaction.properties.type) as IRI[];
    }

    // ── hasParticipation factory ────────────────────────────────────────────

    createParticipation(role: any, participantIRI: IRI | null, identifier?: string): Participation {
        const participations = this.getParticipationIRIs();
        if (!identifier) {
            identifier = `Participation${participations.length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const p = Participation.create(this.store, iri);
        p.setRole(role);
        if (participantIRI !== null && participantIRI !== undefined) {
            p.setParticipant(participantIRI);
        }
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Interaction.properties.hasParticipation, [iri]);
        return p;
    }

    getParticipationIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Interaction.properties.hasParticipation) as IRI[];
    }

    protected addParticipationIRI(iri: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Interaction.properties.hasParticipation, [iri]);
    }

    protected createTypedParticipation<T extends Participation>(
        factory: { create: (store: any, iri: IRI) => T },
        participantIRI: IRI,
        identifier?: string
    ): T {
        const count = this.getParticipationIRIs().length;
        if (!identifier) identifier = `Participation${count + 1}`;
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const p = factory.create(this.store, iri);
        p.setParticipant(participantIRI);
        this.addParticipationIRI(iri);
        return p;
    }

    toString(indent: string = ''): string {
        return `${indent}Interaction(${this.getIdentifier()})`;
    }
}

// ─── InhibitionInteraction ───────────────────────────────────────────────────

export class InhibitionInteraction extends Interaction {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(InteractionType.Inhibition);
        }
    }

    createInhibitorParticipation(participantIRI: IRI, identifier?: string): InhibitorParticipation {
        return this.createTypedParticipation(InhibitorParticipation, participantIRI, identifier ?? `Inhibitor1`);
    }

    createInhibitedParticipation(participantIRI: IRI, identifier?: string): InhibitedParticipation {
        return this.createTypedParticipation(InhibitedParticipation, participantIRI, identifier ?? `Inhibited1`);
    }

    static create(store: any, identifier: IRI): InhibitionInteraction {
        return new InhibitionInteraction(store, identifier);
    }

    static load(store: any, identifier: IRI): InhibitionInteraction {
        return new InhibitionInteraction(store, identifier, true);
    }
}

// ─── StimulationInteraction ──────────────────────────────────────────────────

export class StimulationInteraction extends Interaction {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(InteractionType.Stimulation);
        }
    }

    createStimulatorParticipation(participantIRI: IRI, identifier?: string): StimulatorParticipation {
        return this.createTypedParticipation(StimulatorParticipation, participantIRI, identifier ?? `Stimulator1`);
    }

    createStimulatedParticipation(participantIRI: IRI, identifier?: string): StimulatedParticipation {
        return this.createTypedParticipation(StimulatedParticipation, participantIRI, identifier ?? `Stimulated1`);
    }

    static create(store: any, identifier: IRI): StimulationInteraction {
        return new StimulationInteraction(store, identifier);
    }

    static load(store: any, identifier: IRI): StimulationInteraction {
        return new StimulationInteraction(store, identifier, true);
    }
}

// ─── DegradationInteraction ──────────────────────────────────────────────────

export class DegradationInteraction extends Interaction {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(InteractionType.Degradation);
        }
    }

    createReactantParticipation(participantIRI: IRI, identifier?: string): ReactantParticipation {
        const count = this.getParticipationIRIs().length;
        return this.createTypedParticipation(ReactantParticipation, participantIRI, identifier ?? `Reactant${count + 1}`);
    }

    static create(store: any, identifier: IRI): DegradationInteraction {
        return new DegradationInteraction(store, identifier);
    }

    static load(store: any, identifier: IRI): DegradationInteraction {
        return new DegradationInteraction(store, identifier, true);
    }
}

// ─── BiochemicalReactionInteraction ──────────────────────────────────────────

export class BiochemicalReactionInteraction extends Interaction {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(InteractionType.BiochemicalReaction);
        }
    }

    createReactantParticipation(participantIRI: IRI, identifier?: string): ReactantParticipation {
        const count = this.getParticipationIRIs().length;
        return this.createTypedParticipation(ReactantParticipation, participantIRI, identifier ?? `Reactant${count + 1}`);
    }

    createProductParticipation(participantIRI: IRI, identifier?: string): ProductParticipation {
        const count = this.getParticipationIRIs().length;
        return this.createTypedParticipation(ProductParticipation, participantIRI, identifier ?? `Product${count + 1}`);
    }

    static create(store: any, identifier: IRI): BiochemicalReactionInteraction {
        return new BiochemicalReactionInteraction(store, identifier);
    }

    static load(store: any, identifier: IRI): BiochemicalReactionInteraction {
        return new BiochemicalReactionInteraction(store, identifier, true);
    }
}

// ─── NonCovalentBindingInteraction ────────────────────────────────────────────

export class NonCovalentBindingInteraction extends Interaction {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(InteractionType.NonCovalentBinding);
        }
    }

    createReactantParticipation(participantIRI: IRI, identifier?: string): ReactantParticipation {
        const count = this.getParticipationIRIs().length;
        return this.createTypedParticipation(ReactantParticipation, participantIRI, identifier ?? `Reactant${count + 1}`);
    }

    createProductParticipation(participantIRI: IRI, identifier?: string): ProductParticipation {
        const count = this.getParticipationIRIs().length;
        return this.createTypedParticipation(ProductParticipation, participantIRI, identifier ?? `Product${count + 1}`);
    }

    static create(store: any, identifier: IRI): NonCovalentBindingInteraction {
        return new NonCovalentBindingInteraction(store, identifier);
    }

    static load(store: any, identifier: IRI): NonCovalentBindingInteraction {
        return new NonCovalentBindingInteraction(store, identifier, true);
    }
}

// ─── GeneticProductionInteraction ────────────────────────────────────────────

export class GeneticProductionInteraction extends Interaction {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(InteractionType.GeneticProduction);
        }
    }

    createPromoterParticipation(participantIRI: IRI, identifier?: string): PromoterParticipation {
        return this.createTypedParticipation(PromoterParticipation, participantIRI, identifier ?? `Promoter1`);
    }

    createTemplateParticipation(participantIRI: IRI, identifier?: string): TemplateParticipation {
        return this.createTypedParticipation(TemplateParticipation, participantIRI, identifier ?? `Template1`);
    }

    createProductParticipation(participantIRI: IRI, identifier?: string): ProductParticipation {
        const count = this.getParticipationIRIs().length;
        return this.createTypedParticipation(ProductParticipation, participantIRI, identifier ?? `Product${count + 1}`);
    }

    static create(store: any, identifier: IRI): GeneticProductionInteraction {
        return new GeneticProductionInteraction(store, identifier);
    }

    static load(store: any, identifier: IRI): GeneticProductionInteraction {
        return new GeneticProductionInteraction(store, identifier, true);
    }
}

// ─── ControlInteraction ───────────────────────────────────────────────────────

export class ControlInteraction extends Interaction {

    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(InteractionType.Control);
        }
    }

    createModifierParticipation(participantIRI: IRI, identifier?: string): ModifierParticipation {
        return this.createTypedParticipation(ModifierParticipation, participantIRI, identifier ?? `Modifier1`);
    }

    createModifiedParticipation(participantIRI: IRI, identifier?: string): ModifiedParticipation {
        return this.createTypedParticipation(ModifiedParticipation, participantIRI, identifier ?? `Modified1`);
    }

    static create(store: any, identifier: IRI): ControlInteraction {
        return new ControlInteraction(store, identifier);
    }

    static load(store: any, identifier: IRI): ControlInteraction {
        return new ControlInteraction(store, identifier, true);
    }
}
