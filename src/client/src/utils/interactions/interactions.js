import { format, parse } from "date-fns/fp";
import { map, pipe } from "lodash/fp";

export const INTERACTION_TYPE = {
  CONTROL: "control",
  VISIT: "visit",
};

const frenchDateToUSDate = pipe(
  parse(new Date(), "dd/MM/yyyy"),
  format("yyyy-MM-dd")
);

const normalizeInteractionT = ({
  siret,
  realise_pour,
  date,
  intervenant,
  action_sur,
}) => ({
  agent: intervenant?.trim(),
  date: frenchDateToUSDate(date),
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
  region,
  siret,
}) => ({
  agent: inspecteurs?.trim(),
  date: frenchDateToUSDate(date_visite),
  pole: "C",
  siret,
  type: type_suivi ?? INTERACTION_TYPE.VISIT,
  unite: `Service Entreprise ${region?.trim() || ""}`,
});

export const normalizeInteractions3E = map(normalizeInteraction3E);

const normalizeInteraction3ESRC = ({ date, libelle_region, siret }) => ({
  agent: "",
  date: frenchDateToUSDate(date),
  pole: "3E_SRC",
  siret,
  type: INTERACTION_TYPE.CONTROL,
  unite: `SRC ${libelle_region?.trim() || ""}`,
});

export const normalizeInteractions3ESRC = map(normalizeInteraction3ESRC);

const normalizeInteractionC = ({ unite, siret, date }) => ({
  agent: "",
  date: date,
  pole: "C",
  siret,
  type: INTERACTION_TYPE.CONTROL,
  unite,
});

export const normalizeInteractionsC = map(normalizeInteractionC);
