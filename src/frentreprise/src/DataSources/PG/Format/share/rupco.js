import { differenceInMonths, parseISO } from "date-fns";
import _get from "lodash.get";

export const config = {
  pse: {
    procedureDurationLimit: 36, // months
  },
  lice: {
    types: {
      "LiceC -10": "Licenciement moins de 10 salariés (2 à 9 salariés)",
      "LiceC +10":
        "Licenciement plus de 10 salariés (entreprise de moins de 50 salariés)",
    },
  },
  historicDataDefaultState: "Non communiqué",
  historicDataStates: {
    cloture: "Clôturé",
    BilanTermine: "Bilan terminé",
  },
};

export const hasValidProcedureDuration = (
  date,
  validDuration = _get(config, "pse.procedureDurationLimit")
) =>
  date
    ? differenceInMonths(new Date(), parseISO(date)) <= validDuration
    : false;

export const hasBrokenContracts = ({ type = "", nombre_de_ruptures }) =>
  type === "LiceC -10" ? true : nombre_de_ruptures > 0;

export const hasPseValidDuration = ({ type = "", date_enregistrement }) =>
  type.includes("PSE") ? hasValidProcedureDuration(date_enregistrement) : true;

export const setLiceTypeLabel = (procedure) => {
  if (!_get(procedure, "type", "").includes("LiceC")) {
    return procedure;
  }

  return {
    ...procedure,
    type: _get(config, "lice.types")[procedure.type],
    rawType: procedure.type,
  };
};

export const setProcedureState = (procedure) => {
  if (procedure && !procedure.historique_si) {
    return procedure;
  }

  return {
    ...procedure,
    etat: Object.keys(_get(config, "historicDataStates")).includes(
      procedure.etat
    )
      ? _get(config, "historicDataStates")[procedure.etat]
      : _get(config, "historicDataDefaultState"),
  };
};
