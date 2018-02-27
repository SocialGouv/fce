import React from "react";

class EnterpriseIdentity extends React.Component {
  render() {
    return (
      <section id="identity" className="enterprise-section bg-info text-white">
        <h1 className="title h4">Identité de l'entreprise</h1>

        <dl className="dl row">
          <dt className="dt col-md-4">SIREN</dt>
          <dd className="dd col-md-8">[SIREN]</dd>

          <dt className="dt col-md-4">Raison Sociale</dt>
          <dd className="dd definition col-md-8">[Raison Sociale]</dd>

          <dt className="dt col-md-4">Nom commercial</dt>
          <dd className="dd definition col-md-8">[Nom commercial]</dd>

          <dt className="dt col-md-4">Sigle</dt>
          <dd className="dd definition col-md-8">[Sigle]</dd>

          <dt className="dt col-md-4">Catégorie juridique</dt>
          <dd className="dd definition col-md-8">[Catégorie juridique]</dd>
        </dl>
      </section>
    );
  }
}

export default EnterpriseIdentity;
