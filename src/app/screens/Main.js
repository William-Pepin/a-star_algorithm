import React from "react";
import Labyrinth from "../components/Labyrinth";
import appGraph from "../class/graph";

const graph = new appGraph();

export default function main() {
  return (
    <div>
      <h1>A* Algorithm</h1>
      <button>Start</button>
      <Labyrinth />
    </div>
  );
}
