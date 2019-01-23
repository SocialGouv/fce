import React from "react";
import Value from "../../../elements/Value";

class EnterpriseIdentity extends React.Component {
  render() {
    const { enterprise } = this.props;

    return (
      <section id="identity" className="enterprise-section bg-info text-white">
        <h1 className="title h4">Identité de l'entreprise</h1>

        <dl className="dl row">
          <dt className="dt col-md-4">SIREN</dt>
          <dd className="dd col-md-8">
            <Value value={enterprise.siren} empty="-" />
          </dd>

          {enterprise.nom || enterprise.prenom
            ? [
              <dt className="dt col-md-4" key="name_label">
                Nom
              </dt>,
              <dd className="dd definition col-md-8" key="name_value">
                <Value value={enterprise.nom} empty="-" />
              </dd>,
              <dt className="dt col-md-4" key="firstname_label">
                Prenom
              </dt>,
              <dd className="dd definition col-md-8" key="firstname_value">
                <Value value={enterprise.prenom} empty="-" />
              </dd>
            ] : [
                <dt className="dt col-md-4" key="rs_label">
                  Raison Sociale
                </dt>,
                <dd className="dd definition col-md-8" key="rs_value">
                  <Value value={enterprise.raison_sociale} empty="-" />
                </dd>
              ]
            }

          <dt className="dt col-md-4">Nom commercial</dt>
          <dd className="dd definition col-md-8">
            <Value value={enterprise.nom_commercial} empty="-" />
          </dd>

          <dt className="dt col-md-4">Sigle</dt>
          <dd className="dd definition col-md-8">
            <Value value={enterprise.sigle} empty="-" />
          </dd>

          <dt className="dt col-md-4">Catégorie juridique</dt>
          <dd className="dd definition col-md-8">
            <Value value={enterprise.categorie_juridique} empty="-" />
          </dd>
        </dl>
      </section>
    );
  }
}

export default EnterpriseIdentity;
