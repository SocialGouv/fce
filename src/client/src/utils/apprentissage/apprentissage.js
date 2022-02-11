import { getYear, parseISO } from "date-fns";
import {
  groupBy,
  map,
  mapValues,
  omit,
  pipe,
  prop,
  size,
  sum,
  values,
} from "lodash/fp";

const formatDate = pipe(parseISO, getYear);

const prepareApprentissageDates = (apprentissage) => ({
  ...apprentissage,
  anneeRupture:
    apprentissage.date_rupture && formatDate(apprentissage.date_rupture),
  anneeSignature: formatDate(apprentissage.date_debut),
});

const countByDateField = (date_field) =>
  pipe(
    map(prepareApprentissageDates),
    groupBy(date_field),
    omit([null, ""]),
    mapValues(size)
  );

export const getSignCounts = countByDateField("anneeSignature");
export const getBreakCounts = countByDateField("anneeRupture");

export const formatApprentissage = pipe(
  groupBy("siret"),
  mapValues((apprentissages) => ({
    etablissement: apprentissages[0]?.etablissement,
    rompus: getBreakCounts(apprentissages),
    signes: getSignCounts(apprentissages),
  })),
  values
);

export const getEstablishmentSignedCount = pipe(prop("signes"), values, sum);

export const getSignedTotal = pipe(map(getEstablishmentSignedCount), sum);

export const getSignesTotalFromSignes = pipe(values, sum);
