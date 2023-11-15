import "./sidebar.scss";

import classNames from "classnames";
import { compose } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { renderIfSiren } from "../../../helpers/hoc/renderIfSiren";
import {
  resetSearch,
  setSearchFilters,
  setSearchTerm,
} from "../../../services/Store/actions";
import {
  getEtablissements,
  getName,
} from "../../../utils/entreprise/entreprise";
import { isSiege } from "../../../utils/establishment/establishment";
import EllipseIconAside from "../../shared/Icons/EllipseIconAside.jsx";
import MessageIcon from "../../shared/Icons/MessageIcon.jsx";
import Value from "../../shared/Value";
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
  onOpenUserFeedbackBox,
}) => {
  const { loading, data: entreprise, error } = useEstablishmentData();

  if (loading || error) {
    return null;
  }

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
  const handleOpenUserFeedback = () => {
    onOpenUserFeedbackBox();
    history.push("#user-feedback");
  };
  return (
    <>
      <aside className={` aside-contain`}>
        <section className="sidebar__enterprise">
          <div className="sidebar-items">
            <div className="item">
              <button
                className={classNames([
                  "item-title",
                  `${isEntrepriseDisplayed && "active selected-item "}`,
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
                      <span className="ellipse-span">
                        <EllipseIconAside
                          color={
                            history?.location?.hash == link
                              ? "#000091"
                              : "#e3e3fd"
                          }
                        />
                      </span>
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
                        <span className="ellipse-span">
                          <EllipseIconAside
                            color={
                              history?.location?.hash == link
                                ? "#000091"
                                : "#e3e3fd"
                            }
                          />
                        </span>
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
                onClick={() => {
                  return !etablissementsCount
                    ? null
                    : history.push(`/list-establishments/${siren}`);
                }}
              >
                {" "}
                {`${
                  etablissementsCount ? etablissementsCount : "Aucun"
                } établissements`}
              </button>

              {isEstablishmentDisplayed && !etabsecIsSiege && (
                <div className="anchors">
                  <span className="etb-name">
                    <Value
                      value={getName(entreprise).toLowerCase()}
                      empty="-"
                    />
                  </span>
                  {establishmentsAnchors.map(({ label, link }) => (
                    <div key={label}>
                      <span className="ellipse-span">
                        <EllipseIconAside
                          color={
                            history?.location?.hash == link
                              ? "#000091"
                              : "#e3e3fd"
                          }
                        />
                      </span>
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
          </div>
          <div className="sidebar-btns">
            <PrintSection />
            <button
              className="print-btn data-sheet__print-button"
              onClick={() => handleOpenUserFeedback()}
            >
              <MessageIcon />
            </button>
          </div>
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
  history: PropTypes.object.isRequired,
  isEntrepriseDisplayed: PropTypes.bool,
  isEstablishmentDisplayed: PropTypes.bool,
  isEstablishmentsDisplayed: PropTypes.bool,
  onOpenUserFeedbackBox: PropTypes.func,
  resetSearch: PropTypes.func.isRequired,
  setSearchFilters: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  siren: PropTypes.string.isRequired,
  siret: PropTypes.string,
};

export default React.memo(
  compose(withRouter, connect(null, mapDispatchToProps), renderIfSiren)(Sidebar)
);
