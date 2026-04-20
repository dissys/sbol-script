import { SBOLDocument } from './SBOLDocument';
import { GraphDocument } from '../otol/GraphDocument';
import { RDFFormat } from '../otol/RDFUtil';

// Core hierarchy
import Identified from './Identified';
import TopLevel from './TopLevel';
import Feature from './Feature';

// Component and subclasses
import {
    Component, DNAComponent, RNAComponent, ProteinComponent,
    SimpleChemicalComponent, NonCovalentComplexComponent, FunctionalEntityComponent,
    PromoterDNAComponent, RBSDNAComponent, CDSDNAComponent, TerminatorDNAComponent,
    GeneDNAComponent, OperatorDNAComponent, EngineeredRegionDNAComponent, GenericDNAComponent,
    TranscriptionFactorProteinComponent, EffectorSimpleChemicalComponent,
    PromoterComponent, RBSComponent, CDSComponent, EngineeredRegionComponent
} from './Component';

// Sequence and subclasses
import {
    Sequence, SequenceWithElements, DNASequence, RNASequence,
    ProteinSequence, InChISequence, SMILESSequence
} from './Sequence';

// Feature subclasses
import { SubComponent } from './SubComponent';
import { SequenceFeature } from './SequenceFeature';
import { LocalSubComponent } from './LocalSubComponent';
import { ComponentReference } from './ComponentReference';
import { ExternallyDefined } from './ExternallyDefined';

// Location
import { Location, Range, Cut, EntireSequence } from './Location';

// Interaction and subclasses
import {
    Interaction, InhibitionInteraction, StimulationInteraction, DegradationInteraction,
    BiochemicalReactionInteraction, NonCovalentBindingInteraction,
    GeneticProductionInteraction, ControlInteraction
} from './Interaction';

// Participation and subclasses
import {
    Participation,
    InhibitorParticipation, InhibitedParticipation,
    StimulatorParticipation, StimulatedParticipation,
    ReactantParticipation, ProductParticipation,
    PromoterParticipation, ModifierParticipation, ModifiedParticipation, TemplateParticipation
} from './Participation';

// Other Identified entities
import { Constraint } from './Constraint';
import { Interface } from './Interface';
import { VariableFeature } from './VariableFeature';

// TopLevel entities
import { Collection, Experiment } from './Collection';
import { Model } from './Model';
import { Attachment } from './Attachment';
import { Implementation } from './Implementation';
import { ExperimentalData } from './ExperimentalData';
import { CombinatorialDerivation } from './CombinatorialDerivation';
import { GenericTopLevel } from './GenericTopLevel';
import { Metadata } from './Metadata';

// Provenance
import { Activity } from './Activity';
import { Usage } from './Usage';
import { Association } from './Association';
import { Plan } from './Plan';
import { Agent } from './Agent';

// Units of Measure
import { Measure } from './Measure';
import {
    Unit, SingularUnit, PrefixedUnit, UnitMultiplication, UnitDivision, UnitExponentiation
} from './Unit';
import { Prefix, SIPrefix, BinaryPrefix } from './Prefix';

// High-level API
import { SBOLAPI } from './SBOLAPI';

// Vocabulary
import {
    SBOLEntity,
    DNARole, RNARole, ProteinRole, SmallMoleculeRole,
    ComponentType, Encoding, Orientation, NucleicAcidTopology,
    InteractionType, ParticipationType,
    CombinatorialDerivationStrategy, Cardinality, RoleIntegration,
    ConstraintRestriction, ModelLanguage, ModelFramework
} from './Vocabulary';

// Attach to window for browser usage
if (typeof window !== 'undefined') {
    (window as any).libSBOL3 = {
        SBOLDocument, SBOLAPI,
        Component, DNAComponent, RNAComponent, ProteinComponent,
        SimpleChemicalComponent, NonCovalentComplexComponent, FunctionalEntityComponent,
        PromoterDNAComponent, RBSDNAComponent, CDSDNAComponent, TerminatorDNAComponent,
        GeneDNAComponent, OperatorDNAComponent, EngineeredRegionDNAComponent, GenericDNAComponent,
        TranscriptionFactorProteinComponent, EffectorSimpleChemicalComponent,
        Sequence, DNASequence, RNASequence, ProteinSequence, InChISequence, SMILESSequence,
        SubComponent, SequenceFeature, LocalSubComponent, ComponentReference, ExternallyDefined,
        Location, Range, Cut, EntireSequence,
        Interaction, InhibitionInteraction, StimulationInteraction, DegradationInteraction,
        BiochemicalReactionInteraction, NonCovalentBindingInteraction,
        GeneticProductionInteraction, ControlInteraction,
        Participation, InhibitorParticipation, InhibitedParticipation,
        StimulatorParticipation, StimulatedParticipation,
        ReactantParticipation, ProductParticipation, PromoterParticipation,
        ModifierParticipation, ModifiedParticipation, TemplateParticipation,
        Constraint, Interface, VariableFeature,
        Collection, Experiment, Model, Attachment, Implementation,
        ExperimentalData, CombinatorialDerivation, GenericTopLevel, Metadata,
        Activity, Usage, Association, Plan, Agent,
        Measure, Unit, SingularUnit, PrefixedUnit, UnitMultiplication, UnitDivision, UnitExponentiation,
        Prefix, SIPrefix, BinaryPrefix,
        RDFFormat,
        DNARole, RNARole, ProteinRole, SmallMoleculeRole,
        ComponentType, Encoding, Orientation, NucleicAcidTopology,
        InteractionType, ParticipationType,
        CombinatorialDerivationStrategy, Cardinality, RoleIntegration,
        ConstraintRestriction, ModelLanguage, ModelFramework
    };
}

// Export for Node/UMD usage
export {
    SBOLDocument, GraphDocument, SBOLAPI,
    Identified, TopLevel, Feature,
    Component, DNAComponent, RNAComponent, ProteinComponent,
    SimpleChemicalComponent, NonCovalentComplexComponent, FunctionalEntityComponent,
    PromoterDNAComponent, RBSDNAComponent, CDSDNAComponent, TerminatorDNAComponent,
    GeneDNAComponent, OperatorDNAComponent, EngineeredRegionDNAComponent, GenericDNAComponent,
    TranscriptionFactorProteinComponent, EffectorSimpleChemicalComponent,
    PromoterComponent, RBSComponent, CDSComponent, EngineeredRegionComponent,
    Sequence, SequenceWithElements, DNASequence, RNASequence, ProteinSequence, InChISequence, SMILESSequence,
    SubComponent, SequenceFeature, LocalSubComponent, ComponentReference, ExternallyDefined,
    Location, Range, Cut, EntireSequence,
    Interaction, InhibitionInteraction, StimulationInteraction, DegradationInteraction,
    BiochemicalReactionInteraction, NonCovalentBindingInteraction,
    GeneticProductionInteraction, ControlInteraction,
    Participation, InhibitorParticipation, InhibitedParticipation,
    StimulatorParticipation, StimulatedParticipation,
    ReactantParticipation, ProductParticipation, PromoterParticipation,
    ModifierParticipation, ModifiedParticipation, TemplateParticipation,
    Constraint, Interface, VariableFeature,
    Collection, Experiment, Model, Attachment, Implementation,
    ExperimentalData, CombinatorialDerivation, GenericTopLevel, Metadata,
    Activity, Usage, Association, Plan, Agent,
    Measure, Unit, SingularUnit, PrefixedUnit, UnitMultiplication, UnitDivision, UnitExponentiation,
    Prefix, SIPrefix, BinaryPrefix,
    RDFFormat,
    SBOLEntity,
    DNARole, RNARole, ProteinRole, SmallMoleculeRole,
    ComponentType, Encoding, Orientation, NucleicAcidTopology,
    InteractionType, ParticipationType,
    CombinatorialDerivationStrategy, Cardinality, RoleIntegration,
    ConstraintRestriction, ModelLanguage, ModelFramework
};
