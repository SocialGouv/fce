import React from "react";
import Value from "../../../../shared/Value";
import { toI18nDate } from "../../../../../helpers/Date";
import Config from "../../../../../services/Config";
import Data from "../../SharedComponents/Data";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/fontawesome-pro-solid";

const EnterpriseActivity = ({ enterprise, headOffice }) => {
  const dashboardSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié"
  };

  return (
    <section id="infos" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faHistory} />
        </span>
        <h2 className="title">Informations légales sur l’entreprise</h2>
      </div>
      <div className="section-datas">
        <Data name="Forme juridique" value={enterprise.categorie_juridique} />
        <Data
          name="Activité principale"
          value={`${enterprise.naf ? enterprise.naf : "-"} ${
            enterprise.libelle_naf ? enterprise.libelle_naf : ""
          }`}
        />
        <Data name="Date de création" value={enterprise.date_de_creation} />
        <Data
          name="Date immatriculation RCS"
          value={enterprise.rcs_date_immatriculation}
        />
        {enterprise.rcs_observations && (
          <Data
            name="Observations RCS"
            value={
              <ul className="rcs-observations">
                {enterprise.rcs_observations.map(({ date, libelle }) => (
                  <li
                    key={`rcs-obs-${date}-${libelle}`}
                    className="rcs-observations-item"
                  >{`${toI18nDate(date, "L")} - ${libelle}`}</li>
                ))}
              </ul>
            }
          />
        )}
        <Data name="Catégorie" value={enterprise.categorie_entreprise} />
        <Data
          name="Tranche d'effectif"
          value={dashboardSizeRanges[enterprise.tranche_effectif]}
        />
        <Data
          name="Année tranche d'effectif"
          value={enterprise.annee_tranche_effectif}
        />
        <Data
          name="Siège social (SIRET)"
          value={enterprise.siret_siege_social}
        />
        <Data
          name="Etablissements"
          value={`${
            enterprise.nombre_etablissements_actifs
          } actif(s) et ${enterprise.etablissements.length -
            enterprise.nombre_etablissements_actifs} fermé(s)`}
        />

        {enterprise.attestation_dgfip && (
          <div className="columns">
            <h5 className="column is-3">Attestation fiscale DGFIP</h5>
            <span className="column is-8">
              <Value
                value={!!enterprise.attestation_dgfip}
                empty="Non Disponible"
                no="Non Disponible"
              />
            </span>
            {enterprise.attestation_dgfip && (
              <span className="span col-md-5">
                <a
                  href={enterprise.attestation_dgfip}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  télécharger le document
                </a>
              </span>
            )}
          </div>
        )}

        {enterprise.attestation_acoss && (
          <div className="columns">
            <h5 className="column is-3">Attestation sociale ACOSS</h5>
            <span className="column is-8">
              <Value
                value={!!enterprise.attestation_acoss}
                empty="Non Disponible"
                no="Non Disponible"
              />
            </span>
            {enterprise.attestation_acoss && (
              <span className="span col-md-5">
                <a
                  href={enterprise.attestation_acoss}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  télécharger le document
                </a>
              </span>
            )}
          </div>
        )}

        <Data name="Association" value={!!headOffice.association} />
        {headOffice.association && (
          <Data name="Numéro RNA" value={headOffice.association.id} />
        )}
        {headOffice.association &&
        headOffice.document_association &&
        headOffice.document_association.url ? (
          <span>
            <span>Télécharger le document de l'association </span>
            <a
              href={headOffice.document_association.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              les derniers statuts
            </a>
          </span>
        ) : null}
      </div>
    </section>
  );
};

export default EnterpriseActivity;
