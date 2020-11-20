import PriorityQueue from "priorityqueuejs";

export default function A_Star(graph, from, end) {
  let openList = new PriorityQueue((a, b) => b.fScore - a.fScore);
  let finishedList = [];

  graph.nodes.forEach((node) => {
    node.gScore = Number.MAX_VALUE; // Valeur maximale des distances
    node.fScore = heuristic(node, end);
  });
  from.gScore = 0; // Valeur 0 pour la première distance
  from.fScore = from.gScore + heuristic(from, end);
  openList.enq(from);

  while (!openList.isEmpty()) {
    let current = openList.deq();
    current.visited = true;

    let currentEdges = graph.findEdges(current);
    console.log(currentEdges);
    currentEdges.forEach((edge) => {
      let to = edge.from === current.id ? edge.to : edge.from;
      console.log(to);

      if (to === end.id) {
        return finishedList;
      }
      if (graph.nodes[to].visited != true) {
        graph.nodes[to].gScore = current.gScore + edge.weight;
        graph.nodes[to].fScore = current.fScore + current.gScore;
        openList.enq(graph.node[to]);
      }
      finishedList.push(current);
    });
  }
}
function buildStack(previousNodes, to) {
  let stack = [];

  let previousNode = to;
  while (previousNode != null) {
    stack.push(previousNode);
    previousNode = previousNodes[previousNode.id];
  }
  return stack;
}

function heuristic(node1, node2) {
  return Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y);
}
