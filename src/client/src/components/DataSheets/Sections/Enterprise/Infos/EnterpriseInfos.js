import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/pro-solid-svg-icons";

import Config from "../../../../../services/Config";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import Mandataires from "./Mandataires";
import ObservationRCS from "./ObservationRCS";

const EnterpriseInfos = ({ enterprise, headOffice }) => {
  const dashboardSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié"
  };

  const mandataires = enterprise.mandataires_sociaux || [];

  return (
    <section id="infos" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faHistory} />
        </span>
        <h2 className="title">Informations légales sur l’entreprise</h2>
      </div>
      <div className="section-datas">
        <Subcategory subtitle="Informations générales" source="Sirène">
          <Data
            name="Activité principale"
            value={`${enterprise.naf ? enterprise.naf : "-"} ${
              enterprise.libelle_naf ? enterprise.libelle_naf : ""
            }`}
          />
          <Data name="Forme juridique" value={enterprise.categorie_juridique} />
          <Data name="Catégorie" value={enterprise.categorie_entreprise} />
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

          <Data
            name="Tranche d'effectif"
            value={`${
              dashboardSizeRanges[enterprise.tranche_effectif]
            } (${enterprise.annee_tranche_effectif || "Année non renseignée"})`}
          />

          <Data name="Association" value={!!headOffice.association} />
          {headOffice.association && (
            <Data name="Numéro RNA" value={headOffice.association.id} />
          )}
        </Subcategory>
        <Subcategory subtitle="Informations juridiques">
          <Data
            name="Date immatriculation RCS"
            value={enterprise.rcs_date_immatriculation}
          />

          {enterprise.rcs_observations && (
            <ObservationRCS enterprise={enterprise} />
          )}

          <Data
            name="Capital Social"
            value={`${enterprise.capital_social} €`}
            emptyValue="non"
          />
          <Data
            name="Numéro de TVA intra communautaire"
            value={enterprise.numero_tva_intracommunautaire}
          />
        </Subcategory>
        <Subcategory subtitle="Mandataires sociaux">
          {mandataires.length ? (
            <Mandataires enterprise={enterprise} mandataires={mandataires} />
          ) : (
            <p className="has-text-centered pt-2">
              Aucun mandataire n{"'"}a été trouvé
            </p>
          )}
        </Subcategory>
      </div>
    </section>
  );
};

EnterpriseInfos.propTypes = {
  enterprise: PropTypes.object.isRequired,
  headOffice: PropTypes.object
};

export default EnterpriseInfos;
