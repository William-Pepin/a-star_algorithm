import React from "react";
import Maze from "../components/Maze";
import appGraph from "../class/Graph";

const graph = new appGraph();

export default function main() {
  return (
    <div>
      <h1>A* Algorithm</h1>
      <button>Start</button>
      <Maze x={50} y={50} />
    </div>
  );
}
