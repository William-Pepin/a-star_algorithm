import Graph from "../class/Graph2";
import colors from "../config/colors";
import { getRandomInteger } from "./functions";

const defaultColor = {
  background: colors.tile,
  border: colors.tile,
};

export default function generateMaze(sizeX, sizeY) {
  let properties = {
    sizeX: sizeX,
    sizeY: sizeY,
  };
  let blankMaze = new Graph();
  blankMaze = generateNodes(blankMaze, properties);
  blankMaze = generateEdges(blankMaze, properties);
  let maze = generateWalls(blankMaze);
  return maze;
}

function generateNodes(graph, properties) {
  for (let x = 0; x < properties.sizeX; x++) {
    for (let y = 0; y < properties.sizeY; y++) {
      graph.addNode(x * 100, y * 100, defaultColor);
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
  maze.addNode(current.x, current.y, defaultColor, current.id);
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
      maze.addNode(rndNeighbor.x, rndNeighbor.y, defaultColor, rndNeighbor.id);
      maze.addEdge(current.id, rndNeighbor.id);
      stack.push(rndNeighbor);
    }
  }
  return maze;
}
function getRandomNeighborID(edges, current) {
  return edges[getRandomInteger(0, edges.length)].getOtherNode(current.id);
}

function getUnvisitedEdges(visited, node) {
  return node.edges.filter((edge) => {
    return visited[edge.getOtherNode(node.id)] !== true;
  });
}
