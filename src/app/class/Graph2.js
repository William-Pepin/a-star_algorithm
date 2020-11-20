import { v4 as uuidv4 } from "uuid";
/**
 * @Author William Pépin 1634597
 * @Desc Classe définissant un graph, un graph est une structure de données contenant des noeuds et des arrêtes. Les arrêtes servent de connecteur entre les noeuds.
 */
export default class Graph {
  /**
   * @Author William Pépin
   * @Desc Constructeur du graph, permet d'instancier un nouveau graph avec un tableau de noeuds, d'arrêtes et le nombre de couleurs des noeuds.
   * @returns null
   */
  constructor() {
    this.nodes = [];
    this.edges = [];
  }

  addNode(x, y, data) {
    let node = new Node(uuidv4(), x, y, data);
    this.nodes.push(node);
    return node;
  }
  addEdge(from, to, weight = 100) {
    let edge = new Edge(from, to, weight);
    this.getNode(from).edges.push(edge);
    this.getNode(to).edges.push(edge);
    this.edges.push(edge);
    return edge;
  }

  getNode(id) {
    return this.nodes.find((node) => node.id === id);
  }
  getEdge(id) {
    return this.nodes.find((edge) => edge.id === id);
  }

  getNodes() {
    return this.nodes;
  }
  getEdges() {
    return this.edges;
  }
}

/**
 * @Author  William Pépin 1634597
 * @Desc Classe définissant la structure d'un noeud. Le noeud permet d'avoir un identifiant, des données et une couleur.
 */
class Node {
  /**
   * @Author William Pépin
   * @Desc Constructeur du noeud, permet d'instancier un nouveau noeud avec un un identifiant, des données et une couleur.
   * @param {Object-ID} id identifiant unique du noeud
   * @param {Int} x position sur l'axe des x du noeud dans l'univers 2D
   * @param {Int} y position sur l'axe des y du noeud dans l'univers 2D
   * @param {*} data données du noeud
   * @param {String} color couleur du noeud, par défaut la couleur primaire des configurations
   */
  constructor(id, x, y, color) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.edges = [];
    this.color = color;
  }
}

/**
 * @Author William Pépin 1634597
 * @Desc Classe définissant un arrête (edge) dans un graph. Il contient l'id des deux noeuds connectés
 */
class Edge {
  /**
   * @Author William Pépin
   * @Desc Constructeur permettant d'instancier les deux variables de l'arrête (edge)
   * @param {Int} from Noeud de départ
   * @param {Int} to Noeud de destination
   * @param {Int} weight Poid de l'arrête
   * @returns null
   */
  constructor(from, to, weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
  /**
   * @Author William Pépin
   * @Desc Fonction permettant de retrouver l'autre noeud de l'arrête
   * @param {Node} Node Voisin du noeud à retrouver
   * @returns {Node} le noeud rattaché à l'arrête, si le noeud fait partie de l'arrête
   * @returns {null} si le noeud ne fait pas partie de l'arrête
   */
  getOtherNode(id) {
    if (this.from === id) {
      return this.from;
    } else if (this.to === id) {
      return this.to;
    } else {
      return null;
    }
  }
}
