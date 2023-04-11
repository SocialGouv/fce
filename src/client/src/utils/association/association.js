import { complement, defaultTo, isNil, pipe, prop } from "lodash/fp";

export const getNumeroRna = prop("rna");

export const isAssociation = pipe(
  defaultTo({}),
  getNumeroRna,
  complement(isNil)
);
