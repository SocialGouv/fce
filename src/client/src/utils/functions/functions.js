/**
 * Negates a boolean function
 */
export const not =
  (booleanFunction) =>
  (...args) =>
    !booleanFunction(...args);
