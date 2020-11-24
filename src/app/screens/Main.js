import React from "react";
import Maze from "../components/Maze";
import colors from "../config/colors";

export default function main() {
  return (
    <div style={style}>
      <h1>A* Algorithm</h1>
      <button>Start</button>
      <Maze x={25} y={25} algorithm="aStar" />
    </div>
  );
}
const style = {
  background: colors.primary,
};
