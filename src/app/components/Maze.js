import React, { Component } from "react";
import update from "immutability-helper";
import { v4 as uuidv4 } from "uuid";

import Graph from "react-graph-vis";
import options from "../config/options";
import aStar from "../functions/aStar";
import dijkstra from "../functions/dijkstra";
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
    this.maze = generateMaze(props.x, props.y);
    this.state = {
      nodes: this.maze.nodes,
      edges: this.maze.edges,
    };
    this.algorithm = this.props.algorithm;
  }

  /**
   * @Date 2020-10-26
   * @Author William Pépin
   * @Desc Fonction à effectuer lorsque le composante React est bien instancié. Permet de commencer l'algorithme déterminé.
   * @param null
   * @returns null
   */
  componentDidMount() {
    if (this.algorithm === "aStar") {
      [this.path, this.visited] = dijkstra(
        this.maze,
        this.maze.start,
        this.maze.end
      );
      //} else if (this.algorithm === "dijkstra") {
      //  this.path = dijkstra(this.maze, this.start, this.end);
      //} else if (this.algorithm === "depth") {
      //  this.path = depth(this.state.maze);
      //} else if (this.algorithm === "breadth") {
      //  this.path = breadth(this.state.maze);
    }
    console.log(this.path);
    this.path && (this.runID = setInterval(() => this.travel(), 100));
  }

  /**
   * @Date 2020-10-26
   * @Author William Pépin
   * @Desc Fonction à effectuer lorsque le composante React arrête d'être affiché. Permet d'arrêter l'interval.
   * @param null
   * @returns null
   */
  componentWillUnmount() {
    clearInterval(this.runID);
  }

  travel() {
    // si la length du stack n'égale pas 0
    if (this.path.length !== 0) {
      // sort le premier élément
      let current = this.path.pop();

      current.color = "green";
      current.edges.forEach((edge) => {
        edge.color = "green";
      });

      this.forceUpdate();
    } else {
      clearInterval(this.runID);
    }
  }

  /**
   * @Author William Pépin 1634597
   * @Desc Fonction permettant d'afficher à l'écran, la fonction s'active après chaque modification de l'état
   * @returns Un graph React-Graph-Vis avec comme propriétés le labyrinthe
   */
  render() {
    return (
      <Graph
        key={uuidv4()}
        graph={{ nodes: this.state.nodes, edges: this.state.edges }}
        options={options}
      />
    );
  }
}
