import React from "react";
import Value from "../../../elements/Value";

class Relation extends React.Component {
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

          <dt className="dt col-md-4">Code IDCC</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.codes_idcc} empty="-" />
          </dd>

          <dt className="dt col-md-4">Année IDCC</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.annee_idcc} empty="-" />
          </dd>

          <dt className="dt col-md-4">Déclaration AGEFIPH</dt>
          <dd className="dd col-md-8" />

          <dt className="dt col-md-4">Dernière année de conformité connue</dt>
          <dd className="dd col-md-8">
            <Value
              value={establishment.agefiph_derniere_annee_conformite_connue}
              empty="-"
            />
          </dd>
        </dl>
      </section>
    );
  }
}

export default Relation;
