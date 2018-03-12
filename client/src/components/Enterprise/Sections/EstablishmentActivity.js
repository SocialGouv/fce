import React from "react";
import Value from "../../../elements/Value";

class EstablishmentActivity extends React.Component {
  render() {
    const { establishment } = this.props;

    const codeMarchand = establishment.marchand;
    let codeMarchandStr = null;
    if (codeMarchand === "MARCH") {
      codeMarchandStr = "Marchand (MARCH)";
    } else if (code_marchand === "NMPRI") {
      codeMarchandStr = "Non marchand, ressources du privé (NMPRI)";
    } else if (code_marchand === "NMPUB") {
      codeMarchandStr = "Non marchand, ressources du public (NMPUB)";
    } else if (codeMarchand) {
      codeMarchandStr = `(${code_marchand})`;
    }

    return (
      <section id="activity" className="enterprise-section">
        <h1 className="title h4">État et activité</h1>

        <dl className="dl row">
          <dt className="dt col-md-4">Date de création</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.date_creation} empty="-" />
          </dd>

          <dt className="dt col-md-4">Etat de l'établissement</dt>
          <dd className="dd col-md-8">
            <Value
              value={
                establishment.etat_etablissement &&
                establishment.etat_etablissement.label
              }
              empty="-"
            />
          </dd>

          <dt className="dt col-md-4">Date de l'état</dt>
          <dd className="dd col-md-8">
            <Value
              value={
                establishment.etat_etablissement &&
                establishment.etat_etablissement.date
              }
              empty="-"
            />
          </dd>

          <dt className="dt col-md-4 mt-4">Activité</dt>
          <dd className="dd col-md-8 mt-4">
            <Value value={establishment.activite} empty="-" />
          </dd>

          <dt className="dt col-md-4">Activité économique depuis le</dt>
          <dd className="dd col-md-8">
            <Value
              value={establishment.date_debut_activite_economique}
              empty="-"
            />
          </dd>

          <dt className="dt col-md-4">Modalité d'activité</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.modalite_activite} empty="-" />
          </dd>

          <dt className="dt col-md-4 mt-4">Marchand</dt>
          <dd className="dd col-md-8 mt-4">
            <Value value={codeMarchandStr} empty="-" />
          </dd>

          <dt className="dt col-md-4">Association</dt>
          <dd className="dd col-md-8">
            <Value
              value={establishment.association && "Oui"}
              no="Non"
              empty="-"
            />
          </dd>

          <dt className="dt col-md-4 mt-4">Etablissement employeur</dt>
          <dd className="dd col-md-8 mt-4">
            <Value
              value={establishment.etablissement_employeur && "Oui"}
              no="Non"
              empty="-"
            />
          </dd>

          <dt className="dt col-md-4">Tranche Effectif INSEE</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.tranche_effectif_insee} empty="-" />
          </dd>

          <dt className="dt col-md-4">Année tranche Effectif INSEE</dt>
          <dd className="dd col-md-8">
            <Value
              value={establishment.annee_tranche_effectif_insee}
              empty="-"
            />
          </dd>

          <dt className="dt col-md-4">Dernier effectif physique</dt>
          <dd className="dd col-md-8">
            <Value value={establishment.dernier_effectif_physique} empty="-" />
          </dd>

          <dt className="dt col-md-4">Date dernier effectif physique</dt>
          <dd className="dd col-md-8">
            <Value
              value={establishment.date_dernier_effectif_physique}
              empty="-"
            />
          </dd>

          <dt className="dt col-md-4">Source dernier effectif physique</dt>
          <dd className="dd col-md-8">
            <Value
              value={establishment.source_dernier_effectif_physique}
              empty="-"
            />
          </dd>
        </dl>
      </section>
    );
  }
}

export default EstablishmentActivity;
