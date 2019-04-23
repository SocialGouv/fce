import React from "react";
import Value from "../../../elements/Value";
import Prototype from "prop-types";
import Data from "./SharedComponents/Data";

const EstablishmentMuteco = ({ establishment }) => {
  establishment.pse_en_projet_ou_en_cours = [
    {
      year: 2016,
      etat: "in bonis",
      poste: 34
    },
    {
      year: 2017,
      etat: "in bonis",
      poste: 45
    }
  ];
  establishment.activite_partielle_24_derniers_mois = [
    {
      year: 2016,
      heures_demandees: 50000,
      heures_consommees: 34530
    },
    {
      year: 2017,
      heures_demandees: 30000,
      heures_consommees: 16548
    }
  ];

  return (
    <section id="muteco" className="enterprise-section">
      <h2 className="title is-size-4"> Mutations Economiques</h2>

      <Data
        dataName="Activité partielle"
        dataValue={
          establishment.activite_partielle_24_derniers_mois
            ? "Oui"
            : "Pas d'informations"
        }
      />
      {establishment.activite_partielle_24_derniers_mois &&
        establishment.activite_partielle_24_derniers_mois.length > 0 && (
          <table className="table is-hoverable is-bordered mt-2">
            <thead>
              <tr>
                <th />
                {Object.keys(
                  establishment.activite_partielle_24_derniers_mois
                ).map(year => (
                  <th key={year}>
                    {
                      establishment.activite_partielle_24_derniers_mois[year]
                        .year
                    }
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Nombre d'heures demandées</th>
                {Object.keys(
                  establishment.activite_partielle_24_derniers_mois
                ).map(year => (
                  <td key={year}>
                    <Value
                      value={
                        establishment.activite_partielle_24_derniers_mois[year]
                          .heures_demandees
                      }
                      empty="-"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Nombre d'heures consommées</th>
                {Object.keys(
                  establishment.activite_partielle_24_derniers_mois
                ).map(year => (
                  <td key={year}>
                    <Value
                      value={
                        establishment.activite_partielle_24_derniers_mois[year]
                          .heures_consommees
                      }
                      empty="-"
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}

      <Data
        dataName="PSE"
        dataValue={
          establishment.pse_en_projet_ou_en_cours ? "Oui" : "Pas d'informations"
        }
      />
      {establishment.pse_en_projet_ou_en_cours &&
        establishment.pse_en_projet_ou_en_cours.length > 0 && (
          <table className="table is-hoverable is-bordered mt-2">
            <thead>
              <tr>
                <th />
                {Object.keys(establishment.pse_en_projet_ou_en_cours).map(
                  year => (
                    <th key={year}>
                      {establishment.pse_en_projet_ou_en_cours[year].year}
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
                        value={
                          establishment.pse_en_projet_ou_en_cours[year].etat
                        }
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
                        value={
                          establishment.pse_en_projet_ou_en_cours[year].poste
                        }
                        empty="-"
                      />
                    </td>
                  )
                )}
              </tr>
            </tbody>
          </table>
        )}
    </section>
  );
};

EstablishmentMuteco.Prototype = {
  establishment: Prototype.object.isRequired
};

export default EstablishmentMuteco;
