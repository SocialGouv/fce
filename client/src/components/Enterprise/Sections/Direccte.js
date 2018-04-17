import React from "react";
import classNames from "classnames";
import Value from "../../../elements/Value";

class Direccte extends React.Component {
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
    return (
      <section id="direccte" className="enterprise-section">
        <h1 className="title h4">Intéractions DIRECCTE</h1>

        {this.props.establishment.direccte &&
        this.props.establishment.direccte.length ? (
          <div>
            <div className="text-center">
              <a
                className="d-print-none"
                href="#direccte-detail"
                onClick={() => this.toggleElement("direccte-detail")}
              >
                Voir le détail
              </a>
            </div>

            <div
              id="direccte-detail"
              className={classNames({
                "toggle-element": true,
                "d-none": !this.state["direccte-detail"],
                "d-print-block": true
              })}
            >
              <table className="table table-striped direccte-interactions">
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
                  {this.props.establishment.direccte.map((dirvis, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Value value={dirvis.date} empty="-" />
                        </td>
                        <td>
                          <Value value={dirvis.pole} empty="-" />
                        </td>
                        <td>-</td>
                        <td>
                          <Value value={dirvis.unite} empty="-" />
                        </td>
                        <td>-</td>
                        <td>
                          <Value value={dirvis.type_intervention} empty="-" />
                        </td>
                        <td>
                          <Value value={dirvis.cible_intervention} empty="-" />
                        </td>
                        <td>-</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center">Non disponible</p>
        )}
      </section>
    );
  }
}

export default Direccte;
