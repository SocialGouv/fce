import React from "react";
import Value from "../../../elements/Value";
import { toI18nDate } from "../../../helpers/Date";

class EnterpriseActivity extends React.Component {
  render() {
    const { enterprise } = this.props;

    return (
      <section id="activity" className="enterprise-section">
        <h1 className="title h4">État et activité</h1>

        <dl className="dl row">
          <dt className="dt col-md-4">Date immatriculation RCS</dt>
          <dd className="dd col-md-8">
            <Value
              value={toI18nDate(enterprise.date_immatriculation_rcs)}
              empty="-"
            />
          </dd>

          <dt className="dt col-md-4">Date de création</dt>
          <dd className="dd col-md-8">
            <Value value={toI18nDate(enterprise.date_de_creation)} empty="-" />
          </dd>

          <dt className="dt col-md-4">Date de radiation</dt>
          <dd className="dd col-md-8">
            <Value value={toI18nDate(enterprise.date_de_radiation)} empty="-" />
          </dd>

          <dt className="dt col-md-4">Etat de l'entreprise</dt>
          <dd className="dd col-md-8">
            <Value
              value={
                enterprise.etat_entreprise && enterprise.etat_entreprise.label
              }
              empty="-"
            />
          </dd>

          <dt className="dt col-md-4">Date de l'état</dt>
          <dd className="dd col-md-8">
            <Value
              value={toI18nDate(
                enterprise.etat_entreprise && enterprise.etat_entreprise.date
              )}
              empty="-"
            />
          </dd>

          <dt className="dt col-md-4">Catégorie d'entreprise</dt>
          <dd className="dd col-md-8">
            <Value value={enterprise.categorie_entreprise} empty="-" />
          </dd>

          <dt className="dt col-md-4">Activité Principale</dt>
          <dd className="dd col-md-8">
            <Value value={enterprise.activite} empty="-" />
          </dd>

          <dt className="dt col-md-4">Tranche Effectif</dt>
          <dd className="dd col-md-8">
            <Value value={enterprise.tranche_effectif} empty="-" />
          </dd>

          <dt className="dt col-md-4">Année tranche Effectif</dt>
          <dd className="dd col-md-8">
            <Value value={enterprise.annee_tranche_effectif} empty="-" />
          </dd>

          <dt className="dt col-md-4">Nombre d'établissements actifs</dt>
          <dd className="dd col-md-8">
            <Value value={enterprise.nombre_etablissements_actifs} empty="-" />
          </dd>
        </dl>
      </section>
    );
  }
}

export default EnterpriseActivity;
