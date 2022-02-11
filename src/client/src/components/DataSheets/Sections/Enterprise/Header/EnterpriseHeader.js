import {
  faArrowRight,
  faCircle,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  getSiegeSocial,
  getSiren,
  isActive,
} from "../../../../../utils/entreprise/entreprise";
import { getSiret } from "../../../../../utils/establishment/establishment";
import LinkButton from "../../../../shared/Button/LinkButton";
import InfoBox from "../../../../shared/InfoBox";
import Value from "../../../../shared/Value";
import SocieteComLink from "./SocieteComLink";

const EnterpriseHeader = ({ enterprise, resetSearch, setSearchTerm }) => {
  const stateClass = isActive(enterprise) ? "icon--success" : "icon--danger";

  const siegeSocial = getSiegeSocial(enterprise);

  return (
    <>
      <section id="header" className="data-sheet-header">
        <Helmet>
          <title>FCE - entreprise {getName(enterprise) || ""}</title>
        </Helmet>

        <h1 className="data-sheet-header__title">
          <Value value={getName(enterprise) || null} empty=" " />
        </h1>
        <InfoBox value="Entreprise" />

        <div className="columns is-vcentered">
          <div className="column is-4 data-sheet-header__siren">
            <span>SIREN : </span>
            <span>
              <Value value={formatSiren(getSiren(enterprise))} empty="" />
            </span>
          </div>
          <div className="column is-8 data-sheet-header__enterprise-button">
            <LinkButton
              value=""
              icon={faArrowRight}
              buttonClasses={["is-secondary", "is-outlined"]}
              link={`/establishment/${getSiret(siegeSocial)}`}
            >
              Voir le siège social
            </LinkButton>
          </div>
        </div>

        <div className="columns is-vcentered">
          <div className="column is-4">
            <div className="data-sheet-header__status">
              <div>
                <FontAwesomeIcon
                  icon={isActive(enterprise) ? faCircle : faSquare}
                  className={`data-sheet-header__status-icon ${stateClass}`}
                />
              </div>
              <div className="has-text-segoe">
                {isActive(enterprise) ? (
                  <span>
                    Ouvert depuis le{" "}
                    <Value value={getOpeningDate(enterprise)} empty="" />
                  </span>
                ) : (
                  <div>
                    <div>
                      Fermé depuis le{" "}
                      <Value value={getClosingDate(enterprise)} empty="" />
                    </div>
                    <div>
                      Date de création:{" "}
                      <Value value={getOpeningDate(enterprise)} empty="" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="column is-8 data-sheet-header__enterprise-button">
            <LinkButton
              icon={faArrowRight}
              buttonClasses={["is-secondary", "is-outlined"]}
              onClick={() => {
                resetSearch();
                setSearchTerm(getSiren(enterprise));
              }}
              link="/search"
            >
              Voir tous les établissements
            </LinkButton>
          </div>
        </div>

        <div className="columns data-sheet-header__enterprise-external-link">
          <span className="column">
            Voir sur <SocieteComLink siren={getSiren(enterprise)} />
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
