import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import Value from "../../../../shared/Value";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setSearchTerm,
  setSearchFilters,
  resetSearch
} from "../../../../../services/Store/actions";
import {
  faArrowRight,
  faSquare,
  faCircle
} from "@fortawesome/pro-solid-svg-icons";
import InfoBox from "../../../../shared/InfoBox";
import Button from "../../../../shared/Button";
import { getEnterpriseName } from "../../../../../helpers/Enterprise";
import Config from "../../../../../services/Config";

import "./enterpriseHeader.scss";

const EnterpriseHeader = ({
  enterprise,
  resetSearch,
  setSearchTerm,
  history
}) => {
  const [isRedirectedToHeadOffice, setIsRedirectedToHeadOffice] = useState(
    null
  );

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
      <section id="header" className="enterprise-header">
        <h1 className="mb-4 is-capitalized has-text-weight-bold is-size-3">
          <Value value={getEnterpriseName(enterprise) || null} empty=" " />
        </h1>
        <div className="columns">
          <div className="column pb-0">
            <InfoBox
              value="Entreprise"
              infoBoxClasses={[
                "has-text-weight-bold",
                "has-text-roboto",
                "is-size-6"
              ]}
            />
          </div>
        </div>
        <div className="enterprise-header__infos columns is-vcentered">
          <div className="column is-4">
            <span className="is-size-6 has-text-roboto has-text-weight-semibold has-text-grey-dark">
              SIREN :{" "}
            </span>
            <span className="is-size-6 has-text-roboto has-text-weight-semibold has-text-grey-dark">
              <Value value={enterprise.siren} empty="" />
            </span>
          </div>
          <div className="column is-8">
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
            <div className="enterprise-header__status">
              <div className="active-item-value">
                <FontAwesomeIcon
                  icon={isActiveEnterprise ? faCircle : faSquare}
                  className={`mr-2 ${stateClass}`}
                />
              </div>
              <div className="is-size-6 has-text-segoe has-text-grey-dark">
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

          <div className="column is-8">
            <Button
              value="Voir tous les établissements"
              icon={faArrowRight}
              className="button is-secondary is-outlined has-text-weight-bold"
              onClick={() => {
                resetSearch();
                setSearchTerm(enterprise.siren);
                history.push("/");
              }}
            />
          </div>
        </div>
        <div className="columns">
          <span className="column is-size-6">
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
  setSearchTerm: PropTypes.func.isRequired,
  setSearchFilters: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchTerm: term => {
      return dispatch(setSearchTerm(term));
    },
    setSearchFilters: filters => {
      dispatch(setSearchFilters(filters));
    },
    resetSearch: () => {
      dispatch(resetSearch());
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(EnterpriseHeader));
