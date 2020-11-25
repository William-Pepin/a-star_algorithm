import PriorityQueue from "priorityqueuejs";

/**
 * @Author William Pépin
 * @Desc  Fonction permettant d'effectuer un parcours à l'aide de l'algorithme de A* dans un "weighed graph".
 * @param {*} graph Graph à effectuer le parcours
 * @param {*} start Noeud de début
 * @param {*} end Noeud de fin
 * @returns Un array contenant une stack avec le chemin de noeud et les noeuds visités par l'algorithme
 */
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
 * @Desc  Fonction permettant de préparer les noeuds avec le gScore et le hScore.
 * Le gScore est la distance entre le noeud de départ, initialement MAX_VALUE. 0 pour le noeud de départ.
 * le hScore est la distance calculé par la fonction heuristique. Dans ce contexte, c'est la distance dans l'environnement 2D
 * du noeud avec le noeud de fin.
 * @param {Graph} graph graph de l'algorithme.
 * @param {Node} start Noeud de début
 * @param {Node} end Noeud de fin
 * @returns null
 */
function prepareDistance(graph, start, end) {
  graph.nodes.forEach((node) => {
    node.gScore = Number.MAX_VALUE;
    node.hScore = heuristic(node, end);
  });
  start.gScore = 0;
}

/**
 * @Author William Pépin
 * @Desc  Fonction permettant de préparer la queue pour l'algorithme.
 * @returns une priority queue avec comme comparateur le gScore et le hScore. Sort en priorité la priorité la plus petite.
 */
function prepareQueue() {
  return new PriorityQueue((a, b) => {
    return b.gScore + b.hScore - (a.gScore + a.hScore);
  });
}

/**
 * @Author William Pépin
 * @Desc  Fonction permettant de calculer le hScore d'un noeud.
 * Calcul la distance entre le noeud et le noeud de fin selon la position X et Y des noeuds.
 * @param {Node} node Noeud à calculer
 * @param {Node} end Noeud de fin
 * @returns La distance entre le noeud et le noeud de fin.
 */
function heuristic(node, end) {
  return Math.hypot(node.x - end.x, node.y - end.y);
}
