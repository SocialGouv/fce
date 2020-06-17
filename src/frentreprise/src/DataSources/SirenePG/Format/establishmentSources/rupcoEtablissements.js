import { differenceInMonths, parseISO } from "date-fns";
import _get from "lodash.get";
import { getFormatedDate } from "../../Helpers";

const config = {
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

const TYPE_PSE = "PSE";
const TYPE_LICE = "Lice";
const TYPE_RCC = "RCC";

export default ({ rupcoEtablissements }) => ({
  pse: getPse(rupcoEtablissements),
  rcc: getRcc(rupcoEtablissements),
  lice: getLice(rupcoEtablissements),
});

const getPse = (rupcoEtablissements) =>
  getByType(rupcoEtablissements, TYPE_PSE);
const getRcc = (rupcoEtablissements) =>
  getByType(rupcoEtablissements, TYPE_RCC);
const getLice = (rupcoEtablissements) =>
  getByType(rupcoEtablissements, TYPE_LICE);

const getByType = (rupcoEtablissements, typeToKeep) => {
  const rupcoEtablissementByType = rupcoEtablissements.filter(({ type }) =>
    type.startsWith(typeToKeep)
  );

  return getRupcoDataForEstablishment(rupcoEtablissementByType);
};

const getRupcoDataForEstablishment = (rows) =>
  rows
    .map(
      ({
        date_enregistrement,
        type,
        numero,
        historique_si,
        rupcoProcedure,
        dataValues: {
          nombre_de_ruptures_de_contrats_en_debut_de_: nombre_de_ruptures_de_contrats_en_debut_de_procedure,
          nombre_de_ruptures_de_contrats_en_fin_de_pr: nombre_de_ruptures_de_contrats_en_fin_de_procedure,
        },
      }) => ({
        date_enregistrement: getFormatedDate(date_enregistrement),
        type,
        numero,
        etat: _get(rupcoProcedure, "etat"),
        nombre_de_ruptures:
          +nombre_de_ruptures_de_contrats_en_fin_de_procedure ||
          +nombre_de_ruptures_de_contrats_en_debut_de_procedure ||
          0,
        historique_si,
      })
    )
    .filter(
      (procedure) =>
        hasBrokenContracts(procedure) && hasPseValidDuration(procedure)
    )
    .map((procedure) => setProcedureState(setLiceTypeLabel(procedure)));

const hasValidProcedureDuration = (
  date,
  validDuration = _get(config, "pse.procedureDurationLimit")
) =>
  date
    ? differenceInMonths(new Date(), parseISO(date)) <= validDuration
    : false;

const hasBrokenContracts = ({ type = "", nombre_de_ruptures }) =>
  type === "LiceC -10" ? true : nombre_de_ruptures > 0;

const hasPseValidDuration = ({ type = "", date_enregistrement }) =>
  type.includes("PSE") ? hasValidProcedureDuration(date_enregistrement) : true;

const setLiceTypeLabel = (procedure) => {
  if (!_get(procedure, "type", "").includes("LiceC")) {
    return procedure;
  }

  return {
    ...procedure,
    type: _get(config, "lice.types")[procedure.type],
    rawType: procedure.type,
  };
};

const setProcedureState = (procedure) => {
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
