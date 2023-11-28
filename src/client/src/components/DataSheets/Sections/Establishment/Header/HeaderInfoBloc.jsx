import PropTypes from "prop-types";
import React from "react";

import { formatSiren } from "../../../../../helpers/utils";
import {
  getClosingDate,
  getNafCode,
  getNafLabel,
  getOpeningDate,
  getSiren,
  isActiveEntreprise,
} from "../../../../../utils/entreprise/entreprise";
import {
  getDateCreation,
  getDateFermetureEtablissement,
  getEtablissementsCount,
  getEtablissementsFermesCount,
  isActive,
} from "../../../../../utils/establishment/establishment";
import { plural } from "../../../../../utils/plural/plural";
import BadgeWithIcon from "../../../../shared/Badge/BadgeWithIcon.jsx";
import BuildingIcon from "../../../../shared/Icons/BuildingIcon.jsx";
import Download from "../../../../shared/Icons/Download.jsx";
import InfoBox from "../../../../shared/InfoBox";
import Value from "../../../../shared/Value";
import AnnuaireEntreprisesLink from "../../Enterprise/Header/AnnuaireEntreprisesLink";

function HeaderInfoBloc({
  etablissement,
  etablissementCount,
  infoBoxValue,
  siret,
  enterprise,
  adresse,
  code,
}) {
  const etablissementsCount = etablissementCount
    ? getEtablissementsCount(etablissementCount)
    : 0;
  const etablissementsFermesCount = etablissementCount
    ? getEtablissementsFermesCount(etablissementCount)
    : 0;

  const isStateActive = siret
    ? isActive(etablissement)
    : isActiveEntreprise(enterprise);

  const stateClass = isStateActive ? "icon--success" : "icon--danger";
  const stateText = isStateActive ? "ouvert" : "fermé";
  const creationDate = siret
    ? getDateCreation(etablissement)
    : getOpeningDate(enterprise);
  const closerDate = siret
    ? getDateFermetureEtablissement(etablissement)
    : getClosingDate(enterprise);
  return (
    <>
      <div className="columns">
        <div className="column data-sheet-header-top">
          <InfoBox value={infoBoxValue} />
          <p className="data-sheet-header-top-count">
            <>
              <Value value={etablissementsCount} empty="Aucun " />{" "}
              {plural({
                count: etablissementsCount,
                plural: " établissements ",
                singular: " établissement ",
              })}
              {etablissementsFermesCount > 0 && (
                <>
                  <span>
                    dont {etablissementsFermesCount}{" "}
                    {plural({
                      count: etablissementsFermesCount,
                      plural: "fermés",
                      singular: "fermé",
                    })}
                  </span>
                </>
              )}
            </>
          </p>
        </div>
      </div>
      <div className="columns is-vcentered data-sheet-header__primary-infos">
        <div className="column is-6 data-sheet-header__siret">
          <span>{siret ? "SIRET :" : "SIREN :"} </span>
          <span>
            {siret && (
              <>
                {" "}
                {formatSiren(siret?.slice(0, 9))}
                <span> {siret?.slice(9)}</span>
              </>
            )}
            {!siret && (
              <span>
                <Value value={formatSiren(getSiren(enterprise))} empty="" />
              </span>
            )}
          </span>
        </div>
        {siret && (
          <div className="data-sheet-header-address column is-6">
            <span className="data-sheet-header-address-icon">
              <BuildingIcon />
            </span>
            <span className=" has-list-style">{adresse ? adresse : ""}</span>
            <span className="is-bold"> {code}</span>
          </div>
        )}
        {enterprise && (
          <div className="column text-left is-6 data-sheet-header__enterprise-external-link ">
            <span className="data-sheet-header__bloc_link ">
              Voir sur <AnnuaireEntreprisesLink siren={getSiren(enterprise)} />
            </span>
          </div>
        )}
      </div>
      <div className="columns">
        <div className="column is-6">
          <div className="data-sheet-header__bloc">
            <div className="data-sheet-header__status">
              <div className="data-sheet-header__status-icon">
                <BadgeWithIcon text={stateText} state={stateClass} />
              </div>
              <div className="data-sheet-header__status-date ">
                <span>
                  <span className="data-sheet-header__status__print">
                    {stateText}
                  </span>{" "}
                  depuis le{" "}
                  <Value
                    value={isStateActive ? creationDate : closerDate}
                    empty=""
                    datecreationetablissement
                  />
                </span>
              </div>
            </div>
            {!isStateActive && (
              <div className="data-sheet-header__status-closed">
                Date de création : <Value value={creationDate} empty="" />
              </div>
            )}
            {siret && (
              <span className="data-sheet-header__bloc_link">
                <Download />
                <a
                  href={`https://api-avis-situation-sirene.insee.fr/identification/pdf/${siret}`}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Télécharger l’avis de situation SIRENE
                </a>
              </span>
            )}
          </div>
        </div>
        {siret && (
          <div className="column is-6 data-sheet-header__naf">
            <span>
              <Value value={getNafCode(etablissement)} empty="-" />{" "}
              <Value
                value={(getNafLabel(etablissement) || "").toLowerCase()}
                empty=""
              />
            </span>
          </div>
        )}
      </div>
    </>
  );
}

HeaderInfoBloc.propTypes = {
  adresse: PropTypes.string,
  code: PropTypes.string,
  enterprise: PropTypes.object.isRequired,
  etablissement: PropTypes.object,
  etablissementCount: PropTypes.string,
  infoBoxValue: PropTypes.string,
  siret: PropTypes.string,
};

export default HeaderInfoBloc;
