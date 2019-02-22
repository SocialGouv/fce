import React from "react";
import classNames from "classnames";
import Value from "../../../../elements/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faCalendarExclamation,
  faChevronDown
} from "@fortawesome/fontawesome-pro-solid";

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
        <h2 className="title is-size-4">Visites / Contrôles</h2>

        <small>
          Visite / Contrôle / suivi de la DIRECCTE (selon données disponibles
          dans le prototype)
        </small>

        <div className="columns">
          <h5 className="column is-3">Unité de contrôle compétente</h5>
          <span className="column is-8">
            <Value value={establishment.unite_controle_competente} empty="-" />
          </span>
        </div>

        <div className="direccte-excerpt">
          <div className="direccte-excerpt--pole">
            <span className="direccte-excerpt--pole-key">Pôle T</span>
            <span className="direccte-excerpt--pole-value">
              {establishment.totalInteractions &&
                establishment.totalInteractions["T"]}
            </span>
            <FontAwesomeIcon icon={faCalendarExclamation} />
          </div>
          <div className="direccte-excerpt--pole">
            <span className="direccte-excerpt--pole-key">Pôle C</span>
            <span className="direccte-excerpt--pole-value">
              {establishment.totalInteractions &&
                establishment.totalInteractions["C"]}
            </span>
            <FontAwesomeIcon icon={faCalendarExclamation} />
          </div>
          <div className="direccte-excerpt--pole">
            <span className="direccte-excerpt--pole-key">Pôle 3E</span>
            <span className="direccte-excerpt--pole-value">
              {establishment.totalInteractions &&
                establishment.totalInteractions["3E"]}
            </span>
            <FontAwesomeIcon icon={faCalendarExclamation} />
          </div>
        </div>

        <div className="accordions">
          <div className="accordion">
            <div className="accordion-header toggle">
              <span className=""> Détail des visites et contrôles </span>
              <span className="">
                <button className="button is-light is-rounded">
                  <span className="icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </button>
              </span>
            </div>
            <div className="accordion-body">
              <div className="accordion-content">
                {establishment.interactions &&
                establishment.interactions.length ? (
                  <table className="table is-striped direccte-interactions">
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
                ) : (
                  <table className="table is-striped direccte-interactions">
                    <thead>
                      <tr>
                        <th> Date </th> <th> Pôle </th> <th> Objet </th>
                        <th> Unité </th> <th> Agent </th> <th> Type </th>
                        <th> Notes </th> <th> Suite </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td> 27 / 06 / 2018 </td> <td> 3 E </td> <td> ND </td>
                        <td> Unité transport </td> <td> ND </td>
                        <td> Visite </td> <td> - </td> <td> ND </td>
                      </tr>
                      <tr>
                        <td> 01 / 02 / 2018 </td> <td> T </td> <td> ND </td>
                        <td> Unité de contrôle n° 1 de Haute Garonne </td>
                        <td> ND </td> <td> Contrôle </td> <td> - </td>
                        <td> ND </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default EstablishmentView;
