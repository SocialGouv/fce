import React from "react";
import Value from "../../../elements/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/fontawesome-pro-solid";

class EstablishmentMuteco extends React.Component {
  render() {
    const { establishment } = this.props;
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

        <div className="columns">
          <h5 className="column is-3">
            Demande d'activité partielle dans les 24 derniers mois
          </h5>
          <span className="column is-8">
            {establishment.activite_partielle_24_derniers_mois
              ? "Oui"
              : "Pas d'informations"}
          </span>
        </div>

        {establishment.activite_partielle_24_derniers_mois.length ? (
          <div className="accordions">
            <div className="accordion">
              <div className="accordion-header toggle">
                <span className="">Détail de l'activité partielle</span>
                <span className="">
                  <button className="button is-light is-rounded">
                    <span className="icon">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                  </button>
                </span>
              </div>
              <div className="accordion-body">
                <div className="accordion-content">
                  <table className="table is-striped">
                    <thead>
                      <tr>
                        <th />
                        {Object.keys(
                          establishment.activite_partielle_24_derniers_mois
                        ).map(year => (
                          <th key={year}>
                            {
                              establishment.activite_partielle_24_derniers_mois[
                                year
                              ].year
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
                                establishment
                                  .activite_partielle_24_derniers_mois[year]
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
                                establishment
                                  .activite_partielle_24_derniers_mois[year]
                                  .heures_consommees
                              }
                              empty="-"
                            />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="columns">
          <h5 className="column is-3">
            Plan de sauvegarde de l'emploi ou projet en cours
          </h5>
          <span className="column is-8">
            {establishment.pse_en_projet_ou_en_cours.length
              ? "Oui"
              : "Pas d'informations"}
          </span>
        </div>

        {establishment.pse_en_projet_ou_en_cours.length ? (
          <div className="accordions">
            <div className="accordion">
              <div className="accordion-header toggle">
                <span className="">Détail des PSE</span>
                <span className="">
                  <button className="button is-light is-rounded">
                    <span className="icon">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                  </button>
                </span>
              </div>
              <div className="accordion-body">
                <div className="accordion-content no-table">
                  {Object.keys(establishment.pse_en_projet_ou_en_cours).map(
                    year => [
                      <React.Fragment key={year}>
                        <div className="columns">
                          <h5 className="column is-3">
                            Année d'ouverture du PSE
                          </h5>
                          <span className="column is-8">
                            <Value
                              value={
                                establishment.pse_en_projet_ou_en_cours[year]
                                  .year
                              }
                              empty="-"
                            />
                          </span>
                        </div>
                        <div className="columns">
                          <h5 className="column is-3">
                            État de l 'établissement
                          </h5>
                          <span className="column is-8">
                            <Value
                              value={
                                establishment.pse_en_projet_ou_en_cours[year]
                                  .etat
                              }
                              empty="-"
                            />
                          </span>
                        </div>
                        <div className="columns">
                          <h5 className="column is-3">
                            Nombre de postes indicatifs au PSE
                          </h5>
                          <span className="column is-8">
                            <Value
                              value={
                                establishment.pse_en_projet_ou_en_cours[year]
                                  .poste
                              }
                              empty="-"
                            />
                          </span>
                        </div>
                      </React.Fragment>
                    ]
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    );
  }
}

export default EstablishmentMuteco;
