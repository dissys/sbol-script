import Identified from './Identified';
import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import { ParticipationType, SBOLEntity } from './Vocabulary';

type IRI = string;

// ─── Participation ────────────────────────────────────────────────────────────

export class Participation extends Identified {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Participation.iri);
        }
    }

    static create(store: any, identifier: IRI): Participation {
        return new Participation(store, identifier);
    }

    static load(store: any, identifier: IRI): Participation {
        return new Participation(store, identifier, true);
    }

    // ── role ───────────────────────────────────────────────────────────────

    setRole(role: any): void { this.setRoles([role]); }
    setRoles(roles: any[]): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Participation.properties.role, roles);
    }
    addRole(role: any): void {
        SBOL3Util.addProperty(this.store, this.resource, SBOLEntity.Participation.properties.role, [role]);
    }
    getRoles(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Participation.properties.role) as IRI[];
    }

    // ── participant ────────────────────────────────────────────────────────

    setParticipant(featureIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Participation.properties.participant, [featureIRI]);
    }

    getParticipant(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Participation.properties.participant);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── higherOrderParticipant ─────────────────────────────────────────────

    setHigherOrderParticipant(interactionIRI: IRI): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Participation.properties.higherOrderParticipant, [interactionIRI]);
    }

    getHigherOrderParticipant(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Participation.properties.higherOrderParticipant);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    toString(indent: string = ''): string {
        return `${indent}Participation(${this.getIdentifier()}, participant=${this.getParticipant()})`;
    }
}

// ─── Concrete Participation subclasses ───────────────────────────────────────

export class InhibitorParticipation extends Participation {
    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setRole(ParticipationType.Inhibitor);
        }
    }
    static create(store: any, identifier: IRI): InhibitorParticipation {
        return new InhibitorParticipation(store, identifier);
    }
    static load(store: any, identifier: IRI): InhibitorParticipation {
        return new InhibitorParticipation(store, identifier, true);
    }
}

export class InhibitedParticipation extends Participation {
    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setRole(ParticipationType.Inhibited);
        }
    }
    static create(store: any, identifier: IRI): InhibitedParticipation {
        return new InhibitedParticipation(store, identifier);
    }
    static load(store: any, identifier: IRI): InhibitedParticipation {
        return new InhibitedParticipation(store, identifier, true);
    }
}

export class StimulatorParticipation extends Participation {
    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setRole(ParticipationType.Stimulator);
        }
    }
    static create(store: any, identifier: IRI): StimulatorParticipation {
        return new StimulatorParticipation(store, identifier);
    }
    static load(store: any, identifier: IRI): StimulatorParticipation {
        return new StimulatorParticipation(store, identifier, true);
    }
}

export class StimulatedParticipation extends Participation {
    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setRole(ParticipationType.Stimulated);
        }
    }
    static create(store: any, identifier: IRI): StimulatedParticipation {
        return new StimulatedParticipation(store, identifier);
    }
    static load(store: any, identifier: IRI): StimulatedParticipation {
        return new StimulatedParticipation(store, identifier, true);
    }
}

export class ReactantParticipation extends Participation {
    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setRole(ParticipationType.Reactant);
        }
    }
    static create(store: any, identifier: IRI): ReactantParticipation {
        return new ReactantParticipation(store, identifier);
    }
    static load(store: any, identifier: IRI): ReactantParticipation {
        return new ReactantParticipation(store, identifier, true);
    }
}

export class ProductParticipation extends Participation {
    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setRole(ParticipationType.Product);
        }
    }
    static create(store: any, identifier: IRI): ProductParticipation {
        return new ProductParticipation(store, identifier);
    }
    static load(store: any, identifier: IRI): ProductParticipation {
        return new ProductParticipation(store, identifier, true);
    }
}

export class PromoterParticipation extends Participation {
    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setRole(ParticipationType.Promoter);
        }
    }
    static create(store: any, identifier: IRI): PromoterParticipation {
        return new PromoterParticipation(store, identifier);
    }
    static load(store: any, identifier: IRI): PromoterParticipation {
        return new PromoterParticipation(store, identifier, true);
    }
}

export class ModifierParticipation extends Participation {
    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setRole(ParticipationType.Modifier);
        }
    }
    static create(store: any, identifier: IRI): ModifierParticipation {
        return new ModifierParticipation(store, identifier);
    }
    static load(store: any, identifier: IRI): ModifierParticipation {
        return new ModifierParticipation(store, identifier, true);
    }
}

export class ModifiedParticipation extends Participation {
    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setRole(ParticipationType.Modified);
        }
    }
    static create(store: any, identifier: IRI): ModifiedParticipation {
        return new ModifiedParticipation(store, identifier);
    }
    static load(store: any, identifier: IRI): ModifiedParticipation {
        return new ModifiedParticipation(store, identifier, true);
    }
}

export class TemplateParticipation extends Participation {
    private constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setRole(ParticipationType.Template);
        }
    }
    static create(store: any, identifier: IRI): TemplateParticipation {
        return new TemplateParticipation(store, identifier);
    }
    static load(store: any, identifier: IRI): TemplateParticipation {
        return new TemplateParticipation(store, identifier, true);
    }
}
