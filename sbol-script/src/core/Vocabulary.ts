import SBOLNamespaces from './SBOLNamespaces';

function sbolEntity(name: string) {
  return { iri: SBOLNamespaces.SBOL(name).value, name };
}

function provEntity(name: string) {
  return { iri: SBOLNamespaces.PROV(name).value, name };
}

function omEntity(name: string) {
  return { iri: SBOLNamespaces.OM(name).value, name };
}

// ─── SBOLEntity: property IRI constants for all entities ───────────────────

export const SBOLEntity = {
  Identified: {
    ...sbolEntity("Identified"),
    properties: {
      displayId:      SBOLNamespaces.SBOL('displayId').value,
      // Fixed: was 'title', corrected to 'name' per SBOL3 ontology (sbol:name)
      name:           SBOLNamespaces.SBOL('name').value,
      description:    SBOLNamespaces.SBOL('description').value,
      wasDerivedFrom: SBOLNamespaces.PROV('wasDerivedFrom').value,
      wasGeneratedBy: SBOLNamespaces.PROV('wasGeneratedBy').value,
      hasMeasure:     SBOLNamespaces.SBOL('hasMeasure').value,
    }
  },
  TopLevel: {
    ...sbolEntity("TopLevel"),
    properties: {
      hasNamespace:  SBOLNamespaces.SBOL('hasNamespace').value,
      hasAttachment: SBOLNamespaces.SBOL('hasAttachment').value,
    }
  },
  Component: {
    ...sbolEntity("Component"),
    properties: {
      hasFeature:    SBOLNamespaces.SBOL('hasFeature').value,
      hasSequence:   SBOLNamespaces.SBOL('hasSequence').value,
      role:          SBOLNamespaces.SBOL('role').value,
      type:          SBOLNamespaces.SBOL('type').value,
      hasInteraction: SBOLNamespaces.SBOL('hasInteraction').value,
      hasConstraint:  SBOLNamespaces.SBOL('hasConstraint').value,
      hasModel:       SBOLNamespaces.SBOL('hasModel').value,
      hasInterface:   SBOLNamespaces.SBOL('hasInterface').value,
    }
  },
  Sequence: {
    ...sbolEntity("Sequence"),
    properties: {
      elements:  SBOLNamespaces.SBOL('elements').value,
      encoding:  SBOLNamespaces.SBOL('encoding').value,
    }
  },
  Feature: {
    ...sbolEntity("Feature"),
    properties: {
      orientation: SBOLNamespaces.SBOL('orientation').value,
      role:        SBOLNamespaces.SBOL('role').value,
      hasLocation: SBOLNamespaces.SBOL('hasLocation').value,
    }
  },
  SubComponent: {
    ...sbolEntity("SubComponent"),
    properties: {
      instanceOf:      SBOLNamespaces.SBOL('instanceOf').value,
      roleIntegration: SBOLNamespaces.SBOL('roleIntegration').value,
      sourceLocation:  SBOLNamespaces.SBOL('sourceLocation').value,
    }
  },
  SequenceFeature: sbolEntity("SequenceFeature"),
  LocalSubComponent: sbolEntity("LocalSubComponent"),
  ComponentReference: {
    ...sbolEntity("ComponentReference"),
    properties: {
      inChildOf: SBOLNamespaces.SBOL('inChildOf').value,
      refersTo:  SBOLNamespaces.SBOL('refersTo').value,
    }
  },
  ExternallyDefined: {
    ...sbolEntity("ExternallyDefined"),
    properties: {
      definition: SBOLNamespaces.SBOL('definition').value,
    }
  },
  Location: {
    ...sbolEntity("Location"),
    properties: {
      orientation: SBOLNamespaces.SBOL('orientation').value,
      order:       SBOLNamespaces.SBOL('order').value,
      hasSequence: SBOLNamespaces.SBOL('hasSequence').value,
    }
  },
  Range: {
    ...sbolEntity("Range"),
    properties: {
      start: SBOLNamespaces.SBOL('start').value,
      end:   SBOLNamespaces.SBOL('end').value,
    }
  },
  Cut: {
    ...sbolEntity("Cut"),
    properties: {
      at: SBOLNamespaces.SBOL('at').value,
    }
  },
  EntireSequence: sbolEntity("EntireSequence"),
  Interaction: {
    ...sbolEntity("Interaction"),
    properties: {
      type:           SBOLNamespaces.SBOL('type').value,
      hasParticipation: SBOLNamespaces.SBOL('hasParticipation').value,
    }
  },
  Participation: {
    ...sbolEntity("Participation"),
    properties: {
      role:                  SBOLNamespaces.SBOL('role').value,
      participant:           SBOLNamespaces.SBOL('participant').value,
      higherOrderParticipant: SBOLNamespaces.SBOL('higherOrderParticipant').value,
    }
  },
  Constraint: {
    ...sbolEntity("Constraint"),
    properties: {
      restriction: SBOLNamespaces.SBOL('restriction').value,
      subject:     SBOLNamespaces.SBOL('subject').value,
      object:      SBOLNamespaces.SBOL('object').value,
    }
  },
  Interface: {
    ...sbolEntity("Interface"),
    properties: {
      input:          SBOLNamespaces.SBOL('input').value,
      output:         SBOLNamespaces.SBOL('output').value,
      nondirectional: SBOLNamespaces.SBOL('nondirectional').value,
    }
  },
  VariableFeature: {
    ...sbolEntity("VariableFeature"),
    properties: {
      cardinality:        SBOLNamespaces.SBOL('cardinality').value,
      variable:           SBOLNamespaces.SBOL('variable').value,
      variant:            SBOLNamespaces.SBOL('variant').value,
      variantCollection:  SBOLNamespaces.SBOL('variantCollection').value,
      variantDerivation:  SBOLNamespaces.SBOL('variantDerivation').value,
      variantMeasure:     SBOLNamespaces.SBOL('variantMeasure').value,
    }
  },
  CombinatorialDerivation: {
    ...sbolEntity("CombinatorialDerivation"),
    properties: {
      strategy:           SBOLNamespaces.SBOL('strategy').value,
      template:           SBOLNamespaces.SBOL('template').value,
      hasVariableFeature: SBOLNamespaces.SBOL('hasVariableFeature').value,
    }
  },
  Model: {
    ...sbolEntity("Model"),
    properties: {
      source:    SBOLNamespaces.SBOL('source').value,
      language:  SBOLNamespaces.SBOL('language').value,
      framework: SBOLNamespaces.SBOL('framework').value,
    }
  },
  Collection: {
    ...sbolEntity("Collection"),
    properties: {
      member: SBOLNamespaces.SBOL('member').value,
    }
  },
  Attachment: {
    ...sbolEntity("Attachment"),
    properties: {
      source:        SBOLNamespaces.SBOL('source').value,
      format:        SBOLNamespaces.SBOL('format').value,
      size:          SBOLNamespaces.SBOL('size').value,
      hash:          SBOLNamespaces.SBOL('hash').value,
      hashAlgorithm: SBOLNamespaces.SBOL('hashAlgorithm').value,
    }
  },
  Implementation: {
    ...sbolEntity("Implementation"),
    properties: {
      built: SBOLNamespaces.SBOL('built').value,
    }
  },
  Experiment: sbolEntity("Experiment"),
  ExperimentalData: {
    ...sbolEntity("ExperimentalData"),
    properties: {
      attachment: SBOLNamespaces.SBOL('attachment').value,
    }
  },
  GenericTopLevel: sbolEntity("TopLevel"),
  Metadata: sbolEntity("Identified"),
  // Provenance (replacementOf → prov:)
  Activity: {
    ...provEntity("Activity"),
    properties: {
      startedAtTime:       SBOLNamespaces.PROV('startedAtTime').value,
      endedAtTime:         SBOLNamespaces.PROV('endedAtTime').value,
      wasInformedBy:       SBOLNamespaces.PROV('wasInformedBy').value,
      qualifiedUsage:      SBOLNamespaces.PROV('qualifiedUsage').value,
      qualifiedAssociation: SBOLNamespaces.PROV('qualifiedAssociation').value,
    }
  },
  Usage: {
    ...provEntity("Usage"),
    properties: {
      entity:  SBOLNamespaces.PROV('entity').value,
      hadRole: SBOLNamespaces.PROV('hadRole').value,
    }
  },
  Association: {
    ...provEntity("Association"),
    properties: {
      hadRole: SBOLNamespaces.PROV('hadRole').value,
      hadPlan: SBOLNamespaces.PROV('hadPlan').value,
      agent:   SBOLNamespaces.PROV('agent').value,
    }
  },
  Plan: provEntity("Plan"),
  Agent: provEntity("Agent"),
  // Units of Measure (replacementOf → om:)
  Measure: {
    ...omEntity("Measure"),
    properties: {
      hasNumericalValue: SBOLNamespaces.OM('hasNumericalValue').value,
      hasUnit:           SBOLNamespaces.OM('hasUnit').value,
      type:              SBOLNamespaces.SBOL('type').value,
    }
  },
  Unit: {
    ...omEntity("Unit"),
    properties: {
      symbol:            SBOLNamespaces.OM('symbol').value,
      alternativeSymbol: SBOLNamespaces.OM('alternativeSymbol').value,
      alternativeLabel:  SBOLNamespaces.OM('alternativeLabel').value,
      longComment:       SBOLNamespaces.OM('longcomment').value,
      label:             SBOLNamespaces.OM('label').value,
      comment:           SBOLNamespaces.OM('comment').value,
    }
  },
  SingularUnit: {
    ...omEntity("SingularUnit"),
    properties: {
      hasFactor: SBOLNamespaces.OM('hasFactor').value,
      hasUnit:   SBOLNamespaces.OM('hasUnit').value,
    }
  },
  PrefixedUnit: {
    ...omEntity("PrefixedUnit"),
    properties: {
      hasPrefix: SBOLNamespaces.OM('hasPrefix').value,
      hasUnit:   SBOLNamespaces.OM('hasUnit').value,
    }
  },
  UnitMultiplication: {
    ...omEntity("UnitMultiplication"),
    properties: {
      hasTerm1: SBOLNamespaces.OM('hasTerm1').value,
      hasTerm2: SBOLNamespaces.OM('hasTerm2').value,
    }
  },
  UnitDivision: {
    ...omEntity("UnitDivision"),
    properties: {
      hasNumerator:   SBOLNamespaces.OM('hasNumerator').value,
      hasDenominator: SBOLNamespaces.OM('hasDenominator').value,
    }
  },
  UnitExponentiation: {
    ...omEntity("UnitExponentiation"),
    properties: {
      hasBase:    SBOLNamespaces.OM('hasBase').value,
      hasExponent: SBOLNamespaces.OM('hasExponent').value,
    }
  },
  Prefix: {
    ...omEntity("Prefix"),
    properties: {
      symbol:            SBOLNamespaces.OM('symbol').value,
      alternativeSymbol: SBOLNamespaces.OM('alternativeSymbol').value,
      longComment:       SBOLNamespaces.OM('longcomment').value,
      hasFactor:         SBOLNamespaces.OM('hasFactor').value,
      label:             SBOLNamespaces.OM('label').value,
      alternativeLabel:  SBOLNamespaces.OM('alternativeLabel').value,
      comment:           SBOLNamespaces.OM('comment').value,
    }
  },
  SIPrefix: { ...omEntity("SIPrefix") },
  BinaryPrefix: { ...omEntity("BinaryPrefix") },
};

// ─── Vocabulary enums ───────────────────────────────────────────────────────

export const DNARole = {
  SequenceFeature: { iri: SBOLNamespaces.SO('0000110').value, label: "Sequence Feature" },
  PROMOTER: { iri: SBOLNamespaces.SO('0000167').value, label: "Promoter" },
  RBS:       { iri: SBOLNamespaces.SO('0000139').value, label: "Ribosome Binding Site" },
  CDS:       { iri: SBOLNamespaces.SO('0000316').value, label: "Coding Sequence" },
  Terminator: { iri: SBOLNamespaces.SO('0000141').value, label: "Terminator" },
  Gene:       { iri: SBOLNamespaces.SO('0000704').value, label: "Gene" },
  Operator:   { iri: SBOLNamespaces.SO('0000057').value, label: "Operator" },
  EngineeredRegion: { iri: SBOLNamespaces.SO('0000804').value, label: "Engineered Region" },
  PhysicalCompartment: { iri: SBOLNamespaces.SBO('0000290').value, label: "Physical Compartment" },
  isRoleIRI: (iri: any) => /^https?:\/\/identifiers\.org\/SO:\d{7}$/.test(iri)
};

export const RNARole = {
  SequenceFeature: { iri: SBOLNamespaces.SO('0000110').value, label: "Sequence Feature" },
  mRNA: { iri: SBOLNamespaces.SO('0000234').value, label: "mRNA" },
  isRoleIRI: (iri: any) => /^https?:\/\/identifiers\.org\/SO:\d{7}$/.test(iri)
};

export const ProteinRole = {
  MolecularFunction:  { iri: SBOLNamespaces.GO('0003674').value, label: "Molecular Function" },
  TranscriptionFactor: { iri: SBOLNamespaces.GO('0003700').value, label: "Transcription Factor" },
  isRoleIRI: (iri: any) => /^https?:\/\/identifiers\.org\/GO:\d+$/.test(iri)
};

export const SmallMoleculeRole = {
  MaterialEntity: { iri: SBOLNamespaces.CHEBI('50906').value, label: "Material Entity" },
  Effector:       { iri: SBOLNamespaces.CHEBI('35224').value, label: "Effector" },
  isRoleIRI: (iri: any) => /^https?:\/\/identifiers\.org\/CHEBI:\d+$/.test(iri)
};

export const ComponentType = {
  DNA:               { iri: SBOLNamespaces.SBO('0000251').value, label: "Deoxyribonucleic acid" },
  RNA:               { iri: SBOLNamespaces.SBO('0000250').value, label: "Ribonucleic acid" },
  Protein:           { iri: SBOLNamespaces.SBO('0000252').value, label: "Polypeptide chain" },
  SimpleChemical:    { iri: SBOLNamespaces.SBO('0000247').value, label: "Simple Chemical" },
  NonCovalentComplex: { iri: SBOLNamespaces.SBO('0000253').value, label: "Non-covalent complex" },
  FunctionalEntity:  { iri: SBOLNamespaces.SBO('0000241').value, label: "Functional Entity" },
  Cell:               { iri: SBOLNamespaces.GO('0005623').value, label: "Cell" },
  isTypeIRI: (iri: any) => /^https?:\/\/identifiers\.org\/SBO:\d{7}$/.test(iri)
};

export const Encoding = {
  IUPAC_DNA_RNA: { iri: SBOLNamespaces.EDAM('format_1207').value, label: "IUPAC DNA/RNA" },
  IUPAC_Protein: { iri: SBOLNamespaces.EDAM('format_1208').value, label: "IUPAC Protein" },
  InChI:         { iri: SBOLNamespaces.EDAM('format_1197').value, label: "InChI" },
  SMILES:        { iri: SBOLNamespaces.EDAM('format_1196').value, label: "SMILES" },
  isEncodingIRI: (iri: any) => /^https?:\/\/identifiers\.org\/EDAM:format_\d+$/.test(iri)
};

export const Orientation = {
  INLINE:             { iri: SBOLNamespaces.SO('0001030').value, label: "Inline" },
  REVERSE_COMPLEMENT: { iri: SBOLNamespaces.SO('0001031').value, label: "Reverse Complement" },
  isOrientationIRI: (iri: any) => /^https?:\/\/identifiers\.org\/SO:\d{7}$/.test(iri)
};

export const NucleicAcidTopology = {
  Linear:        { iri: SBOLNamespaces.SO('0000987').value, label: "linear" },
  Circular:      { iri: SBOLNamespaces.SO('0000988').value, label: "circular" },
  SingleStranded: { iri: SBOLNamespaces.SO('0000984').value, label: "single-stranded" },
  DoubleStranded: { iri: SBOLNamespaces.SO('0000985').value, label: "double-stranded" },
};

export const InteractionType = {
  Inhibition:         { iri: SBOLNamespaces.SBO('0000169').value, label: "Inhibition" },
  Stimulation:        { iri: SBOLNamespaces.SBO('0000170').value, label: "Stimulation" },
  BiochemicalReaction: { iri: SBOLNamespaces.SBO('0000176').value, label: "Biochemical Reaction" },
  NonCovalentBinding: { iri: SBOLNamespaces.SBO('0000177').value, label: "Non-Covalent Binding" },
  Degradation:        { iri: SBOLNamespaces.SBO('0000179').value, label: "Degradation" },
  GeneticProduction:  { iri: SBOLNamespaces.SBO('0000589').value, label: "Genetic Production" },
  Control:            { iri: SBOLNamespaces.SBO('0000168').value, label: "Control" },
};

export const ParticipationType = {
  Inhibitor:   { iri: SBOLNamespaces.SBO('0000020').value, label: "Inhibitor" },
  Inhibited:   { iri: SBOLNamespaces.SBO('0000642').value, label: "Inhibited" },
  Stimulator:  { iri: SBOLNamespaces.SBO('0000459').value, label: "Stimulator" },
  Stimulated:  { iri: SBOLNamespaces.SBO('0000643').value, label: "Stimulated" },
  Reactant:    { iri: SBOLNamespaces.SBO('0000010').value, label: "Reactant" },
  Product:     { iri: SBOLNamespaces.SBO('0000011').value, label: "Product" },
  Promoter:    { iri: SBOLNamespaces.SBO('0000598').value, label: "Promoter" },
  Modifier:    { iri: SBOLNamespaces.SBO('0000019').value, label: "Modifier" },
  Modified:    { iri: SBOLNamespaces.SBO('0000644').value, label: "Modified" },
  Template:    { iri: SBOLNamespaces.SBO('0000645').value, label: "Template" },
};

export const CombinatorialDerivationStrategy = {
  Enumerate: { iri: SBOLNamespaces.SBOL('enumerate').value, label: "enumerate" },
  Sample:    { iri: SBOLNamespaces.SBOL('sample').value,    label: "sample" },
};

export const Cardinality = {
  ZeroOrOne:  { iri: SBOLNamespaces.SBOL('zeroOrOne').value,  label: "zeroOrOne" },
  One:        { iri: SBOLNamespaces.SBOL('one').value,        label: "one" },
  ZeroOrMore: { iri: SBOLNamespaces.SBOL('zeroOrMore').value, label: "zeroOrMore" },
  OneOrMore:  { iri: SBOLNamespaces.SBOL('oneOrMore').value,  label: "oneOrMore" },
};

export const RoleIntegration = {
  OverrideRoles: { iri: SBOLNamespaces.SBOL('overrideRoles').value, label: "overrideRoles" },
  MergeRoles:    { iri: SBOLNamespaces.SBOL('mergeRoles').value,    label: "mergeRoles" },
};

export const ConstraintRestriction = {
  // Sequential
  Precedes:          { iri: SBOLNamespaces.SBOL('precedes').value,          label: "precedes" },
  StrictlyPrecedes:  { iri: SBOLNamespaces.SBOL('strictlyPrecedes').value,  label: "strictlyPrecedes" },
  Meets:             { iri: SBOLNamespaces.SBOL('meets').value,             label: "meets" },
  Overlaps:          { iri: SBOLNamespaces.SBOL('overlaps').value,          label: "overlaps" },
  Contains:          { iri: SBOLNamespaces.SBOL('contains').value,          label: "contains" },
  StrictlyContains:  { iri: SBOLNamespaces.SBOL('strictlyContains').value,  label: "strictlyContains" },
  Equals:            { iri: SBOLNamespaces.SBOL('equals').value,            label: "equals" },
  Starts:            { iri: SBOLNamespaces.SBOL('starts').value,            label: "starts" },
  Finishes:          { iri: SBOLNamespaces.SBOL('finishes').value,          label: "finishes" },
  // Identity
  VerifyIdentical:   { iri: SBOLNamespaces.SBOL('verifyIdentical').value,   label: "verifyIdentical" },
  DifferentFrom:     { iri: SBOLNamespaces.SBOL('differentFrom').value,     label: "differentFrom" },
  Replaces:          { iri: SBOLNamespaces.SBOL('replaces').value,          label: "replaces" },
  // Orientation
  SameOrientationAs: { iri: SBOLNamespaces.SBOL('sameOrientationAs').value, label: "sameOrientationAs" },
  OppositeOrientationAs: { iri: SBOLNamespaces.SBOL('oppositeOrientationAs').value, label: "oppositeOrientationAs" },
  // Topology
  IsDisjointFrom:    { iri: SBOLNamespaces.SBOL('isDisjointFrom').value,    label: "isDisjointFrom" },
  Covers:            { iri: SBOLNamespaces.SBOL('covers').value,            label: "covers" },
};

export const ModelLanguage = {
  SBML:   { iri: SBOLNamespaces.EDAM('format_2585').value, label: "SBML" },
  BioPAX: { iri: SBOLNamespaces.EDAM('format_3156').value, label: "BioPAX" },
  CellML: { iri: SBOLNamespaces.EDAM('format_3240').value, label: "CellML" },
  MATLAB: { iri: SBOLNamespaces.EDAM('format_3843').value, label: "MATLAB" },
};

export const ModelFramework = {
  ODE:        { iri: SBOLNamespaces.SBO('0000293').value, label: "Ordinary Differential Equations" },
  Logical:    { iri: SBOLNamespaces.SBO('0000234').value, label: "Logical Framework" },
  Continuous: { iri: SBOLNamespaces.SBO('0000062').value, label: "Continuous Framework" },
  Discrete:   { iri: SBOLNamespaces.SBO('0000063').value, label: "Discrete Framework" },
};


