import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { merge } from "lodash";
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";

import AllEffectifsEtpButton from "../../../../../containers/AllEffectifsEtpButton";
import Association from "../../../../../containers/Association/Association";
import { getDateMonthName, getDateYear } from "../../../../../helpers/Date";
import { formatSiret, formatTva } from "../../../../../helpers/utils";
import Config from "../../../../../services/Config";
import {
  getActiveEtablissementsCount,
  getCapitalSocial,
  getCategorie,
  getCategorieJuridiqueLabel,
  getDateImmatriculationRcs,
  getEstablishmentsCount,
  getNafCode,
  getNafLabel,
  getNumeroTvaIntracommunautaire,
  getRcsObservations,
  getSiegeSocial,
  getSiren,
  getTrancheEffectifs,
} from "../../../../../utils/entreprise/entreprise";
import { getSiret } from "../../../../../utils/establishment/establishment";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import {
  useEffectifsMensuels,
  useExtraitsRcsInfogreffe,
  useMandataireInfos,
  useTva_intracommunautaire,
} from "./EnterpriseInfos.gql";
import Finances from "./Finances";
import Mandataires from "./Mandataires";
import ObservationRCS from "./ObservationRCS";

const MIN_EFFECTIFS_MENSUELS = 3;
const MAX_EFFECTIFS_MENSUELS = 24;

const EnterpriseInfos = ({ enterprise: baseEntreprise }) => {
  const [effectifsMensuelsLimit, setEffectifsMensuelsLimit] = useState(
    MIN_EFFECTIFS_MENSUELS
  );

  const siren = getSiren(baseEntreprise);

  const { data: entreprisesInfos } = useExtraitsRcsInfogreffe(
    getSiren(baseEntreprise)
  );
  const { data: tva_intracommunautaire } = useTva_intracommunautaire(
    getSiren(baseEntreprise)
  );
  const { data: mandataires } = useMandataireInfos(getSiren(baseEntreprise));
  const {
    data: effectifsMensuels,
    loading: effectifsMensuelsLoading,
    error: effectifsMensuelsError,
  } = useEffectifsMensuels(siren, effectifsMensuelsLimit);
  const enterprise = useMemo(
    () => merge({}, baseEntreprise, { api: entreprisesInfos }),
    [baseEntreprise, entreprisesInfos]
  );
  console.log(enterprise, "$$$$$$$$$$$$$$$$$$$$$");

  const dashboardSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié",
  };

  const establishmentCount = getEstablishmentsCount(enterprise);
  const activeEstablishmentCount = getActiveEtablissementsCount(enterprise);
  const trancheEffectifs = getTrancheEffectifs(enterprise);

  const EffectifEtpDataComponents = effectifsMensuels?.length ? (
    effectifsMensuels.map(({ periode_concerne, effectif }) => (
      <Data
        key={periode_concerne}
        name={`Effectif ETP`}
        value={effectif}
        sourceCustom={`Gip-Mds / DSN ${getDateMonthName(
          periode_concerne
        )} ${getDateYear(periode_concerne)}`}
        hasNumberFormat
      />
    ))
  ) : (
    <Data name={`Effectif ETP`} />
  );

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

          <Association siret={getSiret(siegeSocial)} />

          <Data
            name="Tranche d'effectif"
            value={trancheEffectifs && dashboardSizeRanges[trancheEffectifs]}
            sourceSi={"Sirène"}
          />
          <LoadableContent
            loading={effectifsMensuelsLoading}
            error={effectifsMensuelsError}
          >
            {EffectifEtpDataComponents}
          </LoadableContent>
          {effectifsMensuelsLimit === MIN_EFFECTIFS_MENSUELS && (
            <AllEffectifsEtpButton
              loading={effectifsMensuelsLoading}
              onClick={() => setEffectifsMensuelsLimit(MAX_EFFECTIFS_MENSUELS)}
            />
          )}
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
              getNumeroTvaIntracommunautaire(tva_intracommunautaire) &&
              formatTva(getNumeroTvaIntracommunautaire(tva_intracommunautaire))
            }
          />
        </Subcategory>
        <Subcategory subtitle="Données financières" sourceCustom="DGFIP">
          <Finances siret={getSiret(siegeSocial)} />
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
