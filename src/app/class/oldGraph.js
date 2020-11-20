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
    this.visited = {};
  }

  hasUnvisitedNeighbors(node) {
    let neighbors = this.findNeighbors(node);
    for (let index = 0; index < neighbors.length; index++) {
      const neighbor = neighbors[index];
      if (this.visited[neighbor.id] !== true) {
        return true;
      }
    }
    return false;
  }

  findEdges(node) {
    return this.edges.filter(
      (edge) => edge.from === node.id || edge.to === node.id
    );
  }

  findNeighbors(node) {
    let neighbors = [];
    this.findEdges(node).forEach((edge) => {
      let to = edge.from === node.id ? edge.to : edge.from;
      neighbors.push(this.nodes[to]);
    });
    return neighbors;
  }

  findUnvisitedNeighbors(node) {
    return this.findNeighbors(node).filter(
      (neighbor) => this.visited[neighbor.id] !== true
    );
  }

  resetVisited() {
    this.visited = {};
  }
}
