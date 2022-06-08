import { isNull, negate, pipe, prop } from "lodash/fp";

export const getNumeroRna = prop("id");

export const isAssociation = pipe(getNumeroRna, negate(isNull));
