import PriorityQueue from "priorityqueuejs";
import colors from "../config/nodeColors";

export default function aStar(graph, start, end) {
  prepareDistance(graph, start, end);
  let visited = {};
  let previousNodes = {};
  let queue = prepareQueue();

  queue.enq(start);
  let current = start;
  while (!queue.isEmpty() && current.id !== end.id) {
    current = queue.deq();

    visited[current.id] = true;

    let unvisitedEdges = current.getUnvisitedEdges(visited);

    unvisitedEdges.forEach((edge) => {
      let to = edge.getOtherNode(current.id);
      to = graph.getNode(to);
      let distance = current.gScore + edge.weight;

      if (distance < to.gScore) {
        to.gScore = distance;
        previousNodes[to.id] = current;
        queue.enq(to);
      }
    });
  }
  return [buildPath(previousNodes, end), visited];
}

function buildPath(previousNodes, end) {
  console.log(end);
  let stack = [];

  stack.push(end);

  let previousNode = previousNodes[end.id];

  while (previousNode != null) {
    stack.push(previousNode);
    previousNode = previousNodes[previousNode.id];
  }
  return stack;
}

function prepareDistance(graph, start, end) {
  graph.nodes.forEach((node) => {
    node.gScore = Number.MAX_VALUE;
    node.hScore = heuristic(node, end);
  });
  start.gScore = 0;
}
function prepareQueue() {
  return new PriorityQueue((a, b) => {
    return b.gScore + b.hScore - (a.gScore + a.hScore);
  });
}

function heuristic(node, end) {
  return Math.hypot(node.x - end.x, node.y - end.y);
}
