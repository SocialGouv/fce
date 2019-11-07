import React from "react";
import Proptypes from "prop-types";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import { hasInclude } from "../../../../../helpers/utils";

function RCC({ establishment }) {
  const hasPse = establishment.pse && establishment.pse.length;

  const rccList = {
    inProcess:
      hasPse &&
      establishment.pse.find(
        pse =>
          hasInclude(pse.type_de_dossier, ["RCC", "rcc"]) &&
          pse.etat_du_dossier === "en_cours_procedure"
      ),
    validsOrProbates:
      hasPse &&
      establishment.pse.filter(
        pse =>
          hasInclude(pse.type_de_dossier, ["RCC", "rcc"]) &&
          pse.etat_du_dossier !== "en_cours_procedure"
      )
  };

  return (
    <Subcategory subtitle="Rupture conventionnelle collective">
      <Data name="Procédure en cours" value={!!rccList.inProcess} />
      {rccList.inProcess && (
        <Data
          name="Date d'enregistrement"
          value={rccList.inProcess.dossier.date_enregistrement}
        />
      )}
      {rccList.validsOrProbates && rccList.validsOrProbates.length ? (
        <table className="table mt-2">
          <thead>
            <tr>
              <th>Numéro de dossier</th>
              <th className="has-text-centered">Date d'enregistrement</th>
              <th className="has-text-centered">Type de RCC</th>
              <th className="has-text-centered">
                Nombre maximum de ruptures de contrats de travail envisagées
              </th>
            </tr>
          </thead>
          <tbody>
            {rccList.validsOrProbates.map((dossier, index) => (
              <tr key={`pse-${dossier.numero_de_dossier}-${index}`}>
                <td className="w-25">
                  <Value value={dossier.numero_de_dossier} />
                </td>
                <td className="has-text-centered w-20">
                  <Value value={dossier.date_enregistrement} />
                </td>
                <td className="has-text-centered w-30">
                  <Value
                    value={
                      dossier.type_de_dossier &&
                      dossier.type_de_dossier.split(":")[1].trim()
                    }
                  />
                </td>
                <td className="has-text-centered">
                  <Value
                    value={
                      dossier.contrats_ruptures_fin ||
                      dossier.contrats_ruptures_debut
                    }
                    empty="-"
                    nonEmptyValues="0"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </Subcategory>
  );
}

RCC.propTypes = {
  establishment: Proptypes.object.isRequired
};

export default RCC;
