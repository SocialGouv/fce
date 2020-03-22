import React from "react";
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
import Config from "../../../../../services/Config";

import "./enterpriseHeader.scss";
class EnterpriseHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirectedToHeadOffice: false,
      isRedirectedToResearch: false
    };
  }

  static propTypes = {
    enterprise: PropTypes.object.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    setSearchFilters: PropTypes.func.isRequired,
    resetSearch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { enterprise } = this.props;
    const slugSocieteCom = enterprise.raison_sociale
      ? enterprise.raison_sociale.toLowerCase().replace(" ", "-")
      : "#";
    const isActiveEnterprise =
      enterprise.etat_entreprise === Config.get("establishmentState").actif;
    const stateClass = isActiveEnterprise ? "icon--success" : "icon--danger";

    const { isRedirectedToHeadOffice, isRedirectedToResearch } = this.state;

    return (
      <>
        {isRedirectedToHeadOffice && (
          <Redirect to={`/establishment/${enterprise.siret_siege_social}`} />
        )}
        {isRedirectedToResearch && <Redirect to="/" />}
        <section id="header" className="enterprise-header w-100 mb-4">
          <h1 className="columns mb-4 is-capitalized has-text-weight-bold is-size-3">
            <Value
              value={
                enterprise.raison_sociale ||
                enterprise.sigle ||
                enterprise.nom_commercial ||
                `${enterprise.nom || ""} ${enterprise.prenom || ""}`.trim() ||
                null
              }
              empty=" "
            />
          </h1>
          <div className="columns">
            <InfoBox
              value="Entreprise"
              infoBoxClasses={[
                "has-text-weight-bold",
                "has-text-roboto",
                "is-size-6"
              ]}
            />
          </div>
          <div className="columns is-vcentered w-100">
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
                  this.setState({ isRedirectedToHeadOffice: true });
                }}
              />
            </div>
          </div>
          <div className="columns is-vcentered w-100">
            <div className="column is-4">
              <span className="active-item-value">
                <FontAwesomeIcon
                  icon={isActiveEnterprise ? faCircle : faSquare}
                  className={`mr-2 ${stateClass}`}
                />
              </span>
              <span className="is-size-6 has-text-segoe has-text-grey-dark">
                {isActiveEnterprise
                  ? "Ouverte depuis le "
                  : "Fermée depuis le "}
              </span>
              <span className="is-size-6 has-text-segoe has-text-grey-dark">
                <Value
                  value={
                    isActiveEnterprise
                      ? enterprise.date_de_creation
                      : enterprise.date_mise_a_jour
                  }
                  empty="-"
                />
              </span>
            </div>
            <div className="column is-8">
              <Button
                value="Voir tous les établissements"
                icon={faArrowRight}
                className="button is-secondary is-outlined has-text-weight-bold"
                onClick={() => {
                  this.props.resetSearch();
                  this.props.setSearchTerm(enterprise.siren);
                  this.props.history.push("/");
                }}
              />
            </div>
          </div>
          <div className="columns w-100">
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
  }
}

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
