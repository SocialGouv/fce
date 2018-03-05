import React from "react";
import classNames from "classnames";

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
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Pôle</th>
                <th>Unité de contrôle</th>
                <th>Type</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>15/10/2017</td>
                <td>C</td>
                <td>Brigade viticole</td>
                <td>enquête</td>
                <td>test</td>
              </tr>
              <tr>
                <td>15/11/2017</td>
                <td>3E</td>
                <td>SEI</td>
                <td>enquête</td>
                <td>test</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default Direccte;
