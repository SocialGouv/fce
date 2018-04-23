import React from "react";
import classNames from "classnames";
import Value from "../../../../elements/Value";

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
        <h1 className="title h4">Interactions DIRECCTE</h1>
        <p>
          <small>
            Visite / Contrôle / suivi de la DIRECCTE (selon données disponibles
            dans le prototype)
          </small>
        </p>
        {establishment.direccte && establishment.direccte.length ? (
          <div>
            <div className="row justify-content-md-center">
              <div className="col-xs-12 col-sm-8 col-md-6">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Pole</th>
                      <th className="text-center">Nombre d'interactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {establishment.direccte
                      .reduce(
                        (ints, dirvis) => {
                          ints.counts[dirvis.pole]++;
                          ints.table = Object.keys(ints.counts).map(key => ({
                            key,
                            value: ints.counts[key]
                          }));
                          return ints;
                        },
                        {
                          counts: { T: 0, C: 0, "3E": 0 },
                          table: []
                        }
                      )
                      .table.map((pole, index) => (
                        <tr key={index}>
                          <th>{pole.key}</th>
                          <td className="text-center">{pole.value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-center">
              <a
                className="d-print-none"
                href="#direccte-detail"
                onClick={() => this.toggleElement("direccte-detail")}
              >
                {this.state["direccte-detail"] ? "Masquer" : "Voir"} le détail
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
                  {establishment.direccte.map((dirvis, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Value value={dirvis.date} empty="-" />
                        </td>
                        <td>
                          <Value value={dirvis.pole} empty="-" />
                        </td>
                        <td>ND</td>
                        <td>
                          <Value value={dirvis.unite} empty="-" />
                        </td>
                        <td>ND</td>
                        <td>
                          <Value value={dirvis.type_intervention} empty="-" />
                        </td>
                        <td>
                          <Value value={dirvis.cible_intervention} empty="-" />
                        </td>
                        <td>ND</td>
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

export default EstablishmentView;
