import { differenceInMonths, parse } from "date-fns";
import {
  filter,
  groupBy,
  pipe,
  prop,
  reduce,
  startsWith,
  toLower,
  uniqBy,
  values,
} from "lodash/fp";

import { not } from "../functions/functions";

const liceLabels = {
  "LiceC +10":
    "Licenciement plus de 10 salariés (entreprise de moins de 50 salariés)",
  "LiceC -10": "Licenciement moins de 10 salariés (2 à 9 salariés)",
};

export const getType = prop("type");
export const getTypeLabel = (rupco) =>
  isLice(rupco) ? liceLabels[getType(rupco)] : getType(rupco);
export const getSituationJuridique = prop("situation_juridique");
export const getEtat = prop("procedure.etat");
export const getNumero = prop("numero");
export const getDateEnregistrement = prop("date_enregistrement");
export const getDateJugement = prop("date_jugement");
export const getNombreRupture = (rupco) =>
  +prop("nombre_de_ruptures_de_contrats_en_fin_de_procedure", rupco) ||
  +prop("nombre_de_ruptures_de_contrats_en_debut_de_procedure", rupco) ||
  0;

const isRcc = pipe(getType, toLower, startsWith("rcc"));

const isLice = pipe(getType, toLower, startsWith("lice"));

const isPse = pipe(getType, toLower, startsWith("pse"));

const parseRupcoDate = (dateString) =>
  parse(dateString, "yyyy-MM-dd", new Date());

const isExpiredPse = pipe(
  prop("date_enregistrement"),
  parseRupcoDate,
  (date) => differenceInMonths(Date.now(), date),
  (difference) => difference > PSE_VALID_DURATION_IN_MONTH
);

const isInvalidLice = ({
  nombre_de_ruptures_de_contrats_en_fin_de_procedure,
  nombre_de_ruptures_de_contrats_en_debut_de_procedure,
}) =>
  nombre_de_ruptures_de_contrats_en_debut_de_procedure === 0 &&
  nombre_de_ruptures_de_contrats_en_fin_de_procedure === 0;

const removeRupcoDuplicates = uniqBy(
  ({ numero, siret }) => `${numero}-${siret}`
);

export const filterRcc = pipe(filter(isRcc), removeRupcoDuplicates);

export const filterLice = pipe(
  filter(isLice),
  filter(not(isInvalidLice)),
  removeRupcoDuplicates
);

export const filterPse = pipe(
  filter(isPse),
  filter(not(isExpiredPse)),
  removeRupcoDuplicates
);

const PSE_VALID_DURATION_IN_MONTH = 36;

export const groupDossier = pipe(groupBy("numero"), values);

export const computeTotalRuptures = reduce(
  (sum, rupco) =>
    sum +
    (rupco.nombre_de_ruptures_de_contrats_en_fin_de_procedure ||
      rupco.nombre_de_ruptures_de_contrats_en_debut_de_procedure)
)(0);
