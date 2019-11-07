import React from "react";
import Proptypes from "prop-types";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import { hasInclude } from "../../../../../helpers/utils";

function PSE({ establishment }) {
  const hasPse = establishment.pse && establishment.pse.length;

  const pseList = {
    inProcess:
      hasPse &&
      establishment.pse.find(
        pse =>
          hasInclude(pse.type_de_dossier, ["PSE", "pse"]) &&
          pse.etat_du_dossier === "en_cours_procedure"
      ),
    validsOrProbates:
      hasPse &&
      establishment.pse.filter(
        pse =>
          hasInclude(pse.type_de_dossier, ["PSE", "pse"]) &&
          pse.etat_du_dossier !== "en_cours_procedure"
      )
  };

  return (
    <Subcategory subtitle="Plan de sauvegarde de l'emploi">
      <Data name="Procédure en cours" value={!!pseList.inProcess} />
      {pseList.inProcess && (
        <Data
          name="Date d'enregistrement"
          value={pseList.inProcess.date_enregistrement}
        />
      )}
      {pseList.validsOrProbates && (
        <table className="table mt-2">
          <thead>
            <tr>
              <th>Numéro de dossier</th>
              <th className="has-text-centered">Date d'enregistrement</th>
              <th className="has-text-centered">
                Nombre maximum de ruptures de contrats de travail envisagées
                dans l'établissement
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
      )}
    </Subcategory>
  );
}

PSE.propTypes = {
  establishment: Proptypes.object.isRequired
};

export default PSE;
