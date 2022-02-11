import { faHistory, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { merge } from "lodash";
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";

import AllEffectifsEtpButton from "../../../../../containers/AllEffectifsEtpButton";
import Association from "../../../../../containers/Association/Association";
import { getMonthName } from "../../../../../helpers/Date";
import { formatSiret, formatTva } from "../../../../../helpers/utils";
import Config from "../../../../../services/Config";
import {
  getActiveEtablissementsCount,
  getCapitalSocial,
  getCategorie,
  getCategorieJuridiqueLabel,
  getDateImmatriculationRcs,
  getEffectifsAnnuelAnnee,
  getEffectifsAnnuelValue,
  getEffectifsMensuels,
  getEstablishmentsCount,
  getMandatairesSociaux,
  getNafCode,
  getNafLabel,
  getNumeroTvaIntracommunautaire,
  getRcsObservations,
  getSiegeSocial,
  getSiren,
  getSiretSiegeSocial,
  getTrancheEffectifs,
} from "../../../../../utils/entreprise/entreprise";
import { getSiret } from "../../../../../utils/establishment/establishment";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import { useEntrepriseInfos } from "./EnterpriseInfos.gql";
import Finances from "./Finances";
import Mandataires from "./Mandataires";
import ObservationRCS from "./ObservationRCS";

const EnterpriseInfos = ({ enterprise: baseEntreprise }) => {
  const [allEffectifsEtp, setAllEffectifsEtp] = useState(null);

  const { data } = useEntrepriseInfos(getSiren(baseEntreprise));

  const enterprise = useMemo(
    () => merge({}, baseEntreprise, data?.entreprises[0]),
    [baseEntreprise, data]
  );

  const dashboardSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié",
  };

  const isLoadingEffectifMensuelEtp = !getEffectifsMensuels(enterprise);
  const effectifEtpData = allEffectifsEtp ?? getEffectifsMensuels(enterprise);
  const showEffectifEtpButton =
    Array.isArray(getEffectifsMensuels(enterprise)) &&
    getEffectifsMensuels(enterprise).length > 0 &&
    !allEffectifsEtp;

  const establishmentCount = getEstablishmentsCount(enterprise);
  const activeEstablishmentCount = getActiveEtablissementsCount(enterprise);
  const trancheEffectifs = getTrancheEffectifs(enterprise);

  const EffectifEtpDataComponents = effectifEtpData?.length ? (
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

  const mandataires = getMandatairesSociaux(enterprise) || [];

  const siegeSocial = getSiegeSocial(enterprise);
  const nafCode = getNafCode(enterprise);
  const nafLabel = getNafLabel(enterprise);
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
            value={`${nafCode ?? "-"} ${nafLabel ?? ""}`}
          />
          <Data
            name="Forme juridique"
            value={getCategorieJuridiqueLabel(enterprise)}
          />
          <Data name="Catégorie" value={getCategorie(enterprise)} />
          <Data
            name="Siège social (SIRET)"
            value={formatSiret(getSiret(siegeSocial) || "")}
          />
          <Data
            name="Etablissements"
            value={`
                ${activeEstablishmentCount} actif(s) et ${
              establishmentCount - activeEstablishmentCount
            } fermé(s)`}
          />

          <Association siret={getSiretSiegeSocial(enterprise)} />

          <Data
            name="Tranche d'effectif"
            value={trancheEffectifs && dashboardSizeRanges[trancheEffectifs]}
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
            name={`Effectif ${getEffectifsAnnuelAnnee(
              enterprise
            )} en équivalent temps plein`}
            value={getEffectifsAnnuelValue(enterprise)}
            sourceCustom={`Acoss / DSN ${getEffectifsAnnuelAnnee(enterprise)}`}
            hasNumberFormat
          />
        </Subcategory>

        <Subcategory
          subtitle="Informations juridiques"
          sourceCustom="Infogreffe - RCS et DGFIP"
        >
          <div>
            <span>
              Informations d&apos;immatriculation (contenues dans un extrait
              Kbis/D1)
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
            au RNM n&apos;ont plus à fournir leur extrait Kbis/D1 dans leurs
            démarches administratives
            <br /> Décrets du 21 mai 2021 n°2021-631 et 2021-632
          </div>

          <Data
            name="Date immatriculation RCS"
            value={getDateImmatriculationRcs(enterprise)}
          />

          {getRcsObservations(enterprise) && (
            <ObservationRCS observations={getRcsObservations(enterprise)} />
          )}

          <Data
            name="Capital Social"
            value={
              getCapitalSocial(enterprise) && `${getCapitalSocial(enterprise)}`
            }
            hasNumberFormat
            numberFormatOptions={{ style: "currency" }}
          />
          <Data
            name="Numéro de TVA intra communautaire"
            value={
              getNumeroTvaIntracommunautaire(enterprise) &&
              formatTva(getNumeroTvaIntracommunautaire(enterprise))
            }
          />
        </Subcategory>
        <Subcategory subtitle="Données financières" sourceCustom="DGFIP">
          <Finances siren={getSiren(enterprise)} />
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
};

export default EnterpriseInfos;
