import React, { Component } from "react";
import Graph from "react-graph-vis";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import aStar from "../functions/aStar";
import dijkstra from "../functions/dijkstra";

import options from "../config/options";
import colors from "../config/nodeColors";

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
    this.maze = _.cloneDeep(this.props.maze);
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
      [this.path, this.visited] = aStar(
        this.maze,
        this.maze.start,
        this.maze.end
      );
    } else if (this.algorithm === "dijkstra") {
      [this.path, this.visited] = dijkstra(
        this.maze,
        this.maze.start,
        this.maze.end
      );
    }

    this.path && (this.runID = setInterval(() => this.travel(), 100));
    this.showVisited();
    this.setColor();
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

  /**
   * @Date 2020-10-26
   * @Author William Pépin
   * @Desc Fonction permettant d'afficher le chemin à l'écran
   * @param null
   * @returns null
   */
  travel() {
    if (this.path.length !== 0) {
      let current = this.path.pop();

      current.color = colors.path;
      current.edges.forEach((edge) => {
        edge.color = colors.path.background;
      });
    } else {
      clearInterval(this.runID);
      this.setColor();
    }
    this.forceUpdate();
  }

  /**
   * @Date 2020-10-26
   * @Author William Pépin
   * @Desc Fonction permettant de mettre les couleurs de la case de début et la case de fin
   * @param null
   * @returns null
   */
  setColor() {
    this.maze.end.color = colors.end;
    this.maze.start.color = colors.start;
  }

  /**
   * @Date 2020-10-26
   * @Author William Pépin
   * @Desc Fonction permettant de mettre les couleurs des cases visités du labyrinthe par l'algorithme
   * @param null
   * @returns null
   */
  showVisited() {
    this.state.nodes.forEach((node) => {
      if (this.visited[node.id]) {
        node.color = colors.visited;
        node.edges.forEach((edge) => {
          edge.color = colors.visited.background;
        });
      }
    });
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
