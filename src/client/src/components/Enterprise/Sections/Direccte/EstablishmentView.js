import React from "react";
import Value from "../../../../elements/Value";
import Data from "./../SharedComponents/Data";
import { getLastInteraction } from "../../../../helpers/Interactions";

class EstablishmentView extends React.Component {
  toggleElement = id => {
    this.setState({
      [id]: !this.state[id]
    });
  };

  render() {
    const { establishment } = this.props;

    const lastInteractions = {
      pole_T: getLastInteraction(establishment.interactions_T, "T"),
      pole_C: getLastInteraction(establishment.interactions_C, "C"),
      pole_3E_SEER: getLastInteraction(
        establishment.interactions_3E,
        "3E-SEER"
      ),
      pole_3E_SRC: getLastInteraction(establishment.interactions_3E, "3E-SRC")
    };

    const { pole_T, pole_C, pole_3E_SEER, pole_3E_SRC } = lastInteractions;

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
              {pole_T === undefined ? (
                <tr>
                  <td>T</td>
                  <td>Pas de date connue</td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <Value value={pole_T.pole} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_T.date} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_T.objet} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_T.unite} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_T.agent} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_T.type} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_T.note} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_T.suite} empty="ND" />
                  </td>
                </tr>
              )}
              {pole_C === undefined ? (
                <tr>
                  <td>C</td>
                  <td>Données bientôt disponible</td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <Value value={pole_C.pole} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_C.date} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_C.objet} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_C.unite} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_C.agent} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_C.type} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_C.note} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_C.suite} empty="ND" />
                  </td>
                </tr>
              )}
              {pole_3E_SEER === undefined ? (
                <tr>
                  <td>3E - SEER</td>
                  <td>Pas de date connue</td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <Value value={pole_3E_SEER.pole} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SEER.date} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SEER.objet} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SEER.unite} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SEER.agent} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SEER.type} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SEER.note} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SEER.suite} empty="ND" />
                  </td>
                </tr>
              )}
              {pole_3E_SRC === undefined ? (
                <tr>
                  <td>3E - SRC</td>
                  <td>Données non disponible</td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <Value value={pole_3E_SRC.pole} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SRC.date} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SRC.objet} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SRC.unite} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SRC.agent} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SRC.type} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SRC.note} empty="ND" />
                  </td>
                  <td>
                    <Value value={pole_3E_SRC.suite} empty="ND" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : null}
      </section>
    );
  }
}

export default EstablishmentView;
