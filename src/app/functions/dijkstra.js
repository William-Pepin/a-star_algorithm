import PriorityQueue from "priorityqueuejs";

/**
 * @Author William Pépin
 * @Desc  Fonction permettant d'effectuer un parcours à l'aide de l'algorithme de Dijkstra dans un "weighed graph".
 * @param {*} graph Graph à effectuer le parcours
 * @param {*} start Noeud de début
 * @param {*} end Noeud de fin
 * @returns Un array contenant une stack avec le chemin de noeud et les noeuds visités par l'algorithme
 */
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

/**
 * @Author William Pépin
 * @Desc  Fonction permettant de batir le chemin.
 * @param {Object} previousNodes objets avec l'id du noeud comme clé et le noeud précédent comme valeur.
 * @param {Node} end Noeud de fin
 * @returns Un array contenant une stack avec le chemin de noeud.
 */
function buildPath(previousNodes, end) {
  let stack = [];
  stack.push(end);
  let previousNode = previousNodes[end.id];
  while (previousNode != null) {
    stack.push(previousNode);
    previousNode = previousNodes[previousNode.id];
  }
  return stack;
}

/**
 * @Author William Pépin
 * @Desc  Fonction permettant de préparer l'objet des distances avant le parcours de l'algorithme.
 * @param {Graph} graph graph de l'algorithme.
 * @param {Node} start Noeud de début
 * @returns Un objet avec l'id des noeuds comme les clés et la distance comme valeur.
 * La distance est la valeur maximale d'un integer pour tout les noeuds sauf le premier. Le premier est de 0.
 */
function prepareDistance(graph, start) {
  let distances = {};
  graph.nodes.forEach((node) => {
    distances[node.id] = Number.MAX_VALUE;
  });
  distances[start.id] = 0;
  return distances;
}

/**
 * @Author William Pépin
 * @Desc  Fonction permettant de préparer la queue pour l'algorithme.
 * @returns une priority queue avec comme comparateur la priorité. Sort en priorité la priorité la plus petite.
 */
function prepareQueue() {
  return new PriorityQueue((a, b) => {
    return b.priority - a.priority;
  });
}
