import React, { Component } from "react";
import Graph from "react-graph-vis";

import Node from "../class/Node";
import Edge from "../class/Edge";
import AppGraph from "../class/Graph";
import Options from "../config/options";
import { getRandomInteger } from "../functions/functions";
import A_Star from "../functions/AStar";

export default class Maze extends Component {
  constructor(props) {
    super(props);
    this.state = { graph: generateMaze(props.x, props.y) };
  }

  componentDidMount() {
    /**
     * @Date 2020-10-26
     * @Author William Pépin
     * @Desc Fonction à effectuer lorsque le composante React est bien instancié. Permet de commencer le parcour en profondeur.
     * @param null
     * @returns null
     */
    this.pathStack = A_Star(
      this.state.graph,
      this.state.graph.nodes[0],
      this.state.graph.nodes[this.state.graph.nodes.length - 1]
    );
    console.log(this.pathStack);
    //this.runID = setInterval(() => this.parcourGraphRun(), 500);
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

  render() {
    return (
      <div>
        <Graph
          options={Options}
          graph={{
            nodes: this.state.graph.nodes,
            edges: this.state.graph.edges,
          }}
        ></Graph>
      </div>
    );
  }
}

function generateMaze(x = 20, y = 20) {
  let nodes = generateNodes(x, y);
  let edges = generateEdges(nodes);
  nodes = [].concat(...nodes);

  let blankMaze = new AppGraph(nodes, edges);
  let maze = generateWalls(blankMaze);

  return maze;
}

function generateNodes(x, y) {
  let id = 0;
  let positionX = 0;
  let positionY = 0;
  let nodes = [];

  for (let currentX = 0; currentX < x; currentX++) {
    nodes[currentX] = [];
    for (let currentY = 0; currentY < y; currentY++) {
      nodes[currentX].push(new Node(id, positionX, positionY));
      id++;
      positionY += 100;
    }
    positionY = 0;
    positionX += 100;
  }
  return nodes;
}

function generateEdges(nodes) {
  let edges = [];

  for (let x = 0; x < nodes.length; x++) {
    for (let y = 0; y < nodes[0].length; y++) {
      y !== nodes[0].length - 1 &&
        edges.push(new Edge(nodes[x][y].id, nodes[x][y + 1].id));
      x !== nodes.length - 1 &&
        edges.push(new Edge(nodes[x][y].id, nodes[x + 1][y].id));
    }
  }
  return edges;
}

function generateWalls(graph) {
  let nodes = [];
  let edges = [];
  let current = graph.nodes[0];
  let stack = [];
  nodes.push(new Node(current.id, current.x, current.y));
  stack.push(current);

  graph.visited[current.id] = true;

  while (stack.length !== 0) {
    current = stack.pop();

    if (graph.hasUnvisitedNeighbors(current)) {
      stack.push(current);

      let unvisitedNeighbors = graph.findUnvisitedNeighbors(current);

      let randomNeighbor =
        unvisitedNeighbors[getRandomInteger(0, unvisitedNeighbors.length)];

      graph.visited[randomNeighbor.id] = true;
      nodes.push(
        new Node(randomNeighbor.id, randomNeighbor.x, randomNeighbor.y)
      );
      edges.push(new Edge(current.id, randomNeighbor.id));
      stack.push(randomNeighbor);
    }
  }

  return new AppGraph(nodes, edges);
}
