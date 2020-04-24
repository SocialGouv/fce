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
  validDuration = config.rupco.pse.procedureDurationLimit
) =>
  date
    ? differenceInMonths(new Date(), parseISO(date)) <= validDuration
    : false;

const proceduresWithBrokenContracts = ({ nombre_de_ruptures }) =>
  nombre_de_ruptures > 0;

const pseWithValidDuration = ({ type, date_enregistrement }) =>
  type === "PSE" ? hasValidProcedureDuration(date_enregistrement) : true;

const setLiceTypeLabel = (procedure) => {
  if (!_get(procedure, "type", "").includes("LiceC")) {
    return procedure;
  }

  return {
    ...procedure,
    type: config.rupco.lice.types[procedure.type],
    rawType: procedure.type,
  };
};

const setProcedureState = (procedure) => {
  if (procedure.historique_si && !procedure.historique_si) {
    return procedure;
  }

  return {
    ...procedure,
    etat: Object.keys(config.rupco.historicDataStates).includes(procedure.type)
      ? config.rupco.historicDataStates[procedure.type]
      : config.rupco.historicDataDefaultState,
  };
};

export const getRupcoDataForEstablishment = (rows) =>
  rows
    .map(
      ({
        siret: currentSiret,
        date_enregistrement,
        type,
        numero,
        etat,
        nombre_de_ruptures_de_contrats_en_debut_de_procedure,
        nombre_de_ruptures_de_contrats_en_fin_de_procedure,
        historique_si,
        etablissements,
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
        autres_etablissements:
          etablissements &&
          etablissements.split(",").filter((siret) => siret !== currentSiret),
      })
    )
    .filter(proceduresWithBrokenContracts)
    .filter(pseWithValidDuration)
    .map(setProcedureState)
    .map(setLiceTypeLabel);

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

      rupcoList[numero].nombre_de_ruptures += nbRupturesEtablissement;
      rupcoList[numero].etablissements.push({
        siret,
        nombre_de_ruptures: nbRupturesEtablissement,
      });

      return rupcoList;
    },
    {}
  );

  return Object.values(rupco)
    .filter(proceduresWithBrokenContracts)
    .filter(pseWithValidDuration)
    .map(setProcedureState)
    .map(setLiceTypeLabel);
};
