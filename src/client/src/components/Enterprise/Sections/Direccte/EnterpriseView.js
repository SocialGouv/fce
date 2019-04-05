import React from "react";
import Value from "../../../../elements/Value";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCircle, faChevronDown } from "@fortawesome/fontawesome-pro-solid";

class EstablishmentView extends React.Component {
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
    const { enterprise } = this.props;

    const etablishmentsWithInteractons = Object.values(
      enterprise.interactions
    ).reduce((acc, interaction) => {
      if (!acc.hasOwnProperty(interaction.siret)) {
        acc[interaction.siret] = 0;
      }
      acc[interaction.siret]++;
      return acc;
    }, {});

    const interactions = Object.entries(etablishmentsWithInteractons).map(
      ([siret, nbInteractions]) => {
        const etablishment = enterprise.etablissements.find(
          etab => etab.siret === siret
        );
        return {
          siret,
          etat: etablishment && etablishment.etat_etablissement,
          dep:
            etablishment &&
            etablishment.adresse_components &&
            etablishment.adresse_components.code_postal &&
            etablishment.adresse_components.code_postal.substr(0, 2),
          commune:
            etablishment &&
            etablishment.adresse_components &&
            etablishment.adresse_components.localite,
          count: nbInteractions
        };
      }
    );

    return (
      <section id="direccte" className="enterprise-section">
        <h2 className="title is-size-4">VISITES ET CONTROLES</h2>
        <div className="direccte-excerpt">
          <div className="direccte-excerpt--pole">
            <span className="direccte-excerpt--pole-value">
              {enterprise.totalInteractions &&
                enterprise.totalInteractions.total}
            </span>
            <span className="direccte-ex cerpt--pole-key">
              interactions sur{" "}
            </span>
            <span className="direccte-excerpt--pole-value">
              {enterprise.etablissements.length}
            </span>
            <span className="direccte-excerpt--pole-key">établissements</span>
          </div>
        </div>
        <div className="accordions">
          <div className="accordion is-active">
            <div className="accordion-header toggle">
              <span className="">Détails des intéractions</span>
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
                <table className="table is-striped direccte-interactions">
                  <thead>
                    <tr>
                      <th>SIRET</th>
                      <th>Etat</th>
                      <th>Département</th>
                      <th>Commune</th>
                      <th>Nombre d'interactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interactions.map(etab => (
                      <tr key={etab.siret}>
                        <td>
                          <Link to={`/establishment/${etab.siret}`}>
                            {etab.siret}
                          </Link>
                        </td>
                        <td>
                          {etab.etat && (
                            <FontAwesomeIcon
                              className={
                                etab.etat == "A"
                                  ? "icon--success"
                                  : "icon--danger"
                              }
                              icon={faCircle}
                            />
                          )}
                        </td>
                        <td>{etab.dep}</td>
                        <td>{etab.commune}</td>
                        <td>{etab.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default EstablishmentView;
