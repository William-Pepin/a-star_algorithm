/**
 * @Author William Pépin 1634597
 * @Desc Classe définissant un graph, un graph est une structure de données contenant des noeuds et des arrêtes. Les arrêtes servent de connecteur entre les noeuds.
 */
export default class Graph {
  /**
   * @Author William Pépin
   * @Desc Constructeur du graph, permet d'instancier un nouveau graph avec un tableau de noeuds, d'arrêtes et le nombre de couleurs des noeuds.
   * @param {nodes[]} nodes Tableau de noeuds
   * @param {edges[]} edges Tableau de edges
   * @returns null
   */
  constructor(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
  }
}
