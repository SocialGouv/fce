import React from "react";
import Value from "../../../elements/Value";
import classNames from "classnames";

class Interventions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleElement = id => {
    this.setState({
      [id]: !this.state[id]
    });
  };

  render() {
    const { establishment } = this.props;
    const actEcoTypes =
      establishment.structure_insertion_activite_economique_types;

    let strActEco = "";
    if (actEcoTypes) {
      let actEco = [];
      if (actEcoTypes.ei) {
        actEco.push("Entreprise d'insertion");
      }
      if (actEcoTypes.ai) {
        actEco.push("Association intermédiaire");
      }
      if (actEcoTypes.aci) {
        actEco.push("Atelier et chantier d'insertion");
      }
      if (actEcoTypes.etti) {
        actEco.push("Entreprise de travail temporaire d'insteration");
      }
      strActEco = actEco.join(", ");
    }

    return (
      <section id="interventions" className="enterprise-section">

        <section id="development">
          <h2 className="subtitle h4">Développement économique</h2>

          <dl className="dl row">
            <dt className="dt col-md-4">ETI / Pépite</dt>
            <dd className="dd col-md-8">
              <Value value={establishment.eti_pepite} empty="-" />
            </dd>

            <dt className="dt col-md-4">Filière stratégique</dt>
            <dd className="dd definition col-md-8">
              <Value value={establishment.filiere_strategique} empty="-" />
            </dd>

            <dt className="dt col-md-4">Labels obtenus</dt>
            <dd className="dd definition col-md-8">
              Non-disponible
            </dd>
          </dl>
        </section>

        <section id="job">
          <h2 className="subtitle h4">Emploi et insertion professionnelle</h2>

          <dl className="dl row">
            <dt className="dt col-md-4">
              Structure de l'insertion par l'activité économique
            </dt>
            <dd className="dd col-md-8">
              <Value value={strActEco} empty="-" />
            </dd>

            <dt className="dt col-md-4">Signataire de convention(s) FNE</dt>
            <dd className="dd definition col-md-8">
              Non-disponible
            </dd>
          </dl>
        </section>

        <section id="mutations">
          <h2 className="subtitle h4">Mutations économiques</h2>

          <dl className="dl row">
            <dt className="dt col-md-4">
              Demande d'activité partielle dans les 24 derniers mois
            </dt>
            <dd className="dd col-md-8">
              {establishment.activite_partielle_24_derniers_mois ? (
                <a
                  className="d-print-none"
                  href="#mutation-activity"
                  onClick={() => this.toggleElement("mutation-activity")}
                >
                  Voir le détail
                </a>
              ) : (
                "Pas d'information"
              )}
            </dd>
          </dl>

          {establishment.activite_partielle_24_derniers_mois ? (
            <div
              id="mutation-activity"
              className={classNames({
                "toggle-element": true,
                "d-none": !this.state["mutation-activity"],
                "d-print-block": true
              })}
            >
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th />
                    {Object.keys(
                      establishment.activite_partielle_24_derniers_mois
                    ).map(year => <th>{year}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Nombre d'heures demandées</th>
                    {Object.keys(
                      establishment.activite_partielle_24_derniers_mois
                    ).map(year => (
                      <td>
                        <Value
                          value={
                            establishment.activite_partielle_24_derniers_mois[
                              year
                            ].heures_demandees
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
                      <td>
                        <Value
                          value={
                            establishment.activite_partielle_24_derniers_mois[
                              year
                            ].heures_consommees
                          }
                          empty="-"
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}

          <dl className="dl row">
            <dt className="dt col-md-4">
              Plan de sauvegarde de l'emploi ou projet en cours
            </dt>
            <dd className="dd col-md-8">
              {establishment.pse_en_projet_ou_en_cours ? (
                <a
                  className="d-print-none"
                  href="#mutation-job"
                  onClick={() => this.toggleElement("mutation-job")}
                >
                  Voir le détail
                </a>
              ) : (
                "Pas d'information"
              )}
            </dd>
          </dl>

          {establishment.pse_en_projet_ou_en_cours ? (
            <div
              id="mutation-job"
              className={classNames({
                "toggle-element": true,
                "d-none": !this.state["mutation-job"],
                "d-print-block": true
              })}
            >
              <dl className="dl row">
                {Object.keys(establishment.pse_en_projet_ou_en_cours).map(
                  year => [
                    <dt className="dt col-md-4">Année d'ouverture du PSE</dt>,
                    <dd className="dd col-md-8">{year}</dd>,

                    <dt className="dt col-md-4">État de l'établissement</dt>,
                    <dd className="dd col-md-8">
                      <Value
                        value={
                          establishment.pse_en_projet_ou_en_cours[year].etat
                        }
                        empty="-"
                      />
                    </dd>,
                    <dt className="dt col-md-4">
                      Nombre de postes indicatifs au PSE
                    </dt>,
                    <dd className="dd col-md-8">
                      <Value
                        value={
                          establishment.pse_en_projet_ou_en_cours[year].poste
                        }
                        empty="-"
                      />
                    </dd>
                  ]
                )}
              </dl>
            </div>
          ) : null}
        </section>
      </section>
    );
  }
}

export default Interventions;
