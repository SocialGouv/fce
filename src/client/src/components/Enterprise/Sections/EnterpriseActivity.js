import React from "react";
import Value from "../../../elements/Value";
import classNames from "classnames";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/fontawesome-pro-solid";
import { toI18nDate } from "../../../helpers/Date";

class EnterpriseActivity extends React.Component {
  render() {
    const { enterprise } = this.props;

    const stateClass =
      enterprise.etat_entreprise === "A" ? "icon--success" : "icon--danger";

    return (
      <section id="activity" className="enterprise-section">
        <h2 className="title is-size-4">Informations sur l’entreprise</h2>

        <div className="columns">
          <h5 className="column is-3">Forme juridique</h5>
          <span className="column is-8">
            <Value value={enterprise.categorie_juridique} empty="-" />
          </span>
        </div>

        <div className="columns">
          <h5 className="column is-3">Activité Principale</h5>
          <span className="column is-8">
            <Value value={enterprise.naf} empty="-" />
            <span> - </span>
            <Value value={enterprise.libelle_naf} empty="-" />
          </span>
        </div>

        <div className="columns">
          <h5 className="column is-3">Date de création</h5>
          <span className="column is-8">
            <Value value={enterprise.date_de_creation} empty="-" />
          </span>
          {enterprise.date_de_radiation
            ? [
                <h5 className="column is-3" key="date_rad_label">
                  Date de radiation
                </h5>,
                <span className="column is-8" key="date_rad_value">
                  <Value value={enterprise.date_de_radiation} empty="-" />
                </span>
              ]
            : ""}
        </div>

        <div className="columns">
          <h5 className="column is-3">Date immatriculation RCS</h5>
          <span className="column is-8">
            <Value value={enterprise.rcs_date_immatriculation} empty="-" />
          </span>
        </div>

        {enterprise.rcs_information_libelle && (
          <div className="columns">
            <h5 className="column is-3">Observation RCS</h5>
            <span className="column is-8">
              <Value
                value={`${toI18nDate(enterprise.rcs_information_date, "L")} - ${
                  enterprise.rcs_information_libelle
                }`}
                empty="-"
              />
            </span>
          </div>
        )}

        <div className="columns">
          <h5 className="column is-3">Catégorie</h5>
          <span className="column is-8">
            <Value value={enterprise.categorie_entreprise} empty="-" />
          </span>
        </div>

        <div className="columns">
          <h5 className="column is-3">Tranche Effectif</h5>
          <span className="column is-8">
            <Value value={enterprise.tranche_effectif} empty="-" />
          </span>
        </div>

        <div className="columns">
          <h5 className="column is-3">Année tranche Effectif</h5>
          <span className="column is-8">
            <Value value={enterprise.annee_tranche_effectif} empty="-" />
          </span>
        </div>

        <div className="columns">
          <h5 className="column is-3">Siège social (SIRET)</h5>
          <span className="column is-8">
            <Value value={enterprise.siret_siege_social} empty="-" />
          </span>
        </div>

        <div className="columns">
          <h5 className="column is-3">Etablissements</h5>
          <span className="column is-8">
            <Value
              value={`${enterprise.nombre_etablissements_actifs} actif(s)`}
              empty="-"
            />
          </span>
        </div>

        <div className="columns">
          <h5 className="column is-3">Etat de l'entreprise</h5>
          <span className="column is-8">
            {enterprise.etat_entreprise && (
              <FontAwesomeIcon
                className={classNames(stateClass)}
                icon={faCircle}
              />
            )}
          </span>
        </div>

        <div className="columns">
          <h5 className="column is-3">Date de la mise à jour</h5>
          <span className="column is-8">
            <Value
              value={enterprise.etat_entreprise && enterprise.date_mise_a_jour}
              empty="-"
            />
          </span>
        </div>

        {!enterprise.attestation_dgfip ? null : (
          <div className="columns">
            <h5 className="column is-3">Attestation fiscale DGFIP</h5>
            <span className="column is-8">
              <Value
                value={!!enterprise.attestation_dgfip}
                empty="Non Disponible"
                no="Non Disponible"
              />
            </span>
            {enterprise.attestation_dgfip ? (
              <span className="span col-md-5">
                <a
                  href={enterprise.attestation_dgfip}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  télécharger le document
                </a>
              </span>
            ) : null}
          </div>
        )}

        {!enterprise.attestation_acoss ? null : (
          <div className="columns">
            <h5 className="column is-3">Attestation sociale ACOSS</h5>
            <span className="column is-8">
              <Value
                value={!!enterprise.attestation_acoss}
                empty="Non Disponible"
                no="Non Disponible"
              />
            </span>
            {enterprise.attestation_acoss ? (
              <span className="span col-md-5">
                <a
                  href={enterprise.attestation_acoss}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  télécharger le document
                </a>
              </span>
            ) : null}
          </div>
        )}
      </section>
    );
  }
}

export default EnterpriseActivity;
