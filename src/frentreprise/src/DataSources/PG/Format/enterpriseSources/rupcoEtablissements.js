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

  return getRupcoDataForEnterprise(rupcoEtablissementByType);
};

const getRupcoDataForEnterprise = (rows) => {
  const rupco = rows.reduce(
    (
      rupcoList,
      {
        date_enregistrement,
        type,
        numero,
        situation_juridique,
        date_jugement,
        siret,
        historique_si,
        rupcoProcedure,
        nombre_de_ruptures_de_contrats_en_debut_de_procedure,
        nombre_de_ruptures_de_contrats_en_fin_de_procedure,
      }
    ) => {
      if (!rupcoList[numero]) {
        rupcoList[numero] = {
          date_enregistrement: getFormatedDate(date_enregistrement),
          type,
          numero,
          etat: _get(rupcoProcedure, "etat"),
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
