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
    console.log(this.props);
    return (
      <section id="direccte" className="enterprise-section">
        <h1 className="title h4">Intéractions DIRECCTE</h1>

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
                <th>Unité de contrôle</th>
                <th>Type</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {this.props.establishment.direccte.map(dirvis => {
                console.log(dirvis);
                return (
                  <tr>
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
                    <td>
                      <Value value={dirvis.type_intervention} empty="-" />
                    </td>
                    <td>
                      <Value value={dirvis.cible_intervention} empty="-" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default Direccte;
