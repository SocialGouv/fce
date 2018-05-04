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
            <dt className="dt col-md-8">ETI / Pépite</dt>
            <dd className="dd col-md-4">
              <Value value={establishment.eti_pepite} empty="-" />
            </dd>
            <dt className="dt col-md-8">Filière stratégique</dt>
            <dd className="dd definition col-md-4">
              <Value value={establishment.filiere_strategique} empty="-" />
            </dd>
            <dt className="dt col-md-8 mt-4">
              Adhérent à un Pole de compétitivité (2015)
            </dt>
            <dd className="dd definition col-md-4 mt-4">
              <Value
                value={
                  Array.isArray(establishment.pole_competitivite) &&
                  !!establishment.pole_competitivite.length
                }
              />
            </dd>
            {Array.isArray(establishment.pole_competitivite) &&
            establishment.pole_competitivite.length ? (
              <dd className="dd definition col-md-8">
                <a
                  className="d-print-none"
                  href="#interventions"
                  onClick={() =>
                    this.toggleElement("interventions-competitivite")
                  }
                >
                  {this.state["interventions-competitivite"]
                    ? "Masquer"
                    : "Voir"}{" "}
                  le détail
                </a>
              </dd>
            ) : null}

            {Array.isArray(establishment.pole_competitivite) &&
            establishment.pole_competitivite.length ? (
              <div
                id="interventions-competitivite"
                className={classNames(
                  "col-md-4",
                  "offset-md-8",
                  "toggle-element",
                  "d-print-block",
                  { "d-none": !this.state["interventions-competitivite"] }
                )}
              >
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Liste des pôles de compétitivité :</th>
                    </tr>
                  </thead>
                  <tbody>
                    {establishment.pole_competitivite.map(pole => (
                      <tr>
                        <td>{pole}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            <dt className="dt col-md-12 mt-4">Labels obtenus</dt>
            <dt className="dt col-md-4">EPV</dt>
            <dd className="dd definition col-md-8">Non disponible</dd>

            <dt className="dt col-md-4">Destination pour tous</dt>
            <dd className="dd definition col-md-8">Non disponible</dd>

            <dt className="dt col-md-4">Tourisme et handicap</dt>
            <dd className="dd definition col-md-8">Non disponible</dd>
          </dl>
        </section>
        <section id="job">
          <h2 className="subtitle h4">Emploi et insertion professionnelle</h2>

          <dl className="dl row">
            <dt className="dt col-md-4">Agrément entreprise adaptée</dt>
            <dd className="dd col-md-8">
              <Value value={!!establishment.ea} empty="-" />
            </dd>
          </dl>
          {!!establishment.ea ? (
            <dl className="dl row">
              <dt className="dt col-md-4">
                Nombre de postes conventionnés (2017)&nbsp;:
              </dt>
              <dd className="dd definition col-md-8">
                {establishment.ea.nb_postes_2017}
              </dd>
            </dl>
          ) : null}
          <dl className="dl row  mt-4">
            <dt className="dt col-md-4">
              Structure de l'insertion par l'activité économique
            </dt>
            <dd className="dd col-md-8">
              <Value
                value={strActEco}
                empty="Non disponible"
                no="Non disponible"
              />
            </dd>
            <dt className="dt col-md-12 mt-4">Prime embauche PME</dt>
            <dd className="dt col-md-6">
              Nombre d'embauches effectuées dans le cadre du dispositif:
            </dd>
            <dt className="dt col-md-6">{establishment.prime_embauche_pme}</dt>
            <dd className="dt col-md-4">
              (entre le 18 janvier 2016 et le 30 juin 2017)
            </dd>
          </dl>
          <dl className="dl row mt-4">
            <dt className="dt col-md-8">
              Recours à un contrat en alternance au cours des 24 derniers
              mois&nbsp;:
            </dt>
            <dd className="dd col-md-4">
              <Value value={!!establishment.alternance} />
            </dd>
          </dl>
          {!!establishment.alternance ? (
            <dl className="dl row mt-4">
              <dd className="dt col-md-4">
                <a
                  className="d-print-none"
                  href="#interventions"
                  onClick={() => this.toggleElement("interventions-alternance")}
                >
                  {this.state["interventions-alternance"] ? "Masquer" : "Voir"}{" "}
                  le détail
                </a>
              </dd>
              <dd className="dd col-md-8">
                <div
                  id="interventions-alternance"
                  className={classNames("toggle-element", "d-print-block", {
                    "d-none": !this.state["interventions-alternance"]
                  })}
                >
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th>Nombre d'embauches en contrat d'apprentisage</th>
                        <td>{establishment.alternance.apprentisage}</td>
                      </tr>
                      <tr>
                        <th>
                          Nombre d'embauches en contrat de professionnalisation
                        </th>
                        <td>{establishment.alternance.professionnalisation}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </dd>
            </dl>
          ) : null}
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
                  href="#mutations"
                  onClick={() => this.toggleElement("mutation-activity")}
                >
                  {this.state["mutation-activity"] ? "Masquer" : "Voir"} le
                  détail
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
                  href="#mutations"
                  onClick={() => this.toggleElement("mutation-job")}
                >
                  {this.state["mutation-job"] ? "Masquer" : "Voir"} le détail
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

          <dl className="dl row mt-4">
            <dt className="dt col-md-4">Signataire de convention(s) FNE</dt>
            <dd className="dd definition col-md-8">Non-disponible</dd>
          </dl>
        </section>
      </section>
    );
  }
}

export default Interventions;
