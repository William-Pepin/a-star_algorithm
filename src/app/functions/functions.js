/**
 * @Author W3SCHOOl
 * @Desc Fonction permettant d'obtenir un nombre aléatoire entre deux nombres donnés.
 * @param min nombre minimum
 * @param max nombre maximum
 * @returns une nombre aléatoire entre min et max.
 */
export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
