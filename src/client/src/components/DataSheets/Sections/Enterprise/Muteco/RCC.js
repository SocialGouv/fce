import React from "react";
import Proptypes from "prop-types";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import { countValueInArray, hasInclude } from "../../../../../helpers/utils";

function RCC({ enterprise }) {
  const rccList = {
    inProcess:
      enterprise.liste_pse &&
      enterprise.liste_pse.find(
        pse =>
          hasInclude(pse.dossier.type_de_dossier, ["RCC", "rcc"]) &&
          pse.dossier.etat_du_dossier === "en_cours_procedure"
      ),
    validsOrProbates:
      enterprise.liste_pse &&
      enterprise.liste_pse.filter(
        pse =>
          hasInclude(pse.dossier.type_de_dossier, ["RCC", "rcc"]) &&
          pse.dossier.etat_du_dossier !== "en_cours_procedure"
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
            {rccList.validsOrProbates.map((rcc, index) => (
              <tr key={`pse-${rcc.dossier.numero_de_dossier}-${index}`}>
                <td className="w-25">
                  <Value value={rcc.dossier.numero_de_dossier} />
                </td>
                <td className="has-text-centered w-15">
                  <Value value={rcc.dossier.date_enregistrement} />
                </td>
                <td className="has-text-centered w-25">
                  <Value
                    value={
                      rcc.dossier.type_de_dossier &&
                      rcc.dossier.type_de_dossier.split(":")[1].trim()
                    }
                  />
                </td>
                <td className="has-text-centered">
                  <Value
                    value={
                      rcc.establishments.contrats_ruptures_fin > 0
                        ? countValueInArray(
                            rcc.establishments,
                            "contrats_ruptures_fin"
                          )
                        : countValueInArray(
                            rcc.establishments,
                            "contrats_ruptures_debut"
                          )
                    }
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
  enterprise: Proptypes.object.isRequired
};

export default RCC;
