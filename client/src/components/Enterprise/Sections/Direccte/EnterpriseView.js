import React from "react";
import classNames from "classnames";
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

    // return (
    //   <section id="direccte" className="enterprise-section">
    //     <h1 className="title h4">Interactions DIRECCTE</h1>

    //     {establishment.direccte && establishment.direccte.length ? (
    //       <div>
    //         <div className="text-center">
    //           <a
    //             className="d-print-none"
    //             href="#direccte-detail"
    //             onClick={() => this.toggleElement("direccte-detail")}
    //           >
    //             Voir le détail
    //           </a>
    //         </div>

    //         <div
    //           id="direccte-detail"
    //           className={classNames({
    //             "toggle-element": true,
    //             "d-none": !this.state["direccte-detail"],
    //             "d-print-block": true
    //           })}
    //         >
    //           <table className="table table-striped direccte-interactions">
    //             <thead>
    //               <tr>
    //                 <th>Date</th>
    //                 <th>Pôle</th>
    //                 <th>Objet</th>
    //                 <th>Unité</th>
    //                 <th>Agent</th>
    //                 <th>Type</th>
    //                 <th>Notes</th>
    //                 <th>Suite</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {establishment.direccte.map(dirvis => {
    //                 return (
    //                   <tr>
    //                     <td>
    //                       <Value value={dirvis.date} empty="-" />
    //                     </td>
    //                     <td>
    //                       <Value value={dirvis.pole} empty="-" />
    //                     </td>
    //                     <td>-</td>
    //                     <td>
    //                       <Value value={dirvis.unite} empty="-" />
    //                     </td>
    //                     <td>-</td>
    //                     <td>
    //                       <Value value={dirvis.type_intervention} empty="-" />
    //                     </td>
    //                     <td>
    //                       <Value value={dirvis.cible_intervention} empty="-" />
    //                     </td>
    //                     <td>-</td>
    //                   </tr>
    //                 );
    //               })}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     ) : (
    //       <p className="text-center">Non disponible</p>
    //     )}
    //   </section>
    // );
  }
}

export default EstablishmentView;
