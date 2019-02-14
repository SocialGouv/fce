import React from "react";
import Value from "../../../elements/Value";

class EstablishmentIdentity extends React.Component {
  render() {
    const { establishment } = this.props;

    return (
      <section id="identity-et" className="enterprise-section">
        <h2 className="title is-size-4">Identité de l'établissement</h2>

        <dl className="dl columns">
          <dt className="dt column is-3">Siège social</dt>
          <dd className="dd column is-9">
            <Value value={establishment.siege_social} empty="-" />
          </dd>
        </dl>
        <dl className="dl columns">
          <dt className="dt column is-3">Enseigne</dt>
          <dd className="dd column is-8">
            <Value value={establishment.enseigne} empty="-" />
          </dd>
        </dl>
        <dl className="dl columns">
          <dt className="dt column is-3">SIRET</dt>
          <dd className="dd column is-8">
            <Value value={establishment.siret} empty="-" />
          </dd>
        </dl>
        <dl className="dl columns">
          <dt className="dt column is-3">Catégorie d'établissement</dt>
          <dd className="dd definition column is-8">
            <Value value={establishment.categorie_etablissement} empty="-" />
          </dd>
        </dl>
        <dl className="dl columns">
          <dt className="dt column is-3">Adresse</dt>
          <dd className="dd column is-8">
            <Value value={establishment.adresse} breakLines={true} empty="-" />
          </dd>
        </dl>
        <dl className="dl columns">
          <dt className="dt column is-3">Département</dt>
          <dd className="dd column is-8">
            <Value
              value={
                establishment.departement
                  ? establishment.departement
                  : establishment.adresse_components.code_postal.slice(0, 2)
              }
              empty="-"
            />
          </dd>
        </dl>
        <dl className="dl columns">
          <dt className="dt column is-3">Région</dt>
          <dd className="dd column is-8">
            <Value value={establishment.region} empty="-" />
          </dd>
        </dl>
      </section>
    );
  }
}

export default EstablishmentIdentity;
