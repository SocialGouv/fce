import React from "react";
import Value from "../../../elements/Value";
import classNames from "classnames";

class Relation extends React.Component {
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
      <section id="relation" className="enterprise-section">
        <h1 className="title h4">Relation travail</h1>

        <dl className="dl row">
          <dt className="dt col-md-4">Unité de contrôle compétente</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.unite_controle_competente} empty="-" />
          </dd>
          <dt className="dt col-md-4">Code convention collective (IDCC)</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.codes_idcc} empty="-" />
          </dd>
          <dt className="dt col-md-4">Année convention collective (IDCC)</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.annee_idcc} empty="-" />
          </dd>
          <dt className="dt col-md-4">Déclaration AGEFIPH</dt>
          <dd className="dd col-md-8">Non disponible</dd>
          <dt className="dt col-md-4">(dernière année de conformité connue)</dt>
          <dd className="dd col-md-8">
            <Value
              value={establishment.agefiph_derniere_annee_conformite_connue}
              empty="-"
            />
          </dd>
          <dt className="dt col-md-12">
            Instances représentatives du personnel :
          </dt>
          <dd className="dd col-md-10 offset-md-2">
            Section(s) syndicale(s) : Non disponible
            <br />
            Comité social économique : Non disponible
          </dd>
          <dt className="dt col-md-8 mt-4">
            Nombre d'accords déposés au cours des 24 derniers mois :
          </dt>
          <dd className="dd col-md-4 mt-4">
            {establishment.accords ? establishment.accords.nb_accords : 0}
          </dd>
          {establishment.accords &&
          establishment.accords.nb_accords &&
          establishment.accords.details ? (
            <dd className="dd col-md-12">
              <a
                className="d-print-none"
                href="#relation"
                onClick={() => this.toggleElement("relation-accords")}
              >
                {this.state["relation-accords"] ? "Masquer" : "Voir"} le détail
              </a>
            </dd>
          ) : null}
          {establishment.accords && establishment.accords.nb_accords ? (
            <div
              id="relation-accords"
              className={classNames(
                {
                  "d-none": !this.state["relation-accords"]
                },
                "toggle-element",
                "d-print-block",
                "col-md-12"
              )}
            >
              <table className="table table-striped">
                <thead>
                  <th className="th">Accords par thématiqes</th>
                  <th className="th">Nombre Accords concernés</th>
                </thead>
                <tbody>
                  {Object.keys(establishment.accords.details).map(theme => (
                    <tr>
                      <td>{theme}</td>
                      <td>{establishment.accords.details[theme]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </dl>
      </section>
    );
  }
}

export default Relation;
