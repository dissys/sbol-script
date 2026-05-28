import GraphUtil from '../otol/GraphUtil';
import SBOLNamespaces from './SBOLNamespaces';

type IRI = string;

export default class SBOL3Util extends GraphUtil {
    static loadObjectsByType<T>(store: any, typeName: string, loadFunction: (store: any, identifier: string) => T): T[] {
        return GraphUtil.loadByProperty(
            store,
            SBOLNamespaces.RDF('type'),
            SBOLNamespaces.SBOL(typeName),
            loadFunction
        );
    }

    static loadObjectsByTypeIRI<T>(store: any, typeIRI: string, loadFunction: (store: any, identifier: string) => T): T[] {
        return GraphUtil.loadByProperty(
            store,
            SBOLNamespaces.RDF('type'),
            typeIRI,
            loadFunction
        );
    }
}
