import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { formatSiren } from "../../../../../helpers/utils";
import {
  resetSearch,
  setSearchFilters,
  setSearchTerm,
} from "../../../../../services/Store/actions";
import {
  getClosingDate,
  getName,
  getOpeningDate,
  getSiren,
  isActive,
} from "../../../../../utils/entreprise/entreprise";
import {
  getEtablissementsCount,
  getEtablissementsFermesCount,
} from "../../../../../utils/establishment/establishment";
import { plural } from "../../../../../utils/plural/plural";
import BadgeWithIcon from "../../../../shared/Badge/BadgeWithIcon.jsx";
import Download from "../../../../shared/Icons/Download.jsx";
import InfoBox from "../../../../shared/InfoBox";
import Value from "../../../../shared/Value";
import { useEstablishmentHeaderNumData } from "../../Establishment/Header/EstablishmentHeader.gql";
import AnnuaireEntreprisesLink from "./AnnuaireEntreprisesLink";

const EnterpriseHeader = ({ enterprise }) => {
  const { data: etablissementCount } = useEstablishmentHeaderNumData(
    getSiren(enterprise)
  );

  const stateClass = isActive(enterprise) ? "icon--success" : "icon--danger";
  const stateText = isActive(enterprise) ? "ouvert" : "fermé";
  const etablissementsCount = etablissementCount
    ? getEtablissementsCount(etablissementCount)
    : 0;
  const etablissementsFermesCount = etablissementCount
    ? getEtablissementsFermesCount(etablissementCount)
    : 0;
  return (
    <section id="header" className="data-sheet-header">
      <>
        <Helmet>
          <title>FCE - entreprise {getName(enterprise) || ""}</title>
        </Helmet>

        <h1 className="data-sheet-header__title">
          <Value value={getName(enterprise) || null} empty=" " />
        </h1>
      </>
      <div className="columns">
        <div className="column data-sheet-header-top">
          <InfoBox value="Entreprise" />
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
        <div className="column is-6 data-sheet-header__siren">
          <span>SIREN : </span>
          <span>
            <Value value={formatSiren(getSiren(enterprise))} empty="" />
          </span>
        </div>

        <div className="column text-left is-6 data-sheet-header__enterprise-external-link ">
          <span className="data-sheet-header__bloc_link ">
            Voir sur <AnnuaireEntreprisesLink siren={getSiren(enterprise)} />
          </span>
        </div>
      </div>

      <div className="columns ">
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
                    datecreationetablissement
                    value={
                      isActive(enterprise)
                        ? getOpeningDate(enterprise)
                        : getClosingDate(enterprise)
                    }
                    empty=""
                  />
                </span>

                {!isActive(enterprise) && (
                  <div className="data-sheet-header__status-closed">
                    Date de création:{" "}
                    <Value value={getOpeningDate(enterprise)} empty="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column ">
          <div className="data-sheet-header__bloc">
            <span className="data-sheet-header__bloc_link">
              <Download />
              <a
                href={`https://annuaire-entreprises.data.gouv.fr/justificatif-immatriculation-pdf/${enterprise.siren}`}
                rel="noreferrer noopener"
                target="_blank"
              >
                {
                  " Télécharger le justificatif d’immatriculation sur l'Annuaire des entreprises"
                }
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

EnterpriseHeader.propTypes = {
  enterprise: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetSearch: () => {
      dispatch(resetSearch());
    },
    setSearchFilters: (filters) => {
      dispatch(setSearchFilters(filters));
    },
    setSearchTerm: (term) => {
      return dispatch(setSearchTerm(term));
    },
  };
};

export default withRouter(connect(null, mapDispatchToProps)(EnterpriseHeader));
