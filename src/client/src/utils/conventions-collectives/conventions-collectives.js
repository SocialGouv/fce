import {
  filter,
  groupBy,
  isUndefined,
  mapValues,
  negate,
  pipe,
  prop,
  values,
} from "lodash/fp";

export const getLastConventionCollectives = pipe(
  groupBy("libelle.code"),
  mapValues(prop("[0]")),
  values
);

export const getConventionLibelle = prop("libelle.libelle");
export const getConventionCode = prop("libelle.code");

const isValidConvention = pipe(getConventionCode, negate(isUndefined));

export const removeInvalidConventions = filter(isValidConvention);
