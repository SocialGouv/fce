import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Value from "../../../../shared/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faArrowAltRight,
  faArrowRight,
  faSquare,
  faCircle
} from "@fortawesome/fontawesome-pro-solid";
import InfoBox from "../../../../shared/InfoBox";
import Button from "../../../../shared/Button";
import { setTerm, resetSearch } from "../../../../../services/Store/actions";

import "./enterpriseHeader.scss";
class EnterpriseHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirectedToHeadOffice: false,
      isRedirectedToResearch: false
    };
  }

  redirectToResearch = siren => {
    Promise.all([
      this.props.resetSearch(),
      this.props.setTerm("q", siren)
    ]).then(() => {
      this.setState({ isRedirectedToResearch: true });
    });
  };

  render() {
    const { enterprise } = this.props;
    const slugSocieteCom = enterprise.raison_sociale
      ? enterprise.raison_sociale.toLowerCase().replace(" ", "-")
      : "#";
    const isActiveEnterprise = enterprise.etat_entreprise === "A";
    const stateClass = isActiveEnterprise ? "icon--success" : "icon--danger";

    const { isRedirectedToHeadOffice, isRedirectedToResearch } = this.state;

    return (
      <>
        {isRedirectedToHeadOffice && (
          <Redirect to={`/establishment/${enterprise.siret_siege_social}`} />
        )}
        {isRedirectedToResearch && <Redirect to="/" />}
        <section id="header" className="enterprise-header w-100 mb-4">
          <div className="has-text-link show-all-establishments">
            <div
              className="responsive-item"
              data-show="quickview"
              data-target="establishments"
            >
              <span>Voir les établissements</span>
              <span className="icon">
                <FontAwesomeIcon icon={faArrowAltRight} />
              </span>
            </div>
          </div>
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
                {isActiveEnterprise ? "Ouverte depuis le " : "Fermée depuis le "}
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
                buttonClasses={["is-secondary", "is-outlined"]}
                callback={() => this.redirectToResearch(enterprise.siren)}
              />
            </div>
          </div>
          <div className="columns w-100">
            <span className="column is-size-6">
              Voir sur{" "}
              <a
                className="is-link"
                href={`https://www.societe.com/societe/${slugSocieteCom}-${
                  enterprise.siren
                }.html`}
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
    setTerm: (termKey, termValue) => {
      return dispatch(setTerm(termKey, termValue));
    },
    resetSearch: () => dispatch(resetSearch())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EnterpriseHeader);
