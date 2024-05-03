import { format, parse, parseISO } from "date-fns";
import { isEmpty, map, maxBy, negate, pipe, prop, trim } from "lodash/fp";

import Config from "../../services/Config";

export const INTERACTION_TYPE = {
  CONTROL: "control",
  VISIT: "visit",
};

const interactionsSources = {
  interactions_pole_3e: "EOS",
  interactions_pole_3e_src: "MDF",
  interactions_pole_c: "SORA",
  interactions_pole_t: "Wiki'T",
};

export const getInteractionSource = (pole) => {
  return interactionsSources?.[pole];
};

const FRENCH_DATE_FORMAT = "dd/MM/yyyy";
const INTERACTIONS_DATE_FORMAT = "yyyy-MM-dd";

const frenchDateToUSDate = pipe(
  (dateString) => {
    if (typeof dateString !== "string") {
      throw new TypeError(
        `Expected a string, but received a ${typeof dateString}`
      );
    }
    // Parse the French date string into a Date object
    return parse(dateString, FRENCH_DATE_FORMAT, new Date());
  },
  // Format the Date object into a US date string
  (date) => format(date, INTERACTIONS_DATE_FORMAT)
);
const ISODateToUSDate = pipe(
  (dateString) => {
    if (typeof dateString !== "string") {
      throw new TypeError(
        `Expected a string, but received a ${typeof dateString}`
      );
    }
    // Parse the ISO date string into a Date object
    return parseISO(dateString);
  },
  (date) => format(date, INTERACTIONS_DATE_FORMAT)
);
const formatInteractionDate = (date) => {
  if (!date) return "";
  try {
    return frenchDateToUSDate(date);
  } catch (err) {
    return ISODateToUSDate(date);
  }
};

const normalizeInteractionT = ({
  siret,
  realise_pour,
  date,
  intervenant,
  action_sur,
  etablissement,
}) => ({
  agent: intervenant?.trim(),
  date: formatInteractionDate(date),
  etablissement: etablissement || {},
  note: action_sur?.trim(),
  pole: "T",
  siret,
  type: INTERACTION_TYPE.CONTROL,
  unite: realise_pour?.trim(),
});

export const normalizeInteractionsT = map(normalizeInteractionT);

const normalizeInteraction3E = ({
  type_suivi,
  date_visite,
  inspecteurs,
  filieres,
  suivi_eti,
  region,
  siret,
  etablissement,
}) => ({
  agent: inspecteurs?.trim(),
  date: formatInteractionDate(date_visite),
  etablissement: etablissement || {},
  filieres,
  pole: "C",
  siret,
  suivi_eti,
  type: type_suivi ?? INTERACTION_TYPE.VISIT,
  unite: `Service Entreprise ${region?.trim() || ""}`,
});

export const normalizeInteractions3E = map(normalizeInteraction3E);

const normalizeInteraction3ESRC = ({
  date,
  libelle_region,
  siret,
  nature_controle,
  cible_controle,
  clos,
  type_controle,
  etablissement,
}) => ({
  agent: "",
  cible: cible_controle,
  clos: clos === "Oui",
  date: formatInteractionDate(date),
  etablissement: etablissement || {},
  motif: type_controle,
  nature: nature_controle,
  pole: "3E_SRC",
  siret,
  type: INTERACTION_TYPE.CONTROL,
  unite: `SRC ${libelle_region?.trim() || ""}`,
});

export const normalizeInteractions3ESRC = map(normalizeInteraction3ESRC);

const normalizeInteractionC = ({ unite, siret, date, etablissement }) => ({
  agent: "",
  date: formatInteractionDate(date),
  etablissement: etablissement || {},
  pole: "C",
  siret,
  type: INTERACTION_TYPE.CONTROL,
  unite,
});

export const normalizeInteractionsC = map(normalizeInteractionC);

export const getLatestInteraction = pipe(maxBy("date"), (value) => value || {});

export const getControlLabel = (tableName) =>
  ({
    interactions_pole_3e: "3E_SEER",
    interactions_pole_3e_src: "3E_SRC",
    interactions_pole_c: "C",
    interactions_pole_t: "T",
  }[tableName]);

export const getMotifLabel = (motif) => Config.get("poleSrcControlType")[motif];

export const getFilieres = pipe(prop("filieres"), trim);

export const hasFilieres = pipe(getFilieres, negate(isEmpty));

export const getEti = pipe(prop("suivi_eti"));

export const isEti = pipe(getEti, negate(isEmpty));
