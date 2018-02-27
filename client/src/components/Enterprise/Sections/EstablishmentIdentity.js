import React from "react";

class EstablishmentIdentity extends React.Component {
  render() {
    return (
      <section id="identity" className="enterprise-section bg-info text-white">
        <h1 className="title h4">Identité de l'établissement</h1>

        <dl className="dl row">
          <dt className="dt col-md-4">Enseigne</dt>
          <dd className="dd col-md-8">[Enseigne]</dd>

          <dt className="dt col-md-4">Raison Sociale</dt>
          <dd className="dd definition col-md-8">[Raison Sociale]</dd>

          <dt className="dt col-md-4">Nom commercial</dt>
          <dd className="dd definition col-md-8">[Nom commercial]</dd>

          <dt className="dt col-md-4">SIREN</dt>
          <dd className="dd col-md-8">[SIREN]</dd>

          <dt className="dt col-md-4">SIRET</dt>
          <dd className="dd col-md-8">[SIRET]</dd>

          <dt className="dt col-md-4">Catégorie d'établissement</dt>
          <dd className="dd definition col-md-8">
            [Catégorie d'établissement]
          </dd>

          <dt className="dt col-md-4">SIRET du siège social</dt>
          <dd className="dd col-md-8">[SIRET du siège social]</dd>

          <dt className="dt col-md-4">Adresse</dt>
          <dd className="dd col-md-8">[Adresse]</dd>

          <dt className="dt col-md-4">Département</dt>
          <dd className="dd col-md-8">[Département]</dd>

          <dt className="dt col-md-4">Région</dt>
          <dd className="dd col-md-8">[Région]</dd>
        </dl>
      </section>
    );
  }
}

export default EstablishmentIdentity;
