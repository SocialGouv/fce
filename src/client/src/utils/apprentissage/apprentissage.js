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

export const getSignCounts = pipe(
  map(prepareApprentissageDates),
  groupBy("anneeSignature"),
  omit(null),
  mapValues(size)
);

export const getBreakCounts = pipe(
  map(prepareApprentissageDates),
  groupBy("anneeRupture"),
  omit(null),
  mapValues(size)
);

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
