import React from "react";
import Value from "../../../../shared/Value";
import Prototype from "prop-types";
import _get from "lodash.get";
import Data from "../../SharedComponents/Data";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faUmbrella } from "@fortawesome/fontawesome-pro-solid";

const EstablishmentMuteco = ({ establishment }) => {
  return (
    <section id="muteco" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUmbrella} />
        </span>
        <h2 className="title">Mutations Economiques</h2>
      </div>
      <div className="section-datas">
        <Data
          name="Activité partielle"
          value={
            _get(establishment, `activite_partielle_24_derniers_mois`)
              ? "Oui"
              : "Information bientôt disponible"
          }
        />
        {Array.isArray(establishment.activite_partielle_24_derniers_mois) &&
          establishment.activite_partielle_24_derniers_mois.length > 0 && (
            <table className="table is-hoverable is-bordered mt-2">
              <thead>
                <tr>
                  <th />
                  {Object.keys(
                    _get(establishment, `activite_partielle_24_derniers_mois`)
                  ).map(year => (
                    <th key={year}>
                      {_get(
                        establishment,
                        `activite_partielle_24_derniers_mois[${year}].year`
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Nombre d'heures demandées</th>
                  {Object.keys(
                    _get(establishment, `activite_partielle_24_derniers_mois`)
                  ).map(year => (
                    <td key={year}>
                      <Value
                        value={_get(
                          establishment,
                          `activite_partielle_24_derniers_mois[${year}].heures_demandees`
                        )}
                        empty="-"
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Nombre d'heures consommées</th>
                  {Object.keys(
                    _get(establishment, `activite_partielle_24_derniers_mois`)
                  ).map(year => (
                    <td key={year}>
                      <Value
                        value={_get(
                          establishment,
                          `activite_partielle_24_derniers_mois[${year}].heures_consommees`
                        )}
                        empty="-"
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}

        <Data
          name="PSE"
          value={
            _get(establishment, `pse_en_projet_ou_en_cours`)
              ? "Oui"
              : "Information en cours de négociation"
          }
        />
        {Array.isArray(establishment.pse_en_projet_ou_en_cours) &&
          establishment.pse_en_projet_ou_en_cours.length > 0 && (
            <table className="table is-hoverable is-bordered mt-2">
              <thead>
                <tr>
                  <th />
                  {Object.keys(establishment.pse_en_projet_ou_en_cours).map(
                    year => (
                      <th key={year}>
                        {_get(
                          establishment,
                          `pse_en_projet_ou_en_cours[${year}].year`
                        )}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Etat</th>
                  {Object.keys(establishment.pse_en_projet_ou_en_cours).map(
                    year => (
                      <td key={year}>
                        <Value
                          value={_get(
                            establishment,
                            `pse_en_projet_ou_en_cours[${year}].etat`
                          )}
                          empty="-"
                        />
                      </td>
                    )
                  )}
                </tr>
                <tr>
                  <th scope="row">Poste</th>
                  {Object.keys(establishment.pse_en_projet_ou_en_cours).map(
                    year => (
                      <td key={year}>
                        <Value
                          value={_get(
                            establishment,
                            `pse_en_projet_ou_en_cours[${year}].poste`
                          )}
                          empty="-"
                        />
                      </td>
                    )
                  )}
                </tr>
              </tbody>
            </table>
          )}
      </div>
    </section>
  );
};

EstablishmentMuteco.Prototype = {
  establishment: Prototype.object.isRequired
};

export default EstablishmentMuteco;
