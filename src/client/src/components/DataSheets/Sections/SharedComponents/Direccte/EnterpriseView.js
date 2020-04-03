import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCalendarCheck } from "@fortawesome/pro-solid-svg-icons";
import _get from "lodash.get";
import { getLastDateInteraction } from "../../../../../helpers/Date";
import Data from "../Data";
import Config from "../../../../../services/Config";

class EstablishmentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    enterprise: PropTypes.object.isRequired
  };

  toggleElement = id => {
    this.setState({
      [id]: !this.state[id]
    });
  };

  getEstablishmentsWithInteractions = enterprise => {
    try {
      return Object.values(enterprise.interactions).reduce(
        (acc, interaction) => {
          if (!Object.prototype.hasOwnProperty.call(acc, interaction.siret)) {
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

    const interactions = Object.keys(establishmentsWithInteractions).map(
      siret => {
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
          <Data
            name="nb d'établissements avec une intervention"
            value={interactions.length}
            columnClasses={["is-9", "is-3"]}
          />
          <table className="table is-hoverable direccte-interactions w-100">
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
                          etab.etat === Config.get("establishmentState").actif
                            ? "icon--success"
                            : "icon--danger"
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
