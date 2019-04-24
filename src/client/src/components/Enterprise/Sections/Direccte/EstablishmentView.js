import React from "react";
import Value from "../../../../elements/Value";
import Data from "./../SharedComponents/Data";

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
    const { establishment } = this.props;

    return (
      <section id="direccte" className="enterprise-section">
        <h2 className="title is-size-4">Visites et Contrôles de la Direccte</h2>

        <Data
          name="Unité de contrôle compétente (inspection du travail)"
          value={establishment.unite_controle_competente}
        />

        <Data
          name="Dernier contrôle  / dernière visite au cours des 24 derniers mois"
          value={
            establishment.totalInteractions &&
            establishment.totalInteractions.total === 0
              ? "pas de contrôle connu"
              : establishment.totalInteractions.total
          }
        />

        {establishment.interactions && establishment.interactions.length ? (
          <table className="table is-hoverable direccte-interactions">
            <thead>
              <tr>
                <th>Date</th>
                <th>Pôle</th>
                <th>Objet</th>
                <th>Unité</th>
                <th>Agent</th>
                <th>Type</th>
                <th>Notes</th>
                <th>Suite</th>
              </tr>
            </thead>
            <tbody>
              {establishment.interactions.map((dirvis, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Value value={dirvis.date} empty="-" />
                    </td>
                    <td>
                      <Value value={dirvis.pole} empty="-" />
                    </td>
                    <td> ND </td>
                    <td>
                      <Value value={dirvis.unite} empty="-" />
                    </td>
                    <td>
                      <Value value={dirvis.agent} empty="-" />{" "}
                    </td>
                    <td>
                      <Value value={dirvis.type} empty="-" />
                    </td>
                    <td>
                      <Value value={dirvis.note} empty="-" />
                    </td>
                    <td> ND </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </section>
    );
  }
}

export default EstablishmentView;
