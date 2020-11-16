/**
 * @Author William Pépin 1634597
 * @Desc Classe définissant un arrête (edge) dans un graph. Il contient l'id des deux noeuds connectés
 */
export default class Edge {
  /**
   * @Author William Pépin
   * @Desc Constructeur permettant d'instancier les deux variables de l'arrête (edge)
   * @param {Node}from Noeud de départ
   * @param {Node}to Noeud de destination
   * @param {Int}weight Poid de l'arrête, 1 par défaut
   * @returns null
   */
  constructor(from, to, weight = 1) {
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
  getOtherNode(node) {
    return this.from === node ? this.to : this.to === node ? this.from : null;
  }
}
