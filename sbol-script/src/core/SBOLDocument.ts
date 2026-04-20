import SBOLNamespaces from './SBOLNamespaces';
import { Component, DNAComponent, RNAComponent, ProteinComponent, SimpleChemicalComponent } from './Component';
import { Sequence, DNASequence, RNASequence, ProteinSequence } from './Sequence';
import { Collection, Experiment } from './Collection';
import { Model } from './Model';
import { Attachment } from './Attachment';
import { Implementation } from './Implementation';
import { ExperimentalData } from './ExperimentalData';
import { CombinatorialDerivation } from './CombinatorialDerivation';
import { GenericTopLevel } from './GenericTopLevel';
import { Activity } from './Activity';
import { Plan } from './Plan';
import { Agent } from './Agent';
import { Measure } from './Measure';
import { Unit } from './Unit';
import SBOL3Util from './SBOL3Util';
import { GraphDocument } from '../otol/GraphDocument';
import { ComponentType } from './Vocabulary';

type IRI = string;

export class SBOLDocument extends GraphDocument {

  constructor(baseIRI: string) {
    super(baseIRI);
    const namespaceMappings = SBOLNamespaces.getNamespaceMappings();
    namespaceMappings.forEach(mapping => {
      this.addNamespace(mapping.prefix, mapping.uri);
    });
  }

  // ─── Component factories ─────────────────────────────────────────────────

  createComponent(identifier: IRI, namespace: IRI, types: any[]): Component {
    const comp = Component.create(this.store, identifier);
    comp.setTypes(types);
    comp.setNamespace(namespace);
    return comp;
  }

  createDNAComponent(identifier: IRI, namespace: IRI): DNAComponent {
    const comp = DNAComponent.create(this.store, identifier);
    comp.setNamespace(namespace);
    return comp;
  }

  createRNAComponent(identifier: IRI, namespace: IRI): RNAComponent {
    const comp = RNAComponent.create(this.store, identifier);
    comp.setNamespace(namespace);
    return comp;
  }

  createProteinComponent(identifier: IRI, namespace: IRI): ProteinComponent {
    const comp = ProteinComponent.create(this.store, identifier);
    comp.setNamespace(namespace);
    return comp;
  }

  createSimpleChemicalComponent(identifier: IRI, namespace: IRI): SimpleChemicalComponent {
    const comp = SimpleChemicalComponent.create(this.store, identifier);
    comp.setNamespace(namespace);
    return comp;
  }

  getComponents(): Component[] {
    return SBOL3Util.loadObjectsByType(this.store, 'Component', Component.load);
  }

  // ─── Sequence factories ──────────────────────────────────────────────────

  createSequence(identifier: IRI, namespace: IRI): Sequence {
    const seq = Sequence.create(this.store, identifier);
    seq.setNamespace(namespace);
    return seq;
  }

  createDNASequence(identifier: IRI, namespace: IRI, elements: string): DNASequence {
    const seq = DNASequence.create(this.store, identifier);
    seq.setNamespace(namespace);
    seq.setElements(elements);
    return seq;
  }

  createRNASequence(identifier: IRI, namespace: IRI, elements: string): RNASequence {
    const seq = RNASequence.create(this.store, identifier);
    seq.setNamespace(namespace);
    seq.setElements(elements);
    return seq;
  }

  createProteinSequence(identifier: IRI, namespace: IRI, elements: string): ProteinSequence {
    const seq = ProteinSequence.create(this.store, identifier);
    seq.setNamespace(namespace);
    seq.setElements(elements);
    return seq;
  }

  getSequences(): Sequence[] {
    return SBOL3Util.loadObjectsByType(this.store, 'Sequence', Sequence.load);
  }

  // ─── Collection factory ──────────────────────────────────────────────────

  createCollection(identifier: IRI, namespace: IRI): Collection {
    const col = Collection.create(this.store, identifier);
    col.setNamespace(namespace);
    return col;
  }

  createExperiment(identifier: IRI, namespace: IRI): Experiment {
    const exp = Experiment.create(this.store, identifier);
    exp.setNamespace(namespace);
    return exp;
  }

  getCollections(): Collection[] {
    return SBOL3Util.loadObjectsByType(this.store, 'Collection', Collection.load);
  }

  // ─── Model factory ───────────────────────────────────────────────────────

  createModel(identifier: IRI, namespace: IRI): Model {
    const model = Model.create(this.store, identifier);
    model.setNamespace(namespace);
    return model;
  }

  getModels(): Model[] {
    return SBOL3Util.loadObjectsByType(this.store, 'Model', Model.load);
  }

  // ─── Attachment factory ──────────────────────────────────────────────────

  createAttachment(identifier: IRI, namespace: IRI, source: IRI): Attachment {
    const att = Attachment.create(this.store, identifier);
    att.setNamespace(namespace);
    att.setSource(source);
    return att;
  }

  getAttachments(): Attachment[] {
    return SBOL3Util.loadObjectsByType(this.store, 'Attachment', Attachment.load);
  }

  // ─── Implementation factory ──────────────────────────────────────────────

  createImplementation(identifier: IRI, namespace: IRI): Implementation {
    const impl = Implementation.create(this.store, identifier);
    impl.setNamespace(namespace);
    return impl;
  }

  getImplementations(): Implementation[] {
    return SBOL3Util.loadObjectsByType(this.store, 'Implementation', Implementation.load);
  }

  // ─── ExperimentalData factory ────────────────────────────────────────────

  createExperimentalData(identifier: IRI, namespace: IRI): ExperimentalData {
    const ed = ExperimentalData.create(this.store, identifier);
    ed.setNamespace(namespace);
    return ed;
  }

  // ─── CombinatorialDerivation factory ─────────────────────────────────────

  createCombinatorialDerivation(identifier: IRI, namespace: IRI): CombinatorialDerivation {
    const cd = CombinatorialDerivation.create(this.store, identifier);
    cd.setNamespace(namespace);
    return cd;
  }

  getCombinatorialDerivations(): CombinatorialDerivation[] {
    return SBOL3Util.loadObjectsByType(this.store, 'CombinatorialDerivation', CombinatorialDerivation.load);
  }

  // ─── Provenance factories ─────────────────────────────────────────────────

  createActivity(identifier: IRI, namespace: IRI): Activity {
    const act = Activity.create(this.store, identifier);
    act.setNamespace(namespace);
    return act;
  }

  createPlan(identifier: IRI, namespace: IRI): Plan {
    const plan = Plan.create(this.store, identifier);
    plan.setNamespace(namespace);
    return plan;
  }

  createAgent(identifier: IRI, namespace: IRI): Agent {
    const agent = Agent.create(this.store, identifier);
    agent.setNamespace(namespace);
    return agent;
  }

  // ─── GenericTopLevel factory ─────────────────────────────────────────────

  createGenericTopLevel(identifier: IRI, namespace: IRI): GenericTopLevel {
    const gtl = GenericTopLevel.create(this.store, identifier);
    gtl.setNamespace(namespace);
    return gtl;
  }

  // ─── Validation ──────────────────────────────────────────────────────────

  validate(): string[] {
    const errors: string[] = [];
    const allObjects = [...this.getComponents(), ...this.getSequences()];
    allObjects.forEach((obj) => {
      if (obj && typeof obj.validate === 'function') {
        const objErrors = obj.validate();
        if (objErrors && objErrors.length > 0) {
          objErrors.forEach((error: string) => {
            errors.push(`${obj.getIdentifier()}: ${error}`);
          });
        }
      }
    });
    return errors;
  }

  toString(): string {
    let indent = '';
    let value = `${indent}SBOLDocument(baseIRI: ${this.baseIRI})`;
    value += SBOL3Util.formatObjectArray(this.getComponents(), 'components', indent);
    value += SBOL3Util.formatObjectArray(this.getSequences(), 'sequences', indent);
    return value;
  }
}
