import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Establishment from "./Establishment";
import EstablishmentsItems from "./EstablishmentsItems";
import Value from "../../shared/Value";
import { faBuilding, faArrowRight } from "@fortawesome/fontawesome-pro-solid";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Config from "../../../services/Config";
import { setTerm, resetSearch } from "../../../services/Store/actions";
import Button from "../../shared/Button";

import "./sidebar.scss";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirectedToEnterprise: false,
      isRedirectedToResearch: false,
      isLimited: true
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
    const limitItems = Config.get("sidebarEstablishmentsLimit");

    const {
      establishments,
      enterprise,
      headOffice,
      isEstablishmentDisplayed
    } = this.props;

    const {
      isRedirectedToEnterprise,
      isRedirectedToResearch,
      isLimited
    } = this.state;

    const closedEstablishmentsCount = establishments.filter(
      establishment => establishment.etat_etablissement === "F"
    ).length;

    return (
      <>
        {isRedirectedToEnterprise && (
          <Redirect to={`/enterprise/${enterprise.siren}`} />
        )}
        {isRedirectedToResearch && <Redirect to="/" />}
        <aside
          className={`${
            isEstablishmentDisplayed ? "establishment" : "enterprise"
          } aside-contain`}
        >
          <section className="sidebar__enterprise">
            <h3 className="sidebar__enterprise-title">
              Entreprise{" "}
              <Value
                value={enterprise.raison_sociale.toLowerCase()}
                empty="-"
              />
            </h3>
            <p className="sidebar__enterprise-naf">{enterprise.libelle_naf}</p>
            {isEstablishmentDisplayed && (
              <Button
                value="Voir la fiche entreprise"
                icon={faArrowRight}
                buttonClasses={[
                  "sidebar__enterprise-button",
                  "is-secondary",
                  "is-outlined"
                ]}
                callback={() => {
                  this.setState({ isRedirectedToEnterprise: true });
                }}
              />
            )}
          </section>

          <section className="sidebar__establishments">
            <p className="sidebar__establishments-count">
              <strong>
                {establishments.length} établissement
                {establishments.length > 1 && "s"}
              </strong>

              {!!closedEstablishmentsCount && (
                <>
                  <br />
                  <span>
                    dont {closedEstablishmentsCount} fermé
                    {closedEstablishmentsCount > 1 && "s"}
                  </span>
                </>
              )}
            </p>

            <section>
              <EstablishmentsItems
                establishments={[headOffice]}
                establishmentType="Siège social"
              />
            </section>

            <section
              className={`sidebar__establishments ${!isLimited && "with-lift"}`}
            >
              <EstablishmentsItems
                establishments={establishments}
                establishmentType="Autres établissements"
                limit={isLimited && limitItems}
              />
              {establishments.length > limitItems && isLimited && (
                <button
                  className="button is-secondary is-outlined"
                  onClick={() => this.redirectToResearch(enterprise.siren)}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faBuilding} />
                  </span>
                  <span>Voir tous les établissements</span>
                </button>
              )}
            </section>
          </section>
        </aside>
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
)(Sidebar);
