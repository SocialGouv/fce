import React from "react";
import Proptypes from "prop-types";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import { countValueInArray, hasInclude } from "../../../../../helpers/utils";

function PSE({ enterprise }) {
  const pseList = {
    inProcess:
      enterprise.liste_pse &&
      enterprise.liste_pse.find(
        pse =>
          hasInclude(pse.dossier.type_de_dossier, ["PSE", "pse"]) &&
          pse.dossier.etat_du_dossier === "en_cours_procedure"
      ),
    validsOrProbates:
      enterprise.liste_pse &&
      enterprise.liste_pse.filter(
        pse =>
          hasInclude(pse.dossier.type_de_dossier, ["PSE", "pse"]) &&
          pse.dossier.etat_du_dossier !== "en_cours_procedure" &&
          pse.dossier.rupture_contrat_debut +
            pse.dossier.rupture_contrat_fin !==
            0
      )
  };

  return (
    <Subcategory subtitle="Plan de sauvegarde de l'emploi">
      <Data name="Procédure en cours" value={!!pseList.inProcess} />
      {pseList.inProcess && (
        <Data
          name="Date d'enregistrement"
          value={pseList.inProcess.dossier.date_enregistrement}
        />
      )}
      {pseList.validsOrProbates && pseList.validsOrProbates.length ? (
        <div className="is-overflow-x">
          <table className="table mt-2 is-max-content">
            <thead>
              <tr>
                <th>Numéro de dossier</th>
                <th className="has-text-centered">Date d'enregistrement</th>
                <th className="has-text-centered">
                  Situation juridique de l'entreprise au moment de la procédure
                </th>
                <th className="has-text-centered">Date du jugement</th>
                <th className="has-text-centered">
                  Nombre maximum de ruptures de contrats de travail envisagées
                </th>
                <th className="has-text-centered">
                  Nombre d'établissements impactés
                </th>
              </tr>
            </thead>
            <tbody>
              {pseList.validsOrProbates.map((pse, index) => (
                <tr key={`pse-${pse.dossier.numero_de_dossier}-${index}`}>
                  <td className="w-15">
                    <Value value={pse.dossier.numero_de_dossier} />
                  </td>
                  <td className="has-text-centered w-10">
                    <Value value={pse.dossier.date_enregistrement} />
                  </td>
                  <td className="has-text-centered w-15">
                    <Value value={pse.dossier.situation_juridique} />
                  </td>
                  <td className="has-text-centered w-10">
                    <Value
                      value={
                        pse.dossier.date_de_jugement
                          ? pse.dossier.date_de_jugement
                          : "-"
                      }
                    />
                  </td>
                  <td className="has-text-centered w-15">
                    <Value
                      value={
                        pse.establishments.contrats_ruptures_fin > 0
                          ? countValueInArray(
                              pse.establishments,
                              "contrats_ruptures_fin"
                            )
                          : countValueInArray(
                              pse.establishments,
                              "contrats_ruptures_debut"
                            )
                      }
                      nonEmptyValues="0"
                    />
                  </td>
                  <td className="has-text-centered has-text-link w-15">
                    <Value value={pse.establishments.length} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </Subcategory>
  );
}

PSE.propTypes = {
  enterprise: Proptypes.object.isRequired
};

export default PSE;
