import React, { Component } from "react";
import Node from "../class/Node";

export default class Labyrinth extends Component {
  constructor(props) {
    let [edge, nodes] = generateLabyrinth(props.x, props.y);
  }
  render() {
    return <div></div>;
  }
}
function generateLabyrinth(x = 20, y = 20) {
  let id = 0;
  let positionX = 0;
  let positionY = 0;
  let nodes = [];
  let edges = [];

  for (let currentX = 0; currentX < x; currentX++) {
    for (let currentY = 0; currentY < y; currentY++) {
      nodes.push(new Node(id));
    }
  }
}
