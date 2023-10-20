import PropTypes from "prop-types";
import React from "react";

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import { formatSiren } from "../../../../../helpers/utils";
// import { formatSiret } from "../../../../../helpers/utils";
import {
  getNafCode,
  getNafLabel,
} from "../../../../../utils/entreprise/entreprise";
import {
  getAdresse,
  getCategoryLabel,
  getCodePostalAndCity,
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
import Dashboard from "../Dashboard";
import EntrepriseName from "./EntrepriseName";
import {
  useEstablishmentHeaderData,
  useEstablishmentHeaderNumData,
} from "./EstablishmentHeader.gql";

const EstablishmentHeader = ({ siret, siren }) => {
  const { data: etablissement } = useEstablishmentHeaderData(siret);
  const { data: etablissementCount } = useEstablishmentHeaderNumData(siren);
  const adresse = getAdresse(etablissement);
  const code = getCodePostalAndCity(etablissement);
  const etablissementsCount = etablissementCount
    ? getEtablissementsCount(etablissementCount)
    : 0;
  const etablissementsFermesCount = etablissementCount
    ? getEtablissementsFermesCount(etablissementCount)
    : 0;

  const isEtablissementActive = isActive(etablissement);

  const stateClass = isEtablissementActive ? "icon--success" : "icon--danger";
  const stateText = isEtablissementActive ? "ouvert" : "fermé";
  return (
    <section id="header" className="data-sheet-header">
      <EntrepriseName siret={siret} />
      <div className="columns">
        <div className="column data-sheet-header-top">
          <InfoBox value={getCategoryLabel(etablissement)} />
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
          <span>SIRET : </span>
          <span>
            {formatSiren(siret.slice(0, 9))}
            <span> {siret.slice(9)}</span>
          </span>
        </div>
        <div className="data-sheet-header-address column is-6">
          <span className="data-sheet-header-address-icon">
            <BuildingIcon />
          </span>
          <span className="is-bold"> {code}</span>
          <span className=" has-list-style">{adresse ? adresse : ""}</span>
        </div>
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
                    value={
                      isEtablissementActive
                        ? getDateCreation(etablissement)
                        : getDateFermetureEtablissement(etablissement)
                    }
                    empty=""
                    datecreationetablissement
                  />
                </span>
              </div>
            </div>
            {!isEtablissementActive && (
              <div className="data-sheet-header__status-closed">
                Date de création :{" "}
                <Value value={getDateCreation(etablissement)} empty="" />
              </div>
            )}
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
          </div>
        </div>
        <div className="column is-6 data-sheet-header__naf">
          <span>
            <Value value={getNafCode(etablissement)} empty="-" />{" "}
            <Value
              value={(getNafLabel(etablissement) || "").toLowerCase()}
              empty=""
            />
          </span>
        </div>
      </div>
      <Dashboard siret={siret} />
    </section>
  );
};

EstablishmentHeader.propTypes = {
  siren: PropTypes.string.isRequired,
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EstablishmentHeader);
