import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/pro-solid-svg-icons";
import Value from "../../../../shared/Value";
import Data from "../Data";
import Source from "../../../../../containers/Source";
import { getLastInteraction } from "../../../../../helpers/Interactions";

class EstablishmentView extends React.Component {
  toggleElement = id => {
    this.setState({
      [id]: !this.state[id]
    });
  };

  render() {
    const { establishment } = this.props;

    const lastInteractions = {
      // TO TEST SOURCES DISPLAY:
      // - interactions_T -> POLE T & POLE C
      // - interactions_3E -> 3E-SEER & 3E-SRC
      // UPDATE TABLES WHEN DATA IS READY
      T: {
        ...getLastInteraction(establishment.interactions_T, "T"),
        source: "Wiki'T"
      },
      C: {
        ...getLastInteraction(establishment.interactions_T, "C"),
        source: "SORA"
      },
      "3E_SEER": {
        ...getLastInteraction(establishment.interactions_3E, "3E-SEER"),
        source: "EOS-default"
      },
      "3E_SRC": {
        ...getLastInteraction(establishment.interactions_3E, "3E-SRC"),
        source: "MDF"
      }
    };

    return (
      <section id="direccte" className="data-sheet__section">
        <div className="section-header">
          <span className="icon">
            <FontAwesomeIcon icon={faCalendarCheck} />
          </span>
          <h2 className="title">Visites et Contrôles de la Direccte</h2>
        </div>
        <div className="section-datas">
          <Data
            name="Unité de contrôle compétente (inspection du travail)"
            value={establishment.unite_controle_competente}
            columnClasses={["is-6", "is-6"]}
            source="Siene"
          />

          <Data
            name={
              <div>
                <div>
                  Dernier contrôle ou visite au cours des 24 derniers mois
                </div>
                <div>(Pôle T, Pôle C et Pôle E - SEER)</div>
              </div>
            }
            value={
              establishment.totalInteractions &&
              establishment.totalInteractions.total === 0
                ? "pas de contrôle connu"
                : ""
            }
            columnClasses={["is-6", "is-6"]}
          />

          {establishment.interactions && establishment.interactions.length ? (
            <table className="table is-bordered is-hoverable direccte-interactions">
              <thead>
                <tr>
                  <th className="has-text-right">Pôle</th>
                  <th className="has-text-left">Date</th>
                  <th className="has-text-left">Objet</th>
                  <th className="has-text-left">Unité</th>
                  <th className="has-text-left">Agent</th>
                  <th className="has-text-left">Source</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(lastInteractions).map(
                  ([pole, lastInteraction]) => {
                    return lastInteraction ? (
                      <tr key={pole}>
                        <td className="has-text-right">
                          <Value value={pole} />
                        </td>
                        <td className="has-text-left">
                          <Value value={lastInteraction.date} />
                        </td>
                        <td className="has-text-left">
                          <Value value={lastInteraction.objet} />
                        </td>
                        <td className="has-text-left">
                          <Value value={lastInteraction.unite} />
                        </td>
                        <td className="has-text-left">
                          <Value value={lastInteraction.agent} />
                        </td>
                        <td className="has-text-left">
                          <Source si={lastInteraction.source} isTableCell />
                        </td>
                      </tr>
                    ) : (
                      <tr key={pole}>
                        <td className="has-text-right">{pole}</td>
                        <td className="has-text-left" colSpan="7">
                          <Value value="-" />
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          ) : null}
        </div>
      </section>
    );
  }
}

EstablishmentView.propTypes = {
  establishment: PropTypes.object
};

export default EstablishmentView;
