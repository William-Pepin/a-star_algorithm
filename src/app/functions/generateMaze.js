import Graph from "../class/Graph2";
import colors from "../config/colors";
import { getRandomInteger } from "./functions";

export default function generateMaze(sizeX, sizeY) {
  let properties = {
    sizeX: sizeX,
    sizeY: sizeY,
  };
  let blankMaze = new Graph();
  blankMaze = generateNodes(blankMaze, properties);
  blankMaze = generateEdges(blankMaze, properties);
  console.log(blankMaze);
  let maze = generateWalls(blankMaze);
  return blankMaze;
}

function generateNodes(graph, properties) {
  for (let x = 0; x < properties.sizeX; x++) {
    for (let y = 0; y < properties.sizeY; y++) {
      graph.addNode(x * 100, y * 100, colors.primary);
    }
  }
  return graph;
}

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

function generateWalls(graph) {
  let current = graph.nodes[0];
  let maze = new Graph();
  current = maze.addNode(current.x, current.y, colors.primary);
  let stack = [];
  stack.push(current);

  let visited = {};
  visited[current.id] = true;

  while (stack.length !== 0) {
    let current = stack.pop();

    let unvisitedNeighbors = getUnvisitedNeighbors(visited, current);
    console.log(unvisitedNeighbors);

    if (unvisitedNeighbors.length !== 0) {
      stack.push(current);
      let rndNeighbor = graph.getNode(
        getRandomNeighbors(unvisitedNeighbors, current.id)
      );
      visited[rndNeighbor.id] = true;
      let newNode = graph.addNode(rndNeighbor.x, rndNeighbor.y, colors.primary);
      graph.addEdge(current.id, newNode.id);
      stack.push(rndNeighbor);
    }
  }
  return maze;
}
function getRandomNeighbors(edges, current) {
  return edges[getRandomInteger(0, edges.length)].getOtherNode(current.id);
}

function getUnvisitedNeighbors(visited, node) {
  console.log(node);
  return node.edges.filter(
    (edge) => visited[edge.getOtherNode(node.id)].id !== true
  );
}
