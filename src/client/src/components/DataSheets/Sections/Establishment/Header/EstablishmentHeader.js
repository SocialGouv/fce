import {
  faCircle,
  faFileDownload,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import { formatSiret } from "../../../../../helpers/utils";
import {
  getNafCode,
  getNafLabel,
} from "../../../../../utils/entreprise/entreprise";
import {
  getAdresse,
  getCategoryLabel,
  getDateCreation,
  getDateFermetureEtablissement,
  isActive,
} from "../../../../../utils/establishment/establishment";
import InfoBox from "../../../../shared/InfoBox";
import Value from "../../../../shared/Value";
import Dashboard from "../Dashboard";
import EntrepriseName from "./EntrepriseName";
import { useEstablishmentHeaderData } from "./EstablishmentHeader.gql";

const EstablishmentHeader = ({ siret }) => {
  const { data: etablissement } = useEstablishmentHeaderData(siret);
  const adresse = etablissement ? getAdresse(etablissement) : "";

  const isEtablissementActive = isActive(etablissement);

  const stateClass = isEtablissementActive ? "icon--success" : "icon--danger";

  return (
    <section id="header" className="data-sheet-header">
      <EntrepriseName siret={siret} />
      <div className="columns">
        <div className="column">
          <InfoBox value={getCategoryLabel(etablissement)} />
        </div>
      </div>
      <div className="columns is-vcentered data-sheet-header__primary-infos">
        <div className="column is-4 data-sheet-header__siret">
          <span>SIRET : </span>
          <span>
            <Value value={formatSiret(siret)} empty="" />
          </span>
        </div>
        <div className="column is-8">
          <span className="has-text-segoe">
            <Value value={adresse} empty="" />
          </span>
        </div>
      </div>
      <div className="columns">
        <div className="column is-4">
          <div className="data-sheet-header__status">
            <div>
              <FontAwesomeIcon
                icon={isEtablissementActive ? faCircle : faSquare}
                className={`data-sheet-header__status-icon ${stateClass}`}
              />
            </div>
            <div className="has-text-segoe">
              {isEtablissementActive ? (
                <span>
                  Ouvert depuis le{" "}
                  <Value value={getDateCreation(etablissement)} empty="" />
                </span>
              ) : (
                <div>
                  <div>
                    Fermé depuis le{" "}
                    <Value
                      value={getDateFermetureEtablissement(etablissement)}
                      empty=""
                    />
                  </div>
                  <div>
                    Date de création:{" "}
                    <Value value={getDateCreation(etablissement)} empty="" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="column is-8">
          <span className="has-text-segoe data-sheet-header__naf">
            <Value value={getNafCode(etablissement)} empty="-" />{" "}
            <Value
              value={(getNafLabel(etablissement) || "").toLowerCase()}
              empty=""
            />
          </span>
        </div>
      </div>
      <Dashboard siret={siret} />
      <div className="columns data-sheet-header__enterprise-external-link">
        <span className="column">
          <a
            href={`https://api.avis-situation-sirene.insee.fr/identification/pdf//${siret}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            Télécharger l’avis de situation SIRENE{" "}
            <FontAwesomeIcon icon={faFileDownload} />
          </a>
        </span>
      </div>
    </section>
  );
};

EstablishmentHeader.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EstablishmentHeader);
