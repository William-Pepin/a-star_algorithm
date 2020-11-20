import React from "react";
import Maze from "../components/Maze";
import appGraph from "../class/Graph";
import colors from "../config/colors";

const graph = new appGraph();

export default function main() {
  return (
    <div style={style}>
      <h1>A* Algorithm</h1>
      <button>Start</button>
      <Maze x={10} y={10} />
    </div>
  );
}
const style = {
  background: colors.primary,
};
