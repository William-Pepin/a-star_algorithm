import React, { Component } from "react";
import Graph from "react-graph-vis";
import options from "../config/options";

import generateMaze from "../functions/generateMaze";

/**
 * @Author William Pépin 1634597
 * @Desc Classe définissant la composante React du labyrinthe.
 */
export default class Maze extends Component {
  /**
   * @Author William Pépin
   * @Desc Constructeur du labyrinthe, permet d'instancier un nouveau labyrinthe aléatoire selon la grosseur X et Y donné par les propriétés.
   * @param {Object} props Propriétés React passé par le parent.
   * @returns null
   */
  constructor(props) {
    super(props);
    this.state = {
      maze: generateMaze(props.x, props.y),
    };
  }

  /**
   * @Author William Pépin 1634597
   * @Desc Fonction permettant d'afficher à l'écran, la fonction s'active après chaque modification de l'état
   * @returns Un graph React-Graph-Vis avec comme propriétés le labyrinthe
   */
  render() {
    return (
      <Graph
        graph={{ nodes: this.state.maze.nodes, edges: this.state.maze.edges }}
        options={options}
      ></Graph>
    );
  }
}
