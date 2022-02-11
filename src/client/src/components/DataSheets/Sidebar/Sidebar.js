import "./sidebar.scss";

import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { sortBy } from "lodash";
import { compose } from "lodash/fp";
import PropTypes from "prop-types";
import React, { useState } from "react";
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
  getNafLabel,
  getName,
} from "../../../utils/entreprise/entreprise";
import { getState, isSiege } from "../../../utils/establishment/establishment";
import { not } from "../../../utils/functions/functions";
import { plural } from "../../../utils/plural/plural";
import Button from "../../shared/Button";
import Value from "../../shared/Value";
import EstablishmentsItems from "./EstablishmentsItems/EstablishmentsItems";
import {
  getEtablissementsCount,
  getEtablissementsOuvertsCount,
  useSidebarData,
} from "./Sidebar.gql";

const Sidebar = ({
  siren,
  isEstablishmentDisplayed,
  history,
  setSearchTerm,
  resetSearch,
}) => {
  const limitItems = Config.get("sidebarEstablishmentsLimit");

  const [displayAll, setDisplayAll] = useState(false);
  const { loading, data, error } = useSidebarData(siren, {
    limit: !displayAll ? limitItems : undefined,
  });

  if (loading || error) {
    return null;
  }

  const { entreprises } = data;
  const entreprise = entreprises[0];

  const etablissements = getEtablissements(entreprise);

  const etablissementsCount = getEtablissementsCount(entreprise);
  const etablissementsOuvertsCount = getEtablissementsOuvertsCount(entreprise);
  const etablissementsFermesCount =
    etablissementsCount - etablissementsOuvertsCount;

  const headOffice = etablissements.find(isSiege);

  const displayedEstablishments = sortBy(
    etablissements.filter(not(isSiege)),
    getState
  );

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
            <Value value={getName(entreprise).toLowerCase()} empty="-" />
          </h3>
          <p className="sidebar__enterprise-naf">
            <Value value={getNafLabel(entreprise)} empty="-" />
          </p>
          {isEstablishmentDisplayed && (
            <Button
              value="Voir la fiche entreprise"
              icon={faArrowRight}
              buttonClasses={["sidebar__enterprise-button", "is-secondary"]}
              callback={() => {
                history.push(`/enterprise/${siren}`);
              }}
            />
          )}
        </section>

        <section className="sidebar__establishments">
          <p className="sidebar__establishments-count">
            <strong>
              <Value value={etablissementsCount} empty="Aucun " />{" "}
              {plural({
                count: etablissementsCount,
                plural: "établissements",
                singular: "établissement",
              })}
              {etablissementsFermesCount > 0 && (
                <>
                  <br />
                  <span>
                    dont {etablissementsFermesCount}{" "}
                    {plural({
                      count: etablissementsFermesCount,
                      plural: "fermés",
                      singular: "fermé",
                    })}
                  </span>
                </>
              )}
            </strong>
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
  isEstablishmentDisplayed: PropTypes.bool,
  resetSearch: PropTypes.func.isRequired,
  setSearchFilters: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  siren: PropTypes.string.isRequired,
};

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
  renderIfSiren
)(Sidebar);
