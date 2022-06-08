import {
  faArrowRight,
  faCircle,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import { getEnterpriseName } from "../../../../../helpers/Enterprise";
import { formatSiren } from "../../../../../helpers/utils";
import Config from "../../../../../services/Config";
import {
  resetSearch,
  setSearchFilters,
  setSearchTerm,
} from "../../../../../services/Store/actions";
import Button from "../../../../shared/Button";
import InfoBox from "../../../../shared/InfoBox";
import Value from "../../../../shared/Value";

const EnterpriseHeader = ({
  enterprise,
  resetSearch,
  setSearchTerm,
  history,
}) => {
  const [isRedirectedToHeadOffice, setIsRedirectedToHeadOffice] =
    useState(null);

  const slugSocieteCom = enterprise.raison_sociale
    ? enterprise.raison_sociale.toLowerCase().replace(" ", "-")
    : "#";
  const isActiveEnterprise =
    enterprise.etat_entreprise === Config.get("establishmentState").actif;
  const stateClass = isActiveEnterprise ? "icon--success" : "icon--danger";

  return (
    <>
      {isRedirectedToHeadOffice && (
        <Redirect to={`/establishment/${enterprise.siret_siege_social}`} />
      )}
      <section id="header" className="data-sheet-header">
        <Helmet>
          <title>FCE - entreprise {getEnterpriseName(enterprise) || ""}</title>
        </Helmet>

        <h1 className="data-sheet-header__title">
          <Value value={getEnterpriseName(enterprise) || null} empty=" " />
        </h1>
        <InfoBox value="Entreprise" />

        <div className="columns is-vcentered">
          <div className="column is-4 data-sheet-header__siren">
            <span>SIREN : </span>
            <span>
              <Value value={formatSiren(enterprise.siren)} empty="" />
            </span>
          </div>
          <div className="column is-8 data-sheet-header__enterprise-button">
            <Button
              value="Voir le siège social"
              icon={faArrowRight}
              buttonClasses={["is-secondary", "is-outlined"]}
              callback={() => {
                setIsRedirectedToHeadOffice(true);
              }}
            />
          </div>
        </div>

        <div className="columns is-vcentered">
          <div className="column is-4">
            <div className="data-sheet-header__status">
              <div>
                <FontAwesomeIcon
                  icon={isActiveEnterprise ? faCircle : faSquare}
                  className={`data-sheet-header__status-icon ${stateClass}`}
                />
              </div>
              <div className="has-text-segoe">
                {isActiveEnterprise ? (
                  <span>
                    Ouvert depuis le{" "}
                    <Value value={enterprise.date_de_creation} empty="" />
                  </span>
                ) : (
                  <div>
                    <div>
                      Fermé depuis le{" "}
                      <Value value={enterprise.date_mise_a_jour} empty="" />
                    </div>
                    <div>
                      Date de création:{" "}
                      <Value value={enterprise.date_de_creation} empty="" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="column is-8 data-sheet-header__enterprise-button">
            <Button
              value="Voir tous les établissements"
              icon={faArrowRight}
              buttonClasses={["is-secondary", "is-outlined"]}
              onClick={() => {
                resetSearch();
                setSearchTerm(enterprise.siren);
                history.push("/");
              }}
            />
          </div>
        </div>

        <div className="columns data-sheet-header__enterprise-external-link">
          <span className="column">
            Voir sur{" "}
            <a
              className="is-link"
              href={`https://www.societe.com/societe/${slugSocieteCom}-${enterprise.siren}.html`}
            >
              Societe.com
            </a>
          </span>
        </div>
      </section>
    </>
  );
};

EnterpriseHeader.propTypes = {
  enterprise: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  resetSearch: PropTypes.func.isRequired,
  setSearchFilters: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
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
