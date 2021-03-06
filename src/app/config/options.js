/**
 * @Author William Pépin
 * @Desc Constante déterminant les options des composantes react des graphs. Pour la documentation des champs, voir https://visjs.github.io/vis-network/docs/network/.
 */
export default {
  layout: {
    hierarchical: false,
    randomSeed: 20,
  },
  nodes: {
    shape: "square",
    size: 40,
  },
  interaction: {
    dragNodes: false,
    zoomView: false,
  },
  physics: {
    enabled: false,
  },
  edges: {
    color: "#fff",
    width: 81,
    arrows: {
      to: false,
    },
  },
  height: "600px",
};
