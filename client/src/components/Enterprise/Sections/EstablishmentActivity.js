import React from "react";

class EstablishmentActivity extends React.Component {
  render() {
    return (
      <section id="activity" className="enterprise-section">
        <h1 className="title h4">État et activité</h1>

        <dl className="dl row">
          <dt className="dt col-md-4">Date de création</dt>
          <dd className="dd col-md-8">[Date de création]</dd>

          <dt className="dt col-md-4">Etat de l'établissement</dt>
          <dd className="dd col-md-8">[Etat de l'établissement]</dd>

          <dt className="dt col-md-4">Date de l'état</dt>
          <dd className="dd col-md-8">[Date de l'état]</dd>

          <dt className="dt col-md-4">Activité</dt>
          <dd className="dd col-md-8">[Activité]</dd>

          <dt className="dt col-md-4">Activité économique depuis le</dt>
          <dd className="dd col-md-8">[Activité économique depuis le]</dd>

          <dt className="dt col-md-4">Modalité d'activité</dt>
          <dd className="dd col-md-8">[Modalité d'activité]</dd>

          <dt className="dt col-md-4">Marchand</dt>
          <dd className="dd col-md-8">[Marchand]</dd>

          <dt className="dt col-md-4">Association</dt>
          <dd className="dd col-md-8">[Association]</dd>

          <dt className="dt col-md-4">Etablissement employeur</dt>
          <dd className="dd col-md-8">[Etablissement employeur]</dd>

          <dt className="dt col-md-4">Tranche Effectif INSEE</dt>
          <dd className="dd col-md-8">[Tranche Effectif INSEE]</dd>

          <dt className="dt col-md-4">Année tranche Effectif INSEE</dt>
          <dd className="dd col-md-8">[Année tranche Effectif INSEE]</dd>

          <dt className="dt col-md-4">Dernier effectif physique</dt>
          <dd className="dd col-md-8">[Dernier effectif physique]</dd>

          <dt className="dt col-md-4">Date dernier effectif physique</dt>
          <dd className="dd col-md-8">[Date dernier effectif physique]</dd>

          <dt className="dt col-md-4">Source dernier effectif physique</dt>
          <dd className="dd col-md-8">[Source dernier effectif physique]</dd>
        </dl>
      </section>
    );
  }
}

export default EstablishmentActivity;
