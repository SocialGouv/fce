import { parse, isValid, format, differenceInMonths, parseISO } from "date-fns";
import _get from "lodash.get";
import config from "config";

export const getFormatedDate = (date, outputFormat = "yyyy-MM-dd") => {
  if (!date) {
    return null;
  }

  date = date.trim();

  const datesFormats = [
    "yyyy-MM-dd",
    "yyyy/MM/dd",
    "dd/MM/yyyy",
    "ddMMMyyyy",
    "dd/MM/yy",
    "M/d/yy",
  ];

  for (const dateFormat of datesFormats) {
    const parsedDate = parse(date, dateFormat, new Date());

    if (isValid(parsedDate)) {
      return format(parsedDate, outputFormat);
    }
  }

  return null;
};

const hasValidProcedureDuration = (
  date,
  validDuration = config.get("rupco.pse.procedureDurationLimit")
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
    type: config.get("rupco.lice.types")[procedure.type],
    rawType: procedure.type,
  };
};

const setProcedureState = (procedure) => {
  if (procedure && !procedure.historique_si) {
    return procedure;
  }

  return {
    ...procedure,
    etat: Object.keys(config.get("rupco.historicDataStates")).includes(
      procedure.etat
    )
      ? config.get("rupco.historicDataStates")[procedure.etat]
      : config.get("rupco.historicDataDefaultState"),
  };
};

export const getRupcoDataForEstablishment = (rows) =>
  rows
    .map(
      ({
        date_enregistrement,
        type,
        numero,
        etat,
        nombre_de_ruptures_de_contrats_en_debut_de_procedure,
        nombre_de_ruptures_de_contrats_en_fin_de_procedure,
        historique_si,
      }) => ({
        date_enregistrement: getFormatedDate(date_enregistrement),
        type,
        numero,
        etat,
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

export const getRupcoDataForEnterprise = (rows) => {
  const rupco = rows.reduce(
    (
      rupcoList,
      {
        date_enregistrement,
        type,
        numero,
        etat,
        situation_juridique,
        date_jugement,
        siret,
        nombre_de_ruptures_de_contrats_en_debut_de_procedure,
        nombre_de_ruptures_de_contrats_en_fin_de_procedure,
        historique_si,
      }
    ) => {
      if (!rupcoList[numero]) {
        rupcoList[numero] = {
          date_enregistrement: getFormatedDate(date_enregistrement),
          type,
          numero,
          etat,
          situation_juridique,
          date_jugement: getFormatedDate(date_jugement),
          nombre_de_ruptures: 0,
          historique_si,
          etablissements: [],
        };
      }

      const nbRupturesEtablissement =
        +nombre_de_ruptures_de_contrats_en_fin_de_procedure ||
        +nombre_de_ruptures_de_contrats_en_debut_de_procedure ||
        0;

      if (type === "LiceC -10" || nbRupturesEtablissement > 0) {
        rupcoList[numero].nombre_de_ruptures += nbRupturesEtablissement;
        rupcoList[numero].etablissements.push({
          siret,
          nombre_de_ruptures: nbRupturesEtablissement,
        });
      }

      return rupcoList;
    },
    {}
  );

  return Object.values(rupco)
    .filter(
      (procedure) =>
        hasBrokenContracts(procedure) && hasPseValidDuration(procedure)
    )
    .map((procedure) => setProcedureState(setLiceTypeLabel(procedure)));
};
