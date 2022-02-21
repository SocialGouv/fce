import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faSpinner } from "@fortawesome/free-solid-svg-icons";
import _get from "lodash.get";

import Config from "../../../../../services/Config";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import Finances from "./Finances";
import Mandataires from "./Mandataires";
import ObservationRCS from "./ObservationRCS";
import { getMonthName } from "../../../../../helpers/Date";
import { formatSiret, formatTva } from "../../../../../helpers/utils";
import AllEffectifsEtpButton from "../../../../../containers/AllEffectifsEtpButton";

const EnterpriseInfos = ({ enterprise, headOffice }) => {
  const [allEffectifsEtp, setAllEffectifsEtp] = useState(null);

  const dashboardSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié"
  };

  const isLoadingEffectifMensuelEtp = !enterprise.effectifMensuelEtp;
  const effectifEtpData = allEffectifsEtp ?? enterprise.effectifMensuelEtp;
  const showEffectifEtpButton =
    Array.isArray(enterprise.effectifMensuelEtp) &&
    enterprise.effectifMensuelEtp.length > 0 &&
    !allEffectifsEtp;

  const EffectifEtpDataComponents = !!effectifEtpData?.length ? (
    effectifEtpData.map(({ annee, mois, effectifs_mensuels }) => (
      <Data
        key={`${annee}-${mois}`}
        name={`Effectif ETP ${getMonthName(mois)}`}
        value={effectifs_mensuels}
        sourceCustom={`Acoss / DSN ${getMonthName(mois)} ${annee}`}
        hasNumberFormat
      />
    ))
  ) : (
    <Data name={`Effectif ETP`} />
  );

  const mandataires = enterprise.mandataires_sociaux || [];

  const anneeEffectifAnnuelEtp = _get(
    enterprise,
    "effectifAnnuelEtp.annee",
    ""
  );
  return (
    <section id="infos" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faHistory} />
        </span>
        <h2 className="title">Informations légales sur l’entreprise</h2>
      </div>
      <div className="section-datas">
        <Subcategory subtitle="Informations générales" sourceSi="Sirène">
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
            value={formatSiret(enterprise.siret_siege_social)}
          />
          <Data
            name="Etablissements"
            value={
              enterprise.nombre_etablissements_actifs &&
              `${
                enterprise.nombre_etablissements_actifs
              } actif(s) et ${enterprise.etablissements.length -
                enterprise.nombre_etablissements_actifs} fermé(s)`
            }
          />

          <Data name="Association" value={!!headOffice.association} />
          {headOffice.association && (
            <Data name="Numéro RNA" value={headOffice.association.id} />
          )}

          <Data
            name="Tranche d'effectif"
            value={
              enterprise.tranche_effectif &&
              dashboardSizeRanges[enterprise.tranche_effectif]
            }
            sourceSi={"Sirène-year"}
            sourceDate={enterprise.annee_tranche_effectif}
          />
          {isLoadingEffectifMensuelEtp ? (
            <Data
              name={`Effectif ETP`}
              value={
                <div>
                  <span>Chargement en cours </span>
                  <FontAwesomeIcon icon={faSpinner} spin />
                </div>
              }
            />
          ) : (
            EffectifEtpDataComponents
          )}
          {showEffectifEtpButton && (
            <AllEffectifsEtpButton
              type="entreprise"
              identifier={enterprise.siren}
              setAllEffectifsEtp={setAllEffectifsEtp}
            />
          )}
          <Data
            name={`Effectif ${anneeEffectifAnnuelEtp} en équivalent temps plein`}
            value={_get(enterprise, "effectifAnnuelEtp.effectifs_annuels")}
            sourceCustom={`Acoss / DSN ${anneeEffectifAnnuelEtp}`}
            hasNumberFormat
          />
        </Subcategory>

        <Subcategory
          subtitle="Informations juridiques"
          sourceCustom="Infogreffe - RCS et DGFIP"
        >
          <div>
            <span>
              Informations d'immatriculation (contenues dans un extrait Kbis/D1)
            </span>{" "}
            : consulter le(s) justificatif(s) sur{" "}
            <a
              href={`https://annuaire-entreprises.data.gouv.fr/justificatif/${enterprise.siren}`}
            >
              annuaire entreprise
            </a>
          </div>
          <div className="section-datas__list-description">
            À partir de novembre 2021, les entreprises immatriculées au RCS ou
            au RNM n'ont plus à fournir leur extrait Kbis/D1 dans leurs
            démarches administratives
            <br /> Décrets du 21 mai 2021 n°2021-631 et 2021-632
          </div>

          <Data
            name="Date immatriculation RCS"
            value={enterprise.rcs_date_immatriculation}
          />

          {enterprise.rcs_observations && (
            <ObservationRCS enterprise={enterprise} />
          )}

          <Data
            name="Capital Social"
            value={enterprise.capital_social && `${enterprise.capital_social}`}
            hasNumberFormat
            numberFormatOptions={{ style: "currency" }}
          />
          <Data
            name="Numéro de TVA intra communautaire"
            value={
              enterprise.numero_tva_intracommunautaire &&
              formatTva(enterprise.numero_tva_intracommunautaire)
            }
          />
        </Subcategory>
        <Subcategory subtitle="Données financières" sourceCustom="DGFIP">
          <Finances establishment={headOffice} />
        </Subcategory>
        <Subcategory
          subtitle="Mandataires sociaux"
          sourceCustom="Infogreffe - RCS"
        >
          <Mandataires mandataires={mandataires} />
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
