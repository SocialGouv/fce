import _get from "lodash.get";
import {
  getRupcoData,
  hasBrokenContracts,
  hasPseValidDuration,
  setProcedureState,
  setLiceTypeLabel,
} from "../share/rupco";
import { getFormatedDate } from "../../Helpers";

export default ({ rupcoEtablissements }) =>
  getRupcoData(rupcoEtablissements, getByType);

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
