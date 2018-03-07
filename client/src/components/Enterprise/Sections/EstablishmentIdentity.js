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

          {enterprise.categorie_juridique
            ? [
                <dt className="dt col-md-4" key={0}>
                  Raison Sociale
                </dt>,
                <dd className="dd definition col-md-8" key={1}>
                  <Value value={enterprise.raison_sociale} empty="-" />
                </dd>
              ]
            : [
                <dt className="dt col-md-4" key={0}>
                  Nom
                </dt>,
                <dd className="dd definition col-md-8" key={1}>
                  <Value value={enterprise.nom} empty="-" />
                </dd>,
                <dt className="dt col-md-4" key={2}>
                  Prenom
                </dt>,
                <dd className="dd definition col-md-8" key={3}>
                  <Value value={enterprise.prenom} empty="-" />
                </dd>
              ]}

          <dt className="dt col-md-4">Nom commercial</dt>
          <dd className="dd definition col-md-8">
            <Value value={enterprise.nom_commercial} empty="-" />
          </dd>

          <dt className="dt col-md-4">SIREN</dt>
          <dd className="dd col-md-8">
            <Value value={enterprise.siren} empty="-" />
          </dd>

          <dt className="dt col-md-4">SIRET</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.siret} empty="-" />
          </dd>

          <dt className="dt col-md-4">Catégorie d'établissement</dt>
          <dd className="dd definition col-md-8">
            <Value value={establishment.categorie_etablissement} empty="-" />
          </dd>

          <dt className="dt col-md-4">SIRET du siège social</dt>
          <dd className="dd col-md-8">
            <Value value={headOffice.siret} empty="-" />
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
