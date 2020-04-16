import React from "react";
import Proptypes from "prop-types";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import Config from "../../../../../services/Config";

import { isIncluded } from "../../../../../helpers/utils";
import {
  hasPse,
  isInProcessState,
  hasPseValidsOrProbates,
  isValidProcedureDuration
} from "../../../../../helpers/Pse";

function PSE({ establishment }) {
  const pseList = {
    inProcess:
      hasPse(establishment) &&
      establishment.pse.find(
        pse =>
          isIncluded(pse.type_de_dossier, ["pse"]) &&
          isInProcessState(pse.etat_du_dossier)
      ),
    validsOrProbates:
      hasPse(establishment) &&
      establishment.pse.filter(
        pse =>
          isIncluded(pse.type_de_dossier, ["pse"]) &&
          !isInProcessState(pse.etat_du_dossier) &&
          isValidProcedureDuration(pse.date_enregistrement) &&
          pse.contrats_ruptures_debut + pse.contrats_ruptures_fin > 0
      )
  };

  return (
    <Subcategory
      subtitle="Plan de sauvegarde de l'emploi"
      sourceSi="SI PSE/RUPCO"
    >
      <Data
        name="Procédure en cours"
        value={!!pseList.inProcess}
        columnClasses={["is-8", "is-4"]}
      />
      {pseList.inProcess && (
        <Data
          name="Date d'enregistrement"
          value={pseList.inProcess.date_enregistrement}
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
          <table className="table mt-2">
            <thead>
              <tr>
                <th>Numéro de dossier</th>
                <th className="has-text-centered">Date d{"'"}enregistrement</th>
                <th className="has-text-centered">
                  Nombre maximum de ruptures de contrats de travail envisagées
                  dans l{"'"}établissement
                </th>
              </tr>
            </thead>
            <tbody>
              {pseList.validsOrProbates.map((dossier, index) => (
                <tr key={dossier.numero_de_dossier.concat(index)}>
                  <td className="w-25">
                    <Value value={dossier.numero_de_dossier} />
                  </td>
                  <td className="has-text-centered w-25">
                    <Value value={dossier.date_enregistrement} />
                  </td>
                  <td className="has-text-centered w-50">
                    <Value
                      value={
                        dossier.contrats_ruptures_fin ||
                        dossier.contrats_ruptures_debut
                      }
                      nonEmptyValues="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Subcategory>
  );
}

PSE.propTypes = {
  establishment: Proptypes.object.isRequired
};

export default PSE;
