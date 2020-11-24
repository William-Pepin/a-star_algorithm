import React from "react";
import Maze from "../components/Maze";
import colors from "../config/colors";
import generateMaze from "../functions/generateMaze";

const maze = generateMaze(20, 20);

/**
 * @Author William Pépin
 * @Desc  Fonction permettant d'afficher les composantes React de l'application à l'écran.
 * @returns Les éléments HTML affichés à l'écran.
 */
export default function main() {
  return (
    <div style={style}>
      <div>
        <h1>A STAR</h1>
        <Maze maze={maze} algorithm="aStar" />
      </div>
      <div>
        <h1>DIJKSTRA</h1>
        <Maze maze={maze} algorithm="dijkstra" />
      </div>
      <div>
        <p>Légende</p>
        <p>Case blanche : Le labyrinthe</p>
        <p>Case grise : Les cases visité par l'algorithme</p>
        <p>Case bleu : Le chemin</p>
        <p>Case verte : Les murs du labyrinthe</p>
      </div>
      <div>
        <p>
          Ce projet permet de montrer la différence entre Dijkstra et A*. La
          différence entre A* et Dijkstra est fort simple: A* utilise un
          contexte de plus pour déterminer quel noeud devrait être priorisé lors
          de la recherche à l'aide d'une fonction heuristique. Dans ce contexte,
          A* utilise la distance dans l'environnement 2D entre les cases afin de
          savoir quelle case est plus proche (en vol d'oiseau) de la fin. Dans
          le contexte ci-dessous, la différence peut sembler minime, mais dans
          un contexte comme le réseau de routes d'un pays, A* est
          significativement plus rapide.
        </p>
      </div>
    </div>
  );
}
const style = {
  padding: "2rem",
  background: colors.primary,
  textAlign: "center",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
};
