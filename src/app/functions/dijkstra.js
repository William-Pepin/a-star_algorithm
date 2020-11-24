import PriorityQueue from "priorityqueuejs";
import colors from "../config/nodeColors";

export default function dijkstra(graph, start, end) {
  let distances = prepareDistance(graph, start);
  let visited = {};
  let previousNodes = {};
  let queue = prepareQueue();

  start.priority = 0;
  queue.enq(start);
  let current = start;
  while (!queue.isEmpty() && current.id !== end.id) {
    current = queue.deq();

    visited[current.id] = true;

    let unvisitedEdges = current.getUnvisitedEdges(visited);

    unvisitedEdges.forEach((edge) => {
      let toID = edge.getOtherNode(current.id);
      let distance = distances[current.id] + edge.weight;

      if (distance < distances[toID]) {
        distances[toID] = distance;
        previousNodes[toID] = current;
        graph.getNode(toID).priority = distance;
        queue.enq(graph.getNode(toID));
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

function prepareDistance(graph, start) {
  let distances = {};
  graph.nodes.forEach((node) => {
    distances[node.id] = Number.MAX_VALUE;
  });
  distances[start.id] = 0;
  return distances;
}
function prepareQueue() {
  return new PriorityQueue((a, b) => {
    return b.priority - a.priority;
  });
}
