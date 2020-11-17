import PriorityQueue from "priorityqueuejs";

export default function A_Star(graph, from, to) {
  let previousNodes = {};

  graph.nodes.forEach((node) => {
    node.gScore = Number.MAX_VALUE; // Valeur maximale des distances
    node.fScore = Number.MAX_VALUE;
  });

  from.gScore = 0; // Valeur 0 pour la première distance
  from.fScore = from.gScore + heuristic(from, to);

  let queue = new PriorityQueue((a, b) => {
    if (a.fScore > b.fScore) {
      return -1;
    }
    if (a.fScore < b.fScore) {
      return 1;
    }
    if (a.gScore > b.gScore) {
      return 1;
    }
    if (a.gScore < b.gScore) {
      return -1;
    }
    return 0;
  });

  queue.enq(from);

  // Pendant que la liste n'est pas vide
  while (!queue.isEmpty()) {
    let current = queue.deq(); // Sort l'élément prioritaire

    current.visited = true; // Visite l'élément

    let currentEdges = graph.findEdges(current);

    currentEdges.forEach((edge) => {
      let to = edge.from === current.id ? edge.to : edge.from;
      var newDistance = current.distance + edge.weight; // Nouvelle distance

      if (newDistance < graph.nodes[to].distance) {
        graph.nodes[to].distance = newDistance; // Si plus petit
        previousNodes[to] = current;
        queue.enq(graph.nodes[to]);
      }
    });
  }

  return buildStack(graph, previousNodes, to);
}

function buildStack(graph, previousNodes, to) {
  let toNode = graph.nodes[to]; // Noeud de fin
  let stack = [];

  stack.push(toNode);
  let previousNode = previousNodes[to];
  while (previousNode != null) {
    stack.push(previousNode);
    previousNode = previousNodes[previousNode.id];
  }
  return stack;
}

function heuristic(node1, node2) {
  return Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y);
}
