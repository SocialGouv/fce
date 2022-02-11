import { groupBy, map, pipe, reduce, reverse, sortBy, values } from "lodash/fp";

const getTotalAccordForEtablissement = reduce((acc, accord) => ({
  etablissement: accord.etablissement,
  lastSignatureDate:
    acc.lastSignatureDate && acc.lastSignatureDate > accord.dt_sign
      ? acc.lastSignatureDate
      : accord.dt_sign,
  siret: accord.siret,
  total: acc.total + 1,
}))({ total: 0 });

export const formatAccords = pipe(
  groupBy("siret"),
  values,
  map(getTotalAccordForEtablissement),
  sortBy("lastSignatureDate"),
  reverse
);
