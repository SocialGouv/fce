import "./sidebar.scss";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Config from "../../../services/Config";
import {
  resetSearch,
  setSearchFilters,
  setSearchTerm,
} from "../../../services/Store/actions";
import Button from "../../shared/Button";
import Value from "../../shared/Value";
import EstablishmentsItems from "./EstablishmentsItems/EstablishmentsItems";

const Sidebar = ({
  establishments,
  enterprise,
  headOffice,
  isEstablishmentDisplayed,
  history,
  setSearchTerm,
  resetSearch,
}) => {
  const limitItems = Config.get("sidebarEstablishmentsLimit");

  const closedEstablishmentsCount = establishments.filter(
    (establishment) =>
      establishment.etat_etablissement ===
      Config.get("establishmentState").ferme
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
              buttonClasses={["sidebar__enterprise-button", "is-secondary"]}
              callback={() => {
                history.push(`/enterprise/${enterprise.siren}`);
              }}
            />
          )}
        </section>

        <section className="sidebar__establishments">
          <p className="sidebar__establishments-count">
            {establishments.length >= limitItems ? (
              <strong>
                Plus de <Value value={establishments.length} /> établissements
              </strong>
            ) : (
              <>
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
              </>
            )}
          </p>

          <div>
            <EstablishmentsItems
              establishments={headOffice ? [headOffice] : []}
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
                  (establishment) => establishment.siret !== headOffice?.siret
                )}
                establishmentType="Autres établissements"
                limit={limitItems}
              />
              {establishments.length > limitItems && (
                <Button
                  value="Voir tous les établissements"
                  icon={faArrowRight}
                  className="button is-secondary is-outlined sidebar__view-all-button"
                  onClick={() => {
                    resetSearch();
                    setSearchTerm(enterprise.siren);
                    history.push("/");
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

Sidebar.propTypes = {
  enterprise: PropTypes.object.isRequired,
  establishments: PropTypes.array.isRequired,
  headOffice: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isEstablishmentDisplayed: PropTypes.bool,
  resetSearch: PropTypes.func.isRequired,
  setSearchFilters: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Sidebar));
