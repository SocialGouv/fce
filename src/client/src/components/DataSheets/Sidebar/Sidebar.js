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

    return (
      <>
        {isRedirectedToEnterprise && (
          <Redirect to={`/enterprise/${enterprise.siren}`} />
        )}
        {isRedirectedToResearch && <Redirect to="/" />}
        <aside
          className={`${
            isEstablishmentDisplayed ? "establishment" : "enterprise"
          } aside-contain establishments-aside column is-12-tablet`}
        >
          <section className="pb-6">
            <h3 className="is-capitalized has-text-segoe has-text-weight-bold is-size-5">
              Entreprise{" "}
              <Value
                value={enterprise.raison_sociale.toLowerCase()}
                empty="-"
              />
            </h3>
            <h5 className="has-text-segoe has-text-weight-normal">
              {enterprise.libelle_naf}
            </h5>
            {isEstablishmentDisplayed && (
              <Button
                value="Voir la fiche entreprise"
                icon={faArrowRight}
                buttonClasses={["is-secondary", "is-outlined"]}
                callback={() => {
                  this.setState({ isRedirectedToEnterprise: true });
                }}
              />
            )}
          </section>

          <section>
            <h3 className="title is-size-5">Siège social</h3>
            <Establishment establishment={headOffice} />
          </section>

          <hr />

          <p className="title is-size-5">
            {establishments.length} Établissements
          </p>
          <section className={`establishments ${!isLimited && "with-lift"}`}>
            <EstablishmentsItems
              establishments={establishments}
              limit={isLimited && limitItems}
            />
            {establishments.length > limitItems && isLimited && (
              <button
                className="button is-primary has-text-light toggle-all-establishments"
                onClick={() => this.redirectToResearch(enterprise.siren)}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faBuilding} />
                </span>
                <span>Voir tous les établissements</span>
              </button>
            )}
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
