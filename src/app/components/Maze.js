import React, { Component } from "react";
import Graph from "react-graph-vis";
import options from "../config/options";

import generateMaze from "../functions/generateMaze";

export default class Maze extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: generateMaze(props.x, props.y),
    };
    console.log(this.state.maze);
  }

  render() {
    return (
      <Graph
        graph={{ nodes: this.state.maze.nodes, edges: this.state.maze.edges }}
        options={options}
      ></Graph>
    );
  }
}
