import React from "react";
import Value from "../../../../elements/Value";
import { Link } from "react-router-dom";

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
    const { enterprise } = this.props;

    const direccte = Object.values(
      enterprise.etablissements.reduce((data, etab) => {
        (etab.direccte || []).forEach(dirvis => {
          const { siret } = etab;
          if (!data[siret]) data[siret] = { siret, count: 0 };

          data[siret].count++;
        });

        return data;
      }, {})
    );

    const total = direccte.reduce((acc, etab) => (acc += etab.count), 0);

    return (
      <section id="direccte" className="enterprise-section">
        <h1 className="title h4">Interactions avec la DIRECCTE</h1>
        <dl className="dl row">
          <dt className="dt col-md-9">
            Nombre total d'interactions avec l'entreprise
          </dt>
          <dd className="dd col-md-3">
            <Value value={total} empty="-" />
          </dd>
        </dl>
        <table className="table table-striped direccte-interactions">
          <thead>
            <tr className="row">
              <th className="col-md-9">SIRET</th>
              <th className="col-md-3">Nombre d'interactions</th>
            </tr>
          </thead>
          <tbody>
            {direccte.map(etab => (
              <tr key={etab.siret} className="row">
                <td className="col-md-9">
                  <Link to={`/establishment/${etab.siret}`}>{etab.siret}</Link>
                </td>
                <td className="col-md-3">{etab.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default EstablishmentView;
