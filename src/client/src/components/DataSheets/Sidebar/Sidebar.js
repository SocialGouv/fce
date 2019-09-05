import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EstablishmentsItems from "./EstablishmentsItems/EstablishmentsItems";
import Value from "../../shared/Value";
import { faArrowRight } from "@fortawesome/fontawesome-pro-solid";
import Config from "../../../services/Config";
import { setTerm, resetSearch } from "../../../services/Store/actions";
import Button from "../../shared/Button";

import "./sidebar.scss";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirectedToEnterprise: false,
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
    const limitItems = Config.get("sidebarEstablishmentsLimit");

    const {
      establishments,
      enterprise,
      headOffice,
      isEstablishmentDisplayed
    } = this.props;

    const { isRedirectedToEnterprise, isRedirectedToResearch } = this.state;

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
                value={
                  enterprise.raison_sociale &&
                  enterprise.raison_sociale.toLowerCase()
                }
                empty="-"
              />
            </h3>
            <p className="sidebar__enterprise-naf">
              <Value value={enterprise.libelle_naf} empty="-" />
            </p>
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
                <Value value={establishments.length} empty="Aucun " />{" "}
                établissement
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

            <div>
              <EstablishmentsItems
                establishments={[headOffice]}
                establishmentType="Siège social"
                headOffice
              />
            </div>
          </section>

          <section className="sidebar__establishments">
            {establishments.length > 1 && (
              <>
                <EstablishmentsItems
                  establishments={establishments.filter(
                    establishment => establishment.siret !== headOffice.siret
                  )}
                  establishmentType="Autres établissements"
                  limit={limitItems}
                />
                {establishments.length > limitItems && (
                  <Button
                    value="Voir tous les établissements"
                    icon={faArrowRight}
                    buttonClasses={[
                      "is-secondary",
                      "is-outlined",
                      "sidebar__view-all-button"
                    ]}
                    callback={() => {
                      this.redirectToResearch(enterprise.siren);
                    }}
                  />
                )}
              </>
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
