import { groupBy, mapValues, pipe, prop, values } from "lodash/fp";

export const getLastConventionCollectives = pipe(
  groupBy("libelle.code"),
  mapValues(prop("[0]")),
  values
);
