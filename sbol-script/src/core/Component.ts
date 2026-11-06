import SBOLNamespaces from './SBOLNamespaces';
import RDFUtil from '../otol/RDFUtil';
import SBOL3Util from './SBOL3Util';
import GraphUtil from '../otol/GraphUtil';
import TopLevel from './TopLevel';
import { SubComponent } from './SubComponent';
import { SequenceFeature } from './SequenceFeature';
import { LocalSubComponent } from './LocalSubComponent';
import { ComponentReference } from './ComponentReference';
import { ExternallyDefined } from './ExternallyDefined';
import {
    Interaction, InhibitionInteraction, StimulationInteraction,
    DegradationInteraction, BiochemicalReactionInteraction,
    NonCovalentBindingInteraction, GeneticProductionInteraction, ControlInteraction
} from './Interaction';
import { Constraint } from './Constraint';
import { Interface } from './Interface';
import { Sequence } from './Sequence';
import {
    DNARole, RNARole, ProteinRole, SmallMoleculeRole,
    ComponentType, ConstraintRestriction, SBOLEntity
} from './Vocabulary';

declare const $rdf: any;
type IRI = string;

// ─── Component ───────────────────────────────────────────────────────────────

export class Component extends TopLevel {

    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier);
        if (!skipCreate) {
            this.initResource(SBOLEntity.Component.iri);
        }
    }

    // ── type ───────────────────────────────────────────────────────────────

    setType(type: any): void { this.setTypes([type]); }
    setTypes(types: any[]): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Component.properties.type, types);
    }
    addType(type: any): void { this.addTypes([type]); }
    addTypes(types: any[]): void {
        SBOL3Util.addProperty(this.store, this.resource, SBOLEntity.Component.properties.type, types);
    }
    getTypes(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Component.properties.type) as IRI[];
    }

    // ── role ───────────────────────────────────────────────────────────────

    setRole(role: any): void { this.setRoles([role]); }
    setRoles(roles: any[]): void {
        SBOL3Util.setProperty(this.store, this.resource, SBOLEntity.Component.properties.role, roles);
    }
    addRole(role: any): void { this.addRoles([role]); }
    addRoles(roles: any[]): void {
        SBOL3Util.addProperty(this.store, this.resource, SBOLEntity.Component.properties.role, roles);
    }
    getRoles(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Component.properties.role) as IRI[];
    }

    // ── hasSequence ────────────────────────────────────────────────────────

    setSequence(sequence: IRI): void { this.setSequences([sequence]); }
    setSequences(sequences: IRI[]): void {
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Component.properties.hasSequence, sequences);
    }
    addSequence(sequence: IRI): void { this.addSequences([sequence]); }
    addSequences(sequences: IRI[]): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasSequence, sequences);
    }
    getSequenceIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Component.properties.hasSequence) as IRI[];
    }
    getSequences(): Sequence[] {
        return this.getSequenceIRIs().map(iri => Sequence.load(this.store, iri));
    }

    // ── Feature factory methods ────────────────────────────────────────────

    createSubComponent(instanceOf: IRI, identifier?: string): SubComponent {
        if (!identifier) {
            identifier = `${SBOLEntity.SubComponent.name}${this.getSubComponentIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const sc = SubComponent.create(this.store, iri);
        sc.setInstanceOf(instanceOf);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasFeature, [iri]);
        return sc;
    }

    createSequenceFeature(identifier?: string): SequenceFeature {
        if (!identifier) {
            identifier = `SequenceFeature${this.getSequenceFeatureIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const sf = SequenceFeature.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasFeature, [iri]);
        return sf;
    }

    createLocalSubComponent(identifier?: string): LocalSubComponent {
        if (!identifier) {
            identifier = `LocalSubComponent${this.getLocalSubComponentIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const lsc = LocalSubComponent.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasFeature, [iri]);
        return lsc;
    }

    createComponentReference(inChildOf: IRI, refersTo: IRI, identifier?: string): ComponentReference {
        if (!identifier) {
            identifier = `ComponentReference${this.getComponentReferenceIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const cr = ComponentReference.create(this.store, iri);
        cr.setInChildOf(inChildOf);
        cr.setRefersTo(refersTo);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasFeature, [iri]);
        return cr;
    }

    createExternallyDefined(identifier?: string): ExternallyDefined {
        if (!identifier) {
            identifier = `ExternallyDefined${this.getExternallyDefinedIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const ed = ExternallyDefined.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasFeature, [iri]);
        return ed;
    }

    getSubComponents(): SubComponent[] {
        return SBOL3Util.loadObjectsByType(this.store, 'SubComponent', SubComponent.load).filter(sc => {
            const featureIRIs = this.getFeatureIRIs();
            return featureIRIs.includes(sc.getIdentifier());
        });
    }

    getSubComponentIRIs(): IRI[] {
        return this.getSubComponents().map(sc => sc.getIdentifier());
    }

    getSequenceFeatures(): SequenceFeature[] {
        return SBOL3Util.loadObjectsByType(this.store, 'SequenceFeature', SequenceFeature.load).filter(sf => {
            const featureIRIs = this.getFeatureIRIs();
            return featureIRIs.includes(sf.getIdentifier());
        });
    }

    getSequenceFeatureIRIs(): IRI[] {
        return this.getSequenceFeatures().map(sf => sf.getIdentifier());
    }

    getLocalSubComponents(): LocalSubComponent[] {
        return SBOL3Util.loadObjectsByType(this.store, 'LocalSubComponent', LocalSubComponent.load).filter(lsc => {
            const featureIRIs = this.getFeatureIRIs();
            return featureIRIs.includes(lsc.getIdentifier());
        });
    }

    getLocalSubComponentIRIs(): IRI[] {
        return this.getLocalSubComponents().map(lsc => lsc.getIdentifier());
    }

    getComponentReferences(): ComponentReference[] {
        return SBOL3Util.loadObjectsByType(this.store, 'ComponentReference', ComponentReference.load).filter(cr => {
            const featureIRIs = this.getFeatureIRIs();
            return featureIRIs.includes(cr.getIdentifier());
        });
    }

    getComponentReferenceIRIs(): IRI[] {
        return this.getComponentReferences().map(cr => cr.getIdentifier());
    }

    getExternallyDefinedFeatures(): ExternallyDefined[] {
        return SBOL3Util.loadObjectsByType(this.store, 'ExternallyDefined', ExternallyDefined.load).filter(ed => {
            const featureIRIs = this.getFeatureIRIs();
            return featureIRIs.includes(ed.getIdentifier());
        });
    }

    getExternallyDefinedIRIs(): IRI[] {
        return this.getExternallyDefinedFeatures().map(ed => ed.getIdentifier());
    }

    getFeatureIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Component.properties.hasFeature) as IRI[];
    }

    // ── Interaction factory methods ────────────────────────────────────────

    createInteraction(types: any | any[], identifier?: string): Interaction {
        const typeArr = Array.isArray(types) ? types : [types];
        if (!identifier) {
            identifier = `Interaction${this.getInteractionIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const interaction = Interaction.create(this.store, iri);
        interaction.setTypes(typeArr);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasInteraction, [iri]);
        return interaction;
    }

    createInhibitionInteraction(identifier?: string): InhibitionInteraction {
        if (!identifier) {
            identifier = `InhibitionInteraction${this.getInteractionIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const interaction = InhibitionInteraction.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasInteraction, [iri]);
        return interaction;
    }

    createStimulationInteraction(identifier?: string): StimulationInteraction {
        if (!identifier) {
            identifier = `StimulationInteraction${this.getInteractionIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const interaction = StimulationInteraction.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasInteraction, [iri]);
        return interaction;
    }

    createDegradationInteraction(identifier?: string): DegradationInteraction {
        if (!identifier) {
            identifier = `DegradationInteraction${this.getInteractionIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const interaction = DegradationInteraction.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasInteraction, [iri]);
        return interaction;
    }

    createBiochemicalReactionInteraction(identifier?: string): BiochemicalReactionInteraction {
        if (!identifier) {
            identifier = `BiochemicalReaction${this.getInteractionIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const interaction = BiochemicalReactionInteraction.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasInteraction, [iri]);
        return interaction;
    }

    createNonCovalentBindingInteraction(identifier?: string): NonCovalentBindingInteraction {
        if (!identifier) {
            identifier = `NonCovalentBinding${this.getInteractionIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const interaction = NonCovalentBindingInteraction.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasInteraction, [iri]);
        return interaction;
    }

    createGeneticProductionInteraction(identifier?: string): GeneticProductionInteraction {
        if (!identifier) {
            identifier = `GeneticProduction${this.getInteractionIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const interaction = GeneticProductionInteraction.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasInteraction, [iri]);
        return interaction;
    }

    createControlInteraction(identifier?: string): ControlInteraction {
        if (!identifier) {
            identifier = `ControlInteraction${this.getInteractionIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const interaction = ControlInteraction.create(this.store, iri);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasInteraction, [iri]);
        return interaction;
    }

    getInteractionIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Component.properties.hasInteraction) as IRI[];
    }

    // ── Constraint factory ─────────────────────────────────────────────────

    createConstraint(subject: IRI, restriction: ConstraintRestriction | IRI, object: IRI, identifier?: string): Constraint {
        if (!identifier) {
            identifier = `Constraint${this.getConstraintIRIs().length + 1}`;
        }
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const constraint = Constraint.create(this.store, iri);
        constraint.setSubject(subject);
        constraint.setRestriction(restriction);
        constraint.setObject(object);
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasConstraint, [iri]);
        return constraint;
    }

    getConstraintIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Component.properties.hasConstraint) as IRI[];
    }

    // ── Interface factory ─────────────────────────────────────────────────

    createInterface(identifier?: string): Interface {
        if (!identifier) identifier = 'Interface1';
        const iri = GraphUtil.resolveChildIRI(this.getIdentifier(), identifier);
        const iface = Interface.create(this.store, iri);
        RDFUtil.setProperty(this.store, this.resource, SBOLEntity.Component.properties.hasInterface, [iri]);
        return iface;
    }

    getInterfaceIRI(): IRI | null {
        const vals = RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Component.properties.hasInterface);
        return vals && vals.length > 0 ? vals[0] : null;
    }

    // ── hasModel ───────────────────────────────────────────────────────────

    addModelIRI(modelIRI: IRI): void {
        RDFUtil.addProperty(this.store, this.resource, SBOLEntity.Component.properties.hasModel, [modelIRI]);
    }

    getModelIRIs(): IRI[] {
        return RDFUtil.getProperty(this.store, this.resource, SBOLEntity.Component.properties.hasModel) as IRI[];
    }

    static create(store: any, identifier: IRI): Component {
        return new Component(store, identifier);
    }

    static load(store: any, identifier: IRI): Component {
        return new Component(store, identifier, true);
    }

    toString(indent: string = ''): string {
        let value = `${indent}Component(${this.getIdentifier()})`;
        value += this.getTypes().length > 0 ? `\n${indent}, types=${this.getTypes().join(', ')}` : '';
        value += this.getRoles().length > 0 ? `\n${indent}, roles=${this.getRoles().join(', ')}` : '';
        value += this.getSequenceIRIs().length > 0 ? `\n${indent}, sequences=${this.getSequenceIRIs().join(', ')}` : '';
        value += SBOL3Util.formatObjectArray(this.getSubComponents(), 'subComponents', indent);
        return value;
    }
}

// ─── DNAComponent ─────────────────────────────────────────────────────────────

export class DNAComponent extends Component {
    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(ComponentType.DNA);
        }
    }
    static create(store: any, identifier: IRI): DNAComponent {
        return new DNAComponent(store, identifier);
    }
    static load(store: any, identifier: IRI): DNAComponent {
        return new DNAComponent(store, identifier, true);
    }
}

// ─── RNAComponent ─────────────────────────────────────────────────────────────

export class RNAComponent extends Component {
    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(ComponentType.RNA);
        }
    }
    static create(store: any, identifier: IRI): RNAComponent {
        return new RNAComponent(store, identifier);
    }
    static load(store: any, identifier: IRI): RNAComponent {
        return new RNAComponent(store, identifier, true);
    }
}

// ─── ProteinComponent ────────────────────────────────────────────────────────

export class ProteinComponent extends Component {
    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(ComponentType.Protein);
        }
    }
    static create(store: any, identifier: IRI): ProteinComponent {
        return new ProteinComponent(store, identifier);
    }
    static load(store: any, identifier: IRI): ProteinComponent {
        return new ProteinComponent(store, identifier, true);
    }
}

// ─── SimpleChemicalComponent ─────────────────────────────────────────────────

export class SimpleChemicalComponent extends Component {
    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(ComponentType.SimpleChemical);
        }
    }
    static create(store: any, identifier: IRI): SimpleChemicalComponent {
        return new SimpleChemicalComponent(store, identifier);
    }
    static load(store: any, identifier: IRI): SimpleChemicalComponent {
        return new SimpleChemicalComponent(store, identifier, true);
    }
}

// ─── NonCovalentComplexComponent ─────────────────────────────────────────────

export class NonCovalentComplexComponent extends Component {
    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(ComponentType.NonCovalentComplex);
        }
    }
    static create(store: any, identifier: IRI): NonCovalentComplexComponent {
        return new NonCovalentComplexComponent(store, identifier);
    }
    static load(store: any, identifier: IRI): NonCovalentComplexComponent {
        return new NonCovalentComplexComponent(store, identifier, true);
    }
}

// ─── FunctionalEntityComponent ───────────────────────────────────────────────

export class FunctionalEntityComponent extends Component {
    protected constructor(store: any, identifier: IRI, skipCreate: boolean = false) {
        super(store, identifier, skipCreate);
        if (!skipCreate) {
            this.setType(ComponentType.FunctionalEntity);
        }
    }
    static create(store: any, identifier: IRI): FunctionalEntityComponent {
        return new FunctionalEntityComponent(store, identifier);
    }
    static load(store: any, identifier: IRI): FunctionalEntityComponent {
        return new FunctionalEntityComponent(store, identifier, true);
    }
}

// ─── PromoterDNAComponent ─────────────────────────────────────────────────────

export class PromoterDNAComponent extends DNAComponent {
    private constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setRole(DNARole.Promoter);
    }
    static create(store: any, identifier: IRI): PromoterDNAComponent {
        return new PromoterDNAComponent(store, identifier);
    }
}

// ─── RBSDNAComponent ──────────────────────────────────────────────────────────

export class RBSDNAComponent extends DNAComponent {
    private constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setRole(DNARole.RBS);
    }
    static create(store: any, identifier: IRI): RBSDNAComponent {
        return new RBSDNAComponent(store, identifier);
    }
}

// ─── CDSDNAComponent ──────────────────────────────────────────────────────────

export class CDSDNAComponent extends DNAComponent {
    private constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setRole(DNARole.CDS);
    }
    static create(store: any, identifier: IRI): CDSDNAComponent {
        return new CDSDNAComponent(store, identifier);
    }
}

// ─── TerminatorDNAComponent ───────────────────────────────────────────────────

export class TerminatorDNAComponent extends DNAComponent {
    private constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setRole(DNARole.Terminator);
    }
    static create(store: any, identifier: IRI): TerminatorDNAComponent {
        return new TerminatorDNAComponent(store, identifier);
    }
}

// ─── GeneDNAComponent ─────────────────────────────────────────────────────────

export class GeneDNAComponent extends DNAComponent {
    private constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setRole(DNARole.Gene);
    }
    static create(store: any, identifier: IRI): GeneDNAComponent {
        return new GeneDNAComponent(store, identifier);
    }
}

// ─── OperatorDNAComponent ─────────────────────────────────────────────────────

export class OperatorDNAComponent extends DNAComponent {
    private constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setRole(DNARole.Operator);
    }
    static create(store: any, identifier: IRI): OperatorDNAComponent {
        return new OperatorDNAComponent(store, identifier);
    }
}

// ─── EngineeredRegionDNAComponent ────────────────────────────────────────────

export class EngineeredRegionDNAComponent extends DNAComponent {
    private constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setRole(DNARole.EngineeredRegion);
    }
    static create(store: any, identifier: IRI): EngineeredRegionDNAComponent {
        return new EngineeredRegionDNAComponent(store, identifier);
    }
}

// ─── GenericDNAComponent ─────────────────────────────────────────────────────

export class GenericDNAComponent extends DNAComponent {
    private constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setRole(DNARole.SequenceFeature);
    }
    static create(store: any, identifier: IRI): GenericDNAComponent {
        return new GenericDNAComponent(store, identifier);
    }
}

// ─── TranscriptionFactorProteinComponent ─────────────────────────────────────

export class TranscriptionFactorProteinComponent extends ProteinComponent {
    private constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setRole(ProteinRole.TranscriptionFactor);
    }
    static create(store: any, identifier: IRI): TranscriptionFactorProteinComponent {
        return new TranscriptionFactorProteinComponent(store, identifier);
    }
}

// ─── EffectorSimpleChemicalComponent ─────────────────────────────────────────

export class EffectorSimpleChemicalComponent extends SimpleChemicalComponent {
    private constructor(store: any, identifier: IRI) {
        super(store, identifier);
        this.setRole(SmallMoleculeRole.Effector);
    }
    static create(store: any, identifier: IRI): EffectorSimpleChemicalComponent {
        return new EffectorSimpleChemicalComponent(store, identifier);
    }
}

// ─── Legacy aliases (backwards-compatible names from inputs/) ─────────────────

export class PromoterComponent extends PromoterDNAComponent {}
export class RBSComponent extends RBSDNAComponent {}
export class CDSComponent extends CDSDNAComponent {}
export class EngineeredRegionComponent extends EngineeredRegionDNAComponent {}
