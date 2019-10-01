import React from "react";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCircle, faCalendarCheck } from "@fortawesome/fontawesome-pro-solid";
import { getLastDateInteraction } from "../../../../../helpers/Date";
import _get from "lodash.get";

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

        const codePostal = _get(
          establishment,
          "adresse_components.code_postal"
        );

        const etablissementInterractions = enterprise.interactions.filter(
          interaction => interaction.siret.trim() === siret.trim()
        );

        return {
          siret,
          etat: _get(establishment, "etat_etablissement"),
          dep: codePostal && codePostal.substr(0, 2),
          commune: _get(establishment, "adresse_components.localite"),
          lastControlDate: getLastDateInteraction(etablissementInterractions)
        };
      }
    );

    return (
      <section id="direccte" className="data-sheet__section">
        <div className="section-header">
          <span className="icon">
            <FontAwesomeIcon icon={faCalendarCheck} />
          </span>
          <h2 className="title">Visites et controles</h2>
        </div>
        <div className="section-datas">
          <div className="direccte-excerpt">
            <div className="direccte-excerpt--pole">
              <span className="direccte-excerpt--pole-value">
                {interactions.length}
              </span>
              <span className="direccte-ex cerpt--pole-key">
                établissement{interactions.length > 1 && "s"} avec une
                intervention
              </span>
            </div>
          </div>
          <table className="table is-striped is-hoverable direccte-interactions">
            <thead>
              <tr>
                <th className="th">SIRET</th>
                <th className="th table__center-cell">État</th>
                <th className="th">Département</th>
                <th className="th">Commune</th>
                <th className="th">Dernière intervention</th>
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
                  <td className="table__center-cell">
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
        </div>
      </section>
    );
  }
}

export default EstablishmentView;
