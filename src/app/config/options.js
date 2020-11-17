/**
 * @Author William Pépin
 * @Desc Constante déterminant les options des composantes react des graphs avec une hauteur de 600px. Pour la documentation des champs, voir https://visjs.github.io/vis-network/docs/network/.
 */
export default {
  layout: {
    hierarchical: false,
    randomSeed: 20,
  },
  nodes: {
    shape: "square",
    size: 25,
  },
  interaction: {
    zoomView: false,
  },
  physics: {
    enabled: false,
  },
  edges: {
    width: 40,
    color: "#9fd3c7",
    arrows: {
      to: false,
    },
  },
  height: "1200px",
};
