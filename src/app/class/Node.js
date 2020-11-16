import colors from "../config/colors";

/**
 * @Author  William Pépin 1634597
 * @Desc Classe définissant la structure d'un noeud. Le noeud permet d'avoir un identifiant, des données et une couleur.
 */
export default class Node {
  /**
   * @Author William Pépin
   * @Desc Constructeur du noeud, permet d'instancier un nouveau noeud avec un un identifiant, des données et une couleur.
   * @param {Integer} id identifiant unique du noeud
   * @param {Integer} x position sur l'axe des x du noeud dans l'univers 2D
   * @param {Integer} y position sur l'axe des y du noeud dans l'univers 2D
   * @param {*} data données du noeud
   * @param {String} color couleur du noeud, par défaut la couleur primaire des configurations
   */
  constructor(id, x, y, data, color = colors.primary) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.data = data;
    this.color = color;
  }
}
