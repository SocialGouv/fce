import React from "react";

class EnterpriseActivity extends React.Component {
  render() {
    return (
      <section id="activity" className="enterprise-section">
        <h1 className="title h4">État et activité</h1>

        <dl className="dl row">
          <dt className="dt col-md-4">Date immatriculation RCS</dt>
          <dd className="dd col-md-8">[Date immatriculation RCS]</dd>

          <dt className="dt col-md-4">Date de création</dt>
          <dd className="dd col-md-8">[Date de création]</dd>

          <dt className="dt col-md-4">Date de radiation</dt>
          <dd className="dd col-md-8">[Date de radiation]</dd>

          <dt className="dt col-md-4">Etat de l'entreprise</dt>
          <dd className="dd col-md-8">[Etat de l'entreprise]</dd>

          <dt className="dt col-md-4">Date de l'état</dt>
          <dd className="dd col-md-8">[Date de l'état]</dd>

          <dt className="dt col-md-4">Catégorie d'entreprise</dt>
          <dd className="dd col-md-8">[Catégorie d'entreprise]</dd>

          <dt className="dt col-md-4">Activité Principale</dt>
          <dd className="dd col-md-8">[Activité Principale]</dd>

          <dt className="dt col-md-4">Tranche Effectif</dt>
          <dd className="dd col-md-8">[Tranche Effectif]</dd>

          <dt className="dt col-md-4">Année tranche Effectif</dt>
          <dd className="dd col-md-8">[Année tranche Effectif]</dd>

          <dt className="dt col-md-4">Nombre d'établements actifs</dt>
          <dd className="dd col-md-8">[Nombre d'établements actifs]</dd>
        </dl>
      </section>
    );
  }
}

export default EnterpriseActivity;
