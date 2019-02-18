import React from "react";
import { Link } from "react-router-dom";
import Value from "../../../elements/Value";

class EnterpriseIdentity extends React.Component {
  render() {
    const { enterprise } = this.props;

    return (
      <section id="identity" className="enterprise-section">
        <h2 className="title">Identité de l'entreprise</h2>

        <div className="columns">
          <h5 className="column is-3">SIREN</h5>
          <span className="column is-8">
            <Value value={enterprise.siren} empty="-" />
          </span>
        </div>
        <div className="columns">
          {enterprise.nom || enterprise.prenom
            ? [
                <h5 className="column is-3" key="name_label">
                  Nom
                </h5>,
                <span className="column is-8" key="name_value">
                  <Value value={enterprise.nom} empty="-" />
                </span>,
                <h5 className="column is-3" key="firstname_label">
                  Prenom
                </h5>,
                <span className="column is-8" key="firstname_value">
                  <Value value={enterprise.prenom} empty="-" />
                </span>
              ]
            : [
                <h5 className="column is-3" key="rs_label">
                  Raison Sociale
                </h5>,
                <span className="column is-8" key="rs_value">
                  <Value value={enterprise.raison_sociale} empty="-" />
                </span>
              ]}
        </div>
        <div className="columns">
          <h5 className="column is-3">Nom commercial</h5>
          <span className="column is-8">
            <Value value={enterprise.nom_commercial} empty="-" />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Sigle</h5>
          <span className="column is-8">
            <Value value={enterprise.sigle} empty="-" />
          </span>
        </div>

        <div className="columns">
          <h5 className="column is-3">Catégorie juridique</h5>
          <span className="column is-8">
            <Value value={enterprise.categorie_juridique} empty="-" />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Siège social</h5>
          <span className="column is-8">
            <Link to={`/establishment/${enterprise.siret_siege_social}`}>
              <Value value={enterprise.siret_siege_social} empty="" />
            </Link>
          </span>
        </div>
      </section>
    );
  }
}

export default EnterpriseIdentity;
