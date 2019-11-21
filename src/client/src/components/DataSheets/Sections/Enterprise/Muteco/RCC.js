import React from "react";
import Proptypes from "prop-types";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import { countValuesInArray, isIncluded } from "../../../../../helpers/utils";
import Config from "../../../../../services/Config";

import {
  isInProcessState,
  hasPseValidsOrProbates,
  isValidProcedureDuration
} from "../../../../../helpers/Pse";

function RCC({ enterprise }) {
  const rccList = {
    inProcess:
      enterprise.liste_pse &&
      enterprise.liste_pse.find(
        pse =>
          isIncluded(pse.dossier.type_de_dossier, ["rcc"]) &&
          isValidProcedureDuration(pse.dossier.date_enregistrement) &&
          isInProcessState(pse.dossier.etat_du_dossier)
      ),
    validsOrProbates:
      enterprise.liste_pse &&
      enterprise.liste_pse.filter(
        pse =>
          isIncluded(pse.dossier.type_de_dossier, ["rcc"]) &&
          isValidProcedureDuration(pse.dossier.date_enregistrement) &&
          !isInProcessState(pse.dossier.etat_du_dossier)
      )
  };

  return (
    <Subcategory subtitle="Rupture conventionnelle collective">
      <Data
        name="Procédure en cours"
        value={!!rccList.inProcess}
        columnClasses={["is-8", "is-4"]}
      />
      {rccList.inProcess && (
        <Data
          name="Date d'enregistrement"
          value={rccList.inProcess.dossier.date_enregistrement}
          columnClasses={["is-8", "is-4"]}
        />
      )}
      {hasPseValidsOrProbates(rccList) && (
        <>
          <Data
            name={`Procédure(s) homologuée(s) ou validée(s) au cours des ${Config.get(
              "monthsProceduresLimit"
            )} derniers mois`}
            value={hasPseValidsOrProbates(rccList)}
            columnClasses={["is-8", "is-4"]}
          />
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
                  <td className="w-20">
                    <Value value={rcc.dossier.numero_de_dossier} />
                  </td>
                  <td className="has-text-centered w-20">
                    <Value value={rcc.dossier.date_enregistrement} />
                  </td>
                  <td className="has-text-centered w-30">
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
                        countValuesInArray(
                          rcc.establishments,
                          "contrats_ruptures_fin"
                        ) > 0
                          ? countValuesInArray(
                              rcc.establishments,
                              "contrats_ruptures_fin"
                            )
                          : countValuesInArray(
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
        </>
      )}
    </Subcategory>
  );
}

RCC.propTypes = {
  enterprise: Proptypes.object.isRequired
};

export default RCC;
