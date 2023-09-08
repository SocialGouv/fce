import "./sidebar.scss";

import classNames from "classnames";
import { compose } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { renderIfSiren } from "../../../helpers/hoc/renderIfSiren";
import Config from "../../../services/Config";
import {
  resetSearch,
  setSearchFilters,
  setSearchTerm,
} from "../../../services/Store/actions";
import {
  getEtablissements,
  // getName,
} from "../../../utils/entreprise/entreprise";
import { isSiege } from "../../../utils/establishment/establishment";
// import Value from "../../shared/Value";
import { useEstablishmentData } from "../Sections/SharedComponents/EstablishmentContext.jsx";
import PrintSection from "./../../DataSheets/Sections/SharedComponents/PrintSection";
import { getEtablissementsCount } from "./Sidebar.gql";

const Sidebar = ({
  siren,
  siret,
  isEstablishmentDisplayed = false,
  isEstablishmentsDisplayed = false,
  isEntrepriseDisplayed = false,
  history,
  setSearchTerm,
  resetSearch,
}) => {
  const limitItems = Config.get("sidebarEstablishmentsLimit");
  console.log(
    setSearchTerm,
    isEstablishmentsDisplayed,
    resetSearch,
    limitItems,
    history
  );
  console.log("setSearchTerm, resetSearch, limitItems", siret, history);
  const { loading, data: entreprise, error } = useEstablishmentData();

  if (loading || error) {
    return null;
  }
  console.log("historyhistory", history?.location.hash);

  const etablissements = entreprise ? getEtablissements(entreprise) : [];

  const etablissementsCount = entreprise
    ? getEtablissementsCount(entreprise)
    : 0;

  const headOffice = etablissements.find(isSiege);
  const etabSec = etablissements.find((obj) => obj.siret == siret);
  const etabsecIsSiege = isSiege(etabSec);

  const establishmentsAnchors = [
    { label: "Activité", link: "#activity" },
    { label: "Visites et contrôles", link: "#direccte" },
    { label: "Relation travail", link: "#relation" },
    { label: "Mutations économiques", link: "#muteco" },
    { label: "Aides", link: "#helps" },
    { label: "Agréments", link: "#agrements" },
    { label: "Autres etablissements", link: "#autres-etablissements" },
  ];

  const entrepriseAnchors = [
    { label: "Informations légales", link: "#infos" },
    { label: "Visites et contrôles", link: "#direccte" },
    { label: "Relation travail", link: "#relationship" },
    {
      label: "Mutations économiques",
      link: "#muteco",
    },
    { label: "Aides", link: "#helps" },
    { label: "Agréments", link: "#agrements" },
    { label: "Autres etablissements", link: "#autres-etablissements" },
  ];
  return (
    <>
      <aside className={` aside-contain`}>
        <section className="sidebar__enterprise">
          <div className="sidebar-items">
            <div className="item">
              <button
                className={classNames([
                  "item-title",
                  `${isEntrepriseDisplayed && "active "}`,
                ])}
                onClick={() => {
                  history.push(`/enterprise/${siren}`);
                }}
              >
                Entreprise
              </button>
              {isEntrepriseDisplayed && (
                <div className="anchors">
                  {entrepriseAnchors.map(({ label, link }) => (
                    <div key={label}>
                      <div
                        className="ellipse"
                        style={{
                          "--border-color":
                            history?.location?.hash == link
                              ? "#000091"
                              : "#e3e3fd",
                        }}
                      />
                      <a
                        href={link}
                        className={`${
                          history?.location?.hash == link ? "active-anchor" : ""
                        }`}
                      >
                        {" "}
                        {label}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {headOffice && (
              <div className="item">
                <button
                  className={classNames([
                    "item-title",
                    `${
                      isEstablishmentDisplayed &&
                      etabsecIsSiege &&
                      "active selected-item"
                    }`,
                  ])}
                  onClick={() => {
                    history.push(`/establishment/${headOffice?.siret}`);
                  }}
                >
                  Siège social
                </button>
                {isEstablishmentDisplayed && etabsecIsSiege && (
                  <div className="anchors">
                    {establishmentsAnchors.map(({ label, link }) => (
                      <div key={label}>
                        <div
                          className="ellipse"
                          style={{
                            "--border-color":
                              history?.location?.hash == link
                                ? "#000091"
                                : "#e3e3fd",
                          }}
                        />
                        <a
                          href={link}
                          className={`${
                            history?.location?.hash == link
                              ? "active-anchor"
                              : ""
                          }`}
                        >
                          {" "}
                          {label}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="item">
              <button
                className={classNames([
                  "item-title",
                  `${isEstablishmentDisplayed && !etabsecIsSiege && "active"}`,
                  `${isEstablishmentsDisplayed && "selected-item"}`,
                ])}
                // onClick={() => {
                //   !etablissementsCount
                //     ? null
                //     : history.push(`/list-establishments/${siren}`);
                // }}
              >
                {" "}
                {`${
                  etablissementsCount ? etablissementsCount : "Aucun"
                } établissements`}
              </button>

              {/* {isEstablishmentDisplayed && !etabsecIsSiege && (
                <div className="anchors">
                  <span className="etb-name">
                    <Value
                      value={getName(entreprise).toLowerCase()}
                      empty="-"
                    />
                  </span>
                  {establishmentsAnchors.map(({ label, link }) => (
                    <div key={label}>
                      <div
                        className="ellipse"
                        style={{
                          "--border-color":
                            history?.location?.hash == link
                              ? "#000091"
                              : "#e3e3fd",
                        }}
                      />
                      <a
                        href={link}
                        className={`${
                          history?.location?.hash == link ? "active-anchor" : ""
                        }`}
                      >
                        {" "}
                        {label}
                      </a>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          </div>
          <div className="sidebar-btns">
            <PrintSection />
          </div>
        </section>

        {/* <section className="sidebar__establishments">
          {etablissementsCount > 1 && (
            <>
              <EstablishmentsItems
                establishments={displayedEstablishments}
                establishmentType="Autres établissements"
                limit={limitItems}
              />
              {etablissementsCount > limitItems && (
                <>
                  <Button
                    value="Afficher la liste"
                    icon={faArrowDown}
                    className="button is-secondary is-outlined sidebar__view-all-button"
                    onClick={() => setDisplayAll(true)}
                  />
                  <Button
                    value="Rechercher tous les établissements"
                    icon={faArrowRight}
                    className="button is-secondary is-outlined sidebar__view-all-button"
                    onClick={() => {
                      resetSearch();
                      setSearchTerm(siren);
                      history.push("/");
                    }}
                  />
                </>
              )}
            </>
          )}
        </section> */}
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
  history: PropTypes.object.isRequired,
  isEntrepriseDisplayed: PropTypes.bool,
  isEstablishmentDisplayed: PropTypes.bool,
  isEstablishmentsDisplayed: PropTypes.bool,
  resetSearch: PropTypes.func.isRequired,
  setSearchFilters: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  siren: PropTypes.string.isRequired,
  siret: PropTypes.string.isRequired,
};

export default React.memo(
  compose(withRouter, connect(null, mapDispatchToProps), renderIfSiren)(Sidebar)
);
