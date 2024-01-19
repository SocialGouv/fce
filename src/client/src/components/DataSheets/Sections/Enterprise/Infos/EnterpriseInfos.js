import { merge } from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

import Association from "../../../../../containers/Association/Association";
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
import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import Effectis from "./Effectis.jsx";
import {
  useEffectifsPhysique,
  useExtraitsRcsInfogreffe,
  useMandataireInfos,
  useTva_intracommunautaire,
} from "./EnterpriseInfos.gql";
import Finances from "./Finances";
import Mandataires from "./Mandataires";
import ObservationRCS from "./ObservationRCS";

const EnterpriseInfos = ({ enterprise: baseEntreprise }) => {
  const [accordionOpen, setAccordionOpen] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const hash = window.location.hash;

    const checkAndScroll = (elementId) => {
      const element = document.getElementById(elementId);
      const headerOffset = document.getElementById("header")?.offsetHeight || 0;
      if (element) {
        const position = element.offsetTop - headerOffset;
        window.scrollTo({
          behavior: "smooth",
          top: position,
        });
        return true;
      }
      return false;
    };

    const setupScroll = (targetId) => {
      if (!checkAndScroll(targetId)) {
        const interval = setInterval(() => {
          if (checkAndScroll(targetId)) {
            clearInterval(interval);
          }
        }, 100);
      }
      window.addEventListener("resize", () => checkAndScroll(targetId));
      return () =>
        window.removeEventListener("resize", () => checkAndScroll(targetId));
    };

    if (location.pathname.includes("enterprise")) {
      if (hash === "#mandataires") {
        return setupScroll("mandataires");
      }
      if (hash === "#finance-data") {
        return setupScroll("finance-data");
      }
    }
  }, [location]);

  const siren = getSiren(baseEntreprise);

  const { data: entreprisesInfos } = useExtraitsRcsInfogreffe(
    getSiren(baseEntreprise)
  );
  const { data: tva_intracommunautaire } = useTva_intracommunautaire(
    getSiren(baseEntreprise)
  );
  const { data: mandataires } = useMandataireInfos(getSiren(baseEntreprise));

  const {
    data: effectifsPhysique,
    loading: effectifsPhysiqueLoading,
    error: effectifsPhysiqueError,
  } = useEffectifsPhysique(siren);
  const enterprise = useMemo(
    () => merge({}, baseEntreprise, { api: entreprisesInfos }),
    [baseEntreprise, entreprisesInfos]
  );

  const dashboardSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié",
  };

  const establishmentCount = getEstablishmentsCount(enterprise);
  const activeEstablishmentCount = getActiveEtablissementsCount(enterprise);
  const trancheEffectifs = getTrancheEffectifs(enterprise);

  const siegeSocial = getSiegeSocial(enterprise);
  const nafCode = getNafCode(enterprise);
  const nafLabel = getNafLabel(enterprise);
  return (
    <section id="infos" className="data-sheet__bloc_section">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={"Informations légales sur l’entreprise"}
      />

      {accordionOpen && (
        <div className="section-datas">
          <Subcategory subtitle="Informations générales" sourceSi="Sirène">
            <Data
              name="Activité principale"
              value={`${nafCode ?? "-"} ${nafLabel ?? ""}`}
              className="has-no-border"
            />
            <Data
              name="Forme juridique"
              value={getCategorieJuridiqueLabel(enterprise)}
              className="has-no-border"
            />
            <Data
              name="Catégorie"
              value={getCategorie(enterprise)}
              className="has-no-border"
            />
            <Data
              name="Siège social (SIRET)"
              value={formatSiret(getSiret(siegeSocial) || "")}
              className="has-no-border"
            />
            <Data
              name="Etablissements"
              value={`
                ${activeEstablishmentCount} actif(s) et ${
                establishmentCount - activeEstablishmentCount
              } fermé(s)`}
              className="has-no-border"
            />
            <Association siret={getSiret(siegeSocial)} />
            <Data
              name="Tranche d'effectif"
              value={trancheEffectifs && dashboardSizeRanges[trancheEffectifs]}
              sourceSi={"Sirène"}
              className="has-no-border"
            />
            <LoadableContent
              loading={effectifsPhysiqueLoading}
              error={effectifsPhysiqueError}
            >
              <Data
                name="Effectif physique"
                value={effectifsPhysique}
                hasNumberFormat={true}
                sourceSi={"DSN"}
                className="has-no-border"
              />
            </LoadableContent>
            <Effectis siren={siren} />
          </Subcategory>

          <Subcategory
            subtitle="Informations juridiques"
            sourceCustom="Infogreffe - RCS et DGFIP"
          >
            <div>
              <span className="text">
                Informations d&apos;immatriculation (contenues dans un extrait
                Kbis/D1) : consulter le(s) justificatif(s) sur{" "}
                <a
                  href={`https://annuaire-entreprises.data.gouv.fr/justificatif/${enterprise.siren}`}
                >
                  annuaire entreprise
                </a>
              </span>
            </div>
            <div className="section-datas__list-description text">
              À partir de novembre 2021, les entreprises immatriculées au RCS ou
              au RNM n&apos;ont plus à fournir leur extrait Kbis/D1 dans leurs
              démarches administratives
              <br /> Décrets du 21 mai 2021 n°2021-631 et 2021-632
            </div>

            <Data
              name="Date immatriculation RCS"
              value={getDateImmatriculationRcs(enterprise)}
              className="has-no-border"
            />

            {getRcsObservations(enterprise) && (
              <ObservationRCS observations={getRcsObservations(enterprise)} />
            )}

            <Data
              name="Capital Social"
              value={
                getCapitalSocial(enterprise) &&
                `${getCapitalSocial(enterprise)}`
              }
              hasNumberFormat
              numberFormatOptions={{ style: "currency" }}
              className="has-no-border"
            />
            <Data
              name="Numéro de TVA intra communautaire"
              value={
                getNumeroTvaIntracommunautaire(tva_intracommunautaire) &&
                formatTva(
                  getNumeroTvaIntracommunautaire(tva_intracommunautaire)
                )
              }
              className="has-no-border"
            />
          </Subcategory>
          <Subcategory
            subtitle="Données financières"
            sourceSi={"Comptes Annuels"}
          >
            <Finances siren={siren} siret={getSiret(siegeSocial)} />
          </Subcategory>
          <Subcategory
            subtitle="Mandataires sociaux"
            sourceCustom="Infogreffe - RCS"
          >
            <Mandataires mandataires={mandataires} />
          </Subcategory>
        </div>
      )}
    </section>
  );
};

EnterpriseInfos.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default EnterpriseInfos;
