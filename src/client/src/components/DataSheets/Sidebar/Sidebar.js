import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import EstablishmentsItems from "./EstablishmentsItems/EstablishmentsItems";
import Value from "../../shared/Value";
import { faArrowRight } from "@fortawesome/fontawesome-pro-solid";
import Config from "../../../services/Config";
import { setTerm, resetSearch } from "../../../services/Store/actions";
import Button from "../../shared/Button";

import "./sidebar.scss";

const Sidebar = ({
  establishments,
  enterprise,
  headOffice,
  isEstablishmentDisplayed,
  history,
  setTerm,
  resetSearch
}) => {
  const limitItems = Config.get("sidebarEstablishmentsLimit");

  const closedEstablishmentsCount = establishments.filter(
    establishment => establishment.etat_etablissement === "F"
  ).length;

  return (
    <>
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
                history.push(`/enterprise/${enterprise.siren}`);
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
                    Promise.all([
                      resetSearch(),
                      setTerm("q", enterprise.siren)
                    ]).then(() => {
                      history.push("/");
                    });
                  }}
                />
              )}
            </>
          )}
        </section>
      </aside>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setTerm: (termKey, termValue) => {
      return dispatch(setTerm(termKey, termValue));
    },
    resetSearch: () => dispatch(resetSearch())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Sidebar)
);
