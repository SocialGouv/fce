import React from "react";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/fontawesome-pro-solid";
import { getLastDateInteraction } from "../../../../helpers/Date";

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

  getEstablishmentsWithInteractions = enterprise => {
    try {
      return Object.values(enterprise.interactions).reduce(
        (acc, interaction) => {
          if (!acc.hasOwnProperty(interaction.siret)) {
            acc[interaction.siret] = 0;
          }
          acc[interaction.siret]++;
          return acc;
        },
        {}
      );
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  render() {
    const { enterprise } = this.props;
    const establishmentsWithInteractions = this.getEstablishmentsWithInteractions(
      enterprise
    );

    const interactions = Object.entries(establishmentsWithInteractions).map(
      ([siret, nbInteractions]) => {
        const establishment = enterprise.etablissements.find(
          etab => etab.siret.trim() === siret.trim()
        );

        return {
          siret,
          etat: establishment && establishment.etat_etablissement,
          dep:
            establishment &&
            establishment.adresse_components &&
            establishment.adresse_components.code_postal &&
            establishment.adresse_components.code_postal.substr(0, 2),
          commune:
            establishment &&
            establishment.adresse_components &&
            establishment.adresse_components.localite,
          lastControlDate: getLastDateInteraction(establishment.interactions)
        };
      }
    );

    return (
      <section id="direccte" className="enterprise-section">
        <h2 className="title is-size-4">visites et controles</h2>
        <div className="direccte-excerpt">
          <div className="direccte-excerpt--pole">
            <span className="direccte-excerpt--pole-value">
              {interactions.length}
            </span>
            <span className="direccte-ex cerpt--pole-key">
              établissements avec une intervention
            </span>
          </div>
        </div>
        <table className="table is-striped direccte-interactions">
          <thead>
            <tr>
              <th>SIRET</th>
              <th>Etat</th>
              <th>Département</th>
              <th>Commune</th>
              <th>Dernière intervention</th>
            </tr>
          </thead>
          <tbody>
            {interactions.map(etab => (
              <tr key={etab.siret}>
                <td>
                  <Link to={`/establishment/${etab.siret}`}>{etab.siret}</Link>
                </td>
                <td>
                  {etab.etat && (
                    <FontAwesomeIcon
                      className={
                        etab.etat === "A" ? "icon--success" : "icon--danger"
                      }
                      icon={faCircle}
                    />
                  )}
                </td>
                <td>{etab.dep}</td>
                <td>{etab.commune}</td>
                <td>{etab.lastControlDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default EstablishmentView;
