import React from "react";
import Proptypes from "prop-types";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import AccordionTable from "./AccordionTable";
import Config from "../../../../../services/Config";

import { countValuesInArray, isIncluded } from "../../../../../helpers/utils";
import {
  isInProcessState,
  hasPseValidsOrProbates,
  isValidProcedureDuration
} from "../../../../../helpers/Pse";

function PSE({ enterprise }) {
  const pseList = {
    inProcess:
      enterprise.liste_pse &&
      enterprise.liste_pse.find(
        pse =>
          isIncluded(pse.dossier.type_de_dossier, ["pse"]) &&
          isInProcessState(pse.dossier.etat_du_dossier)
      ),
    validsOrProbates:
      enterprise.liste_pse &&
      enterprise.liste_pse.filter(
        pse =>
          isIncluded(pse.dossier.type_de_dossier, ["pse"]) &&
          !isInProcessState(pse.dossier.etat_du_dossier) &&
          isValidProcedureDuration(pse.dossier.date_enregistrement) &&
          countValuesInArray(pse.establishments, [
            "contrats_ruptures_fin",
            "contrats_ruptures_debut"
          ]) > 0
      )
  };

  return (
    <Subcategory subtitle="Plan de sauvegarde de l'emploi">
      <Data
        name="Procédure en cours"
        value={!!pseList.inProcess}
        columnClasses={["is-8", "is-4"]}
      />
      {pseList.inProcess && (
        <Data
          name="Date d'enregistrement"
          value={pseList.inProcess.dossier.date_enregistrement}
          columnClasses={["is-8", "is-4"]}
        />
      )}
      {hasPseValidsOrProbates(pseList) && (
        <>
          <Data
            name={`Procédure(s) homologuée(s) ou validée(s) au cours des ${Config.get(
              "monthsProceduresLimit"
            )} derniers mois`}
            value={hasPseValidsOrProbates(pseList)}
            columnClasses={["is-8", "is-4"]}
          />
          <div className="is-overflow-x">
            <table className="table mt-2 is-max-content">
              <thead>
                <tr>
                  <th>Numéro de dossier</th>
                  <th className="has-text-centered">
                    Date d{"'"}enregistrement
                  </th>
                  <th className="has-text-centered">
                    Situation juridique de l{"'"}entreprise durant la procédure
                  </th>
                  <th className="has-text-centered">Date du jugement</th>
                  <th className="has-text-centered">
                    Nombre maximum de ruptures de contrats de travail envisagées
                  </th>
                  <th className="has-text-centered">
                    Nombre d{"'"}établissements impactés
                  </th>
                </tr>
              </thead>
              {pseList.validsOrProbates.map((pse, index) => (
                <AccordionTable
                  pse={pse}
                  key={`pse-${pse.dossier.numero_de_dossier}-${index}`}
                />
              ))}
            </table>
          </div>
        </>
      )}
    </Subcategory>
  );
}

PSE.propTypes = {
  enterprise: Proptypes.object.isRequired
};

export default PSE;
