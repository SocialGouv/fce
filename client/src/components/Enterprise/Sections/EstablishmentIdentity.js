import React from "react";
import Value from "../../../elements/Value";

class EstablishmentIdentity extends React.Component {
  render() {
    const { establishment, enterprise, headOffice } = this.props;

    return (
      <section id="identity-et" className="enterprise-section">
        <h1 className="title h4">Identité de l'établissement</h1>

        <dl className="dl row">
          <dt className="dt col-md-4">Enseigne</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.enseigne} empty="-" />
          </dd>

          <dt className="dt col-md-4">SIRET</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.siret} empty="-" />
          </dd>

          <dt className="dt col-md-4">Catégorie d'établissement</dt>
          <dd className="dd definition col-md-8">
            <Value value={establishment.categorie_etablissement} empty="-" />
          </dd>

          <dt className="dt col-md-4">Adresse</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.adresse} empty="-" />
          </dd>

          <dt className="dt col-md-4">Département</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.departement} empty="-" />
          </dd>

          <dt className="dt col-md-4">Région</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.region} empty="-" />
          </dd>
        </dl>
      </section>
    );
  }
}

export default EstablishmentIdentity;
