import Graph from "../class/Graph";
import { getRandomInteger } from "./functions";

import nodeColors from "../config/nodeColors";

/**
 * @Author William Pépin 1634597
 * @Desc Fonction permettant la génération d'un nouveau labyrinthe aléatoire
 * la fonction s'occupe de créer un graph avec tout les noeuds reliés sous forme de carré.
 * Ensuite il utilise un parcours en profondeur pour créer un deuxième graph qui fera office de labyrinthe.
 * @param {int} sizeX Nombre de carrés sur l'axe des X
 * @param {int} sizeY Nombre de carrés sur l'axe des Y
 * @returns un graph avec un entrée et une sortie
 */
export default function generateMaze(sizeX, sizeY) {
  let properties = {
    sizeX: sizeX,
    sizeY: sizeY,
  };
  let blankMaze = new Graph();
  blankMaze = generateNodes(blankMaze, properties);
  blankMaze = generateEdges(blankMaze, properties);
  let maze = generateWalls(blankMaze, properties);
  return maze;
}
/**
 * @Author William Pépin
 * @Desc Permet de générer les noeuds de départ pour le labyrinthe vide.
 * @param {Graph} graph graph vide
 * @param {Object} properties objet avec les propriétés sizeX et sizeY afin de déterminer la grosseur du labyrinthe
 * @returns un graph avec les noeuds sous forme de carrés sizeX sur sizeY.
 */
function generateNodes(graph, properties) {
  for (let x = 0; x < properties.sizeX; x++) {
    for (let y = 0; y < properties.sizeY; y++) {
      graph.addNode(x * 100, y * 100, nodeColors.default);
    }
  }
  return graph;
}
/**
 * @Author William Pépin
 * @Desc Permet de générer les arrêtes de départ pour le labyrinthe vide
 * @param {Graph} graph graph avec les noeuds sous forme de carré
 * @param {Object} properties objet avec les propriétés sizeX et sizeY afin de déterminer la grosseur du labyrinthe
 * @returns Un graph sous forme de carré avec les noeuds attachés ensembles.
 */
function generateEdges(graph, properties) {
  for (let i = 0; i < graph.nodes.length; i++) {
    let from = graph.nodes[i];

    let to = graph.nodes[i + 1];
    if (to && (i + 1) % properties.sizeY !== 0) {
      graph.addEdge(from.id, to.id);
    }

    to = graph.nodes[i + properties.sizeY];
    to && graph.addEdge(from.id, to.id);
  }
  return graph;
}
/**
 * @Author William Pépin
 * @Desc Permet de générer les murs du labyrinthe.
 * La fonction procède avec un parcours en profondeur du graph et choisi aléatoirement son chemin. Lorsqu'il ne peut plus avancer,
 * il retourne par en arrière et choisi aléatoirement un chemin tant qu'il peut avancer.
 * @param {Graph} graph graph sous forme de carré avec les arrêtes rattachés.
 * @param {Object} properties objet avec les propriétés sizeX et sizeY afin de déterminer la grosseur du labyrinthe
 * @returns un labyrinthe.
 */
function generateWalls(graph, properties) {
  let current = graph.nodes[0];
  let maze = new Graph();
  maze.addNode(current.x, current.y, nodeColors.start, current.id);
  let stack = [];
  stack.push(current);

  let visited = {};
  visited[current.id] = true;

  while (stack.length !== 0) {
    let current = stack.pop();

    let unvisitedEdges = getUnvisitedEdges(visited, current);

    if (unvisitedEdges.length !== 0) {
      stack.push(current);
      let rndNeighborID = getRandomNeighborID(unvisitedEdges, current);
      let rndNeighbor = graph.getNode(rndNeighborID);
      visited[rndNeighbor.id] = true;
      if (
        rndNeighbor.x === properties.sizeX * 100 - 100 &&
        rndNeighbor.y === properties.sizeY * 100 - 100
      ) {
        maze.addNode(
          rndNeighbor.x,
          rndNeighbor.y,
          nodeColors.end,
          rndNeighbor.id
        );
      } else {
        maze.addNode(
          rndNeighbor.x,
          rndNeighbor.y,
          nodeColors.default,
          rndNeighbor.id
        );
      }
      maze.addEdge(current.id, rndNeighbor.id);
      stack.push(rndNeighbor);
    }
  }
  return maze;
}
/**
 * @Author William Pépin
 * @Desc Fonction permettant de retrouver un voisin aléatoire du noeud
 * @param {edge[]} edges Arrête du noeud non visités.
 * @param {Node} node noeud à vérifier
 * @returns l'ID du noeud voisin aléatoirement choisi.
 */
function getRandomNeighborID(edges, node) {
  return edges[getRandomInteger(0, edges.length)].getOtherNode(node.id);
}
/**
 * @Author William Pépin
 * @Desc Fonction permettant de retrouver toutes les arrêtes non visités.
 * @param {Object} visited objet avec les noeuds visités
 * @param {Node} node noeud à vérifier
 * @returns toutes les arrêtes non visités d'un noeud, undefined si aucun n'est retrouvé.
 */
function getUnvisitedEdges(visited, node) {
  return node.edges.filter((edge) => {
    return visited[edge.getOtherNode(node.id)] !== true;
  });
}
