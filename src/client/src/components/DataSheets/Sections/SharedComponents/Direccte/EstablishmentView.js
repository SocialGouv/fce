import React from "react";
import Value from "../../../../shared/Value";
import Data from "../Data";
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
      T: getLastInteraction(establishment.interactions_T, "T"),
      C: getLastInteraction(establishment.interactions_C, "C"),
      "3E_SEER": getLastInteraction(establishment.interactions_3E, "3E-SEER"),
      "3E_SRC": getLastInteraction(establishment.interactions_3E, "3E-SRC")
    };

    return (
      <section id="direccte" className="enterprise-section">
        <h2 className="title is-size-4">Visites et Contrôles de la Direccte</h2>

        <Data
          name="Unité de contrôle compétente (inspection du travail)"
          value={establishment.unite_controle_competente}
        />

        <Data
          name="Dernier contrôle / dernière visite au cours des 24 derniers mois (Pôle T, Pôle C et Pôle E - SEER)"
          value={
            establishment.totalInteractions &&
            establishment.totalInteractions.total === 0
              ? "pas de contrôle connu"
              : ""
          }
        />

        {establishment.interactions && establishment.interactions.length ? (
          <table className="table is-bordered is-hoverable direccte-interactions">
            <thead>
              <tr>
                <th>Pôle</th>
                <th>Date</th>
                <th>Objet</th>
                <th>Unité</th>
                <th>Agent</th>
                <th>Type</th>
                <th>Note</th>
                <th>Suite</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(lastInteractions).map(
                ([pole, lastInteraction]) => {
                  if (pole === "C" || pole === "3E_SRC") {
                    return (
                      <tr key={pole}>
                        <td>{pole}</td>
                        <td colspan="7">
                          {pole === "C"
                            ? "Donnée bientôt disponible"
                            : "Donnée non disponible"}
                        </td>
                      </tr>
                    );
                  } else {
                    return lastInteraction ? (
                      <tr key={lastInteraction}>
                        <td>
                          <Value value={pole} empty="ND" />
                        </td>
                        <td>
                          <Value value={lastInteraction.date} empty="ND" />
                        </td>
                        <td>
                          <Value value={lastInteraction.objet} empty="ND" />
                        </td>
                        <td>
                          <Value value={lastInteraction.unite} empty="ND" />
                        </td>
                        <td>
                          <Value value={lastInteraction.agent} empty="ND" />
                        </td>
                        <td>
                          <Value value={lastInteraction.type} empty="ND" />
                        </td>
                        <td>
                          <Value value={lastInteraction.note} empty="ND" />
                        </td>
                        <td>
                          <Value value={lastInteraction.suite} empty="ND" />
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td>{pole}</td>
                        <td colspan="7">Pas de date connue</td>
                      </tr>
                    );
                  }
                }
              )}
            </tbody>
          </table>
        ) : null}
      </section>
    );
  }
}

export default EstablishmentView;
