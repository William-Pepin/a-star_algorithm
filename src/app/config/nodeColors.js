import colors from "./colors";
/**
 * @Author William Pépin
 * @Desc Constante définissant les différentes couleurs des noeuds dans le labyrinthe
 */
export default {
  default: {
    background: colors.tile,
    border: colors.tile,
  },
  start: {
    background: colors.green,
    border: colors.green,
  },
  end: {
    background: colors.danger,
    border: colors.danger,
  },
  visited: {
    background: colors.lightGray,
    border: colors.lightGray,
  },
  path: {
    background: colors.blue,
    border: colors.blue,
  },
};
