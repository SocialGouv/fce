import { format, isAfter, parse } from "date-fns";
import {
  entries,
  fromPairs,
  groupBy,
  map,
  mapValues,
  pipe,
  reduce,
  reverse,
  sortBy,
  values,
} from "lodash/fp";

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

const accordTypes = [
  "epargne",
  "remuneration",
  "temps_travail",
  "egalite_pro",
  "emploi",
  "conditions_travail",
  "protection_sociale",
  "nouvelles_technologies",
  "classifications",
  "droit_syndical",
  "formation",
  "autres",
];

const accordsRecord = fromPairs(
  accordTypes.map((type) => [type, { count: 0, lastSignDate: null }])
);

const computeLastSignDate = (previous, candidate) =>
  !previous || isAfter(candidate, previous) ? candidate : previous;

const addAccordToRecord = (record, accord) =>
  pipe(
    entries,
    map(([key, { count, lastSignDate }]) => [
      key,
      {
        count: accord[key] > 0 ? count + 1 : count,
        lastSignDate:
          accord[key] > 0 && accord.dt_sign
            ? computeLastSignDate(
                lastSignDate,
                parse(accord.dt_sign, "yyyy-MM-dd", new Date())
              )
            : lastSignDate,
      },
    ]),
    fromPairs
  )(record);

export const groupAccordsByType = pipe(
  reduce((acc, accord) => addAccordToRecord(acc, accord), accordsRecord),
  mapValues(({ count, lastSignDate }) => ({
    count,
    lastSignDate: lastSignDate
      ? format(lastSignDate, "dd/MM/yyyy")
      : lastSignDate,
  }))
);
