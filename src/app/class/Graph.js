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
  /**
   * @Author William Pépin
   * @Desc Permet d'ajouter un noeud dans le graph.
   * @param {Int} x position en X du noeud
   * @param {Int} y position en Y du noeud
   * @param {Object} data donnée du noeud (dans ce contexte c'est la couleur)
   * @param {ObjectID} id Identifiant unique du noeud
   * @returns Le noeud nouvellement créés
   */
  addNode(x, y, data, id = uuidv4()) {
    let index = this.nodes.length;
    let node = new Node(id, index, x, y, data);
    this.nodes.push(node);
    return node;
  }
  /**
   * @Author William Pépin
   * @Desc Permet d'ajouter un arrête dans le graph.
   * @param {Int} from Noeud de départ.
   * @param {Int} to Noeud de fin.
   * @param {Int} weight poid de l'arrête, par défaut 100.
   * @param {ObjectID} id Identifiant unique de l'arrête
   * @returns L'arrête nouvellement créés
   */
  addEdge(from, to, weight = 100, id = uuidv4()) {
    let edge = new Edge(id, from, to, weight);
    this.getNode(from).edges.push(edge);
    this.getNode(to).edges.push(edge);
    this.edges.push(edge);
    return edge;
  }
  /**
   * @Author William Pépin
   * @Desc Permet de retrouver un noeud dans le graph
   * @param {ObjectID} id Identifiant unique du noeud
   * @returns le noeud retrouvé, undefined si aucun noeud est retrouvé
   */
  getNode(id) {
    return this.nodes.find((node) => node.id === id);
  }
  /**
   * @Author William Pépin
   * @Desc Permet de retrouver un arrête dans le graph
   * @param {ObjectID} id Identifiant unique de l'arrête
   * @returns l'arrête retrouvé, undefined si aucun arrête est retrouvé
   */
  getEdge(id) {
    return this.nodes.find((edge) => edge.id === id);
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
   * @param {Int-ID} index index du noeud dans le tableau de noeuds
   * @param {Int} x position sur l'axe des x du noeud dans l'univers 2D
   * @param {Int} y position sur l'axe des y du noeud dans l'univers 2D
   * @param {Object} data Données du noeud (dans ce contexte c'est la couleur)
   */
  constructor(id, index, x, y, data) {
    this.id = id;
    this.index = index;
    this.x = x;
    this.y = y;
    this.edges = [];
    this.color = data;
  }

  /**
   * @Author William Pépin
   * @Desc Fonction permettant de retrouver toutes les arrêtes non visités.
   * @param {Object} visited objet avec les noeuds visités
   * @param {Node} node noeud à vérifier
   * @returns toutes les arrêtes non visités d'un noeud, undefined si aucun n'est retrouvé.
   */
  getUnvisitedEdges(visited) {
    return this.edges.filter((edge) => {
      return visited[edge.getOtherNode(this.id)] !== true;
    });
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
  constructor(id, from, to, weight) {
    this.id = id;
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
      return this.to;
    } else if (this.to === id) {
      return this.from;
    } else {
      return null;
    }
  }
}
