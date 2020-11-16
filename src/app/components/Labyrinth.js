import React, { Component } from "react";
import Node from "../class/Node";
import Edge from "../class/Edge";
import Graph from "react-graph-vis";

export default class Labyrinth extends Component {
  constructor(props) {
    super(props);
    [this.edges, this.nodes] = generateLabyrinth(props.x, props.y);
  }
  render() {
    return (
      <div>
        <Graph graph={{ nodes: this.nodes, edges: this.edges }}></Graph>
      </div>
    );
  }
}

function generateLabyrinth(x = 20, y = 20) {
  let nodes = generateNodes(x, y);
  let edges = generateEdges(nodes);
  nodes = [].concat(...nodes);
  return [edges, nodes];
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

  for (let x = 0; x < nodes.length - 1; x++) {
    for (let y = 0; y < nodes[0].length - 1; y++) {
      edges.push(new Edge(nodes[x][y].id, nodes[x][y + 1].id));
      edges.push(new Edge(nodes[x][y].id, nodes[x + 1][y].id));
    }
  }
  return edges;
}
