import "./search.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import trancheEffectif from "../../containers/Search/tranche-effectif.json";
import UsersFeedback from "../../containers/UsersFeedback";
import Config from "../../services/Config";
import SearchResults from "../SearchResults";
import { useCodeNaf } from "./codeNaf.gql.js";
import AdministartionFilter from "./Filters/AdministartionFilter.jsx";
import AutoCompleteFilter from "./Filters/AutoCompleteFilter";
import CheckboxFilter from "./Filters/CheckboxFilter";
import DirigeantFromFilter from "./Filters/DirigeantFromFilter";
import LocationFilter from "./Filters/LocationFilter";
import SearchBar from "./SearchBar";

const formatTrancheEffectifs = (trancheEffectifs) =>
  trancheEffectifs.map(({ code, libelle }) => ({
    label: libelle,
    value: code,
  }));

const formattedTranchesEffectifs = formatTrancheEffectifs(trancheEffectif);

const Search = ({
  isLoading,
  error,
  results,
  page,
  query,
  totalResults,
  sendRequest,
  searchTerm,
  setSearchTerm,
  resetSearch,
  resetSort,
  handlePageChange,
  addFilter,
  removeFilter,
  removeFilters,
  filters,
  sort,
  sortField,
  sortDirection,
  options,
  generateXlsx,
  downloadLoading,
}) => {
  const { data: codesNaf } = useCodeNaf();

  const onFormSubmit = (e) => {
    e.preventDefault();
    sendRequest(searchTerm, options);
  };
  const actif = Config.get("establishmentState").actif;
  const ferme = Config.get("establishmentState").ferme;
  const formattedSiege = [
    { label: "Oui", value: "true" },
    { label: "Non", value: "false" },
  ];
  const formattedEtatsAdministratif = [
    { label: "En activité", value: actif },
    { label: "Cessée", value: ferme },
  ];

  return (
    <div className="app-search">
      <div className="app-search__wrapper">
        <div className="container is-fullhd">
          {error && <div className="notification is-danger">{error}</div>}
          <div className="form search-form">
            <div className="columns is-centered">
              <div className="column is-9 ">
                <div className="description">
                  Découvrez la nouvelle interface graphique du portail FCE,
                  n’hésitez pas à nous donner votre avis via le bouton en bas de
                  page ou{" "}
                  <a
                    className="is-link"
                    href={`mailto:${Config.get("contact.mailto")}`}
                  >
                    le mail de contact
                  </a>
                </div>
              </div>
            </div>
            <div className="columns is-centered">
              <div className="column is-5">
                {" "}
                <SearchBar
                  label="Rechercher"
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  resetSearch={resetSearch}
                  isLoading={isLoading}
                  onEnterPress={() => {
                    resetSort();
                    sendRequest(searchTerm, options);
                  }}
                />
              </div>
              <div className="column is-3 ">
                <div className="search_btn">
                  <button
                    className={classNames("action", "button", "is-medium", {
                      "is-loading": isLoading,
                    })}
                    onClick={(e) => {
                      e.preventDefault();
                      resetSort();
                      sendRequest(searchTerm, options);
                    }}
                  >
                    Rechercher
                  </button>

                  <button
                    className="reset_button "
                    onClick={(e) => {
                      e.preventDefault();
                      resetSearch();
                    }}
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>
            </div>
            <div className="columns is-centered">
              <div className="column is-4">
                <LocationFilter
                  filters={filters}
                  addFilter={addFilter}
                  removeFilter={removeFilter}
                />
              </div>
              <div className="column is-4">
                <AdministartionFilter
                  label="Situation administrative"
                  onFormSubmit={onFormSubmit}
                  customFilters={[
                    "siege",
                    "etats",
                    "tranchesEffectifs",
                    "activites",
                  ]}
                  removeFilters={removeFilters}
                >
                  <CheckboxFilter
                    filters={filters}
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    options={formattedSiege}
                    id="siege"
                    label="Siège Social :"
                    placeholder="Choisir un siège Social"
                  />
                  {formattedEtatsAdministratif && (
                    <AutoCompleteFilter
                      filters={filters}
                      addFilter={addFilter}
                      removeFilter={removeFilter}
                      options={formattedEtatsAdministratif}
                      id="etats"
                      label="État administratif :"
                      placeholder="Choisir un état administratif"
                    />
                  )}
                  <div className="horizontal-separator" />
                  {formattedTranchesEffectifs && (
                    <AutoCompleteFilter
                      filters={filters}
                      addFilter={addFilter}
                      removeFilter={removeFilter}
                      options={formattedTranchesEffectifs}
                      id="tranchesEffectifs"
                      label="Effectif salarié :"
                      placeholder="Choisir une tranche d’effectif"
                    />
                  )}
                  <div className="horizontal-separator" />

                  <AutoCompleteFilter
                    filters={filters}
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    options={codesNaf}
                    id="naf"
                    label="Activité (NAF ou libellé)"
                    placeholder="Choisir un code NAF/APE"
                  />
                </AdministartionFilter>
              </div>

              <div className="column is-one-third">
                <AdministartionFilter
                  id="dirigeant"
                  label="Dirigeant"
                  onFormSubmit={onFormSubmit}
                  addSaveClearButton={false}
                  filters={filters}
                  removeFilters={removeFilters}
                  sendRequest={sendRequest}
                  customFilters={["dirigeant"]}
                >
                  <DirigeantFromFilter
                    filters={filters}
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    id="dirigeant"
                    placeholder="Dirigeant"
                    onFormSubmit={onFormSubmit}
                  />
                </AdministartionFilter>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SearchResults
        results={results}
        searchTerm={searchTerm}
        query={query}
        pagination={{
          current: page,
          handlePageChange,
          items: totalResults,
          itemsPerPage: 10,
          options,
          pages: Math.ceil(totalResults / 10),
          searchTerm,
        }}
        isLoading={isLoading}
        sortField={sortField}
        sortDirection={sortDirection}
        sort={sort}
        generateXlsx={generateXlsx}
        downloadLoading={downloadLoading}
      />
      <div className="container is-fluid">
        <UsersFeedback fullWidth />
      </div>
    </div>
  );
};

Search.propTypes = {
  addFilter: PropTypes.func.isRequired,
  divisionsNaf: PropTypes.array.isRequired,
  downloadLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  filters: PropTypes.object.isRequired,
  generateXlsx: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
  page: PropTypes.number,
  query: PropTypes.string,
  removeFilter: PropTypes.func.isRequired,
  removeFilters: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  resetSort: PropTypes.func.isRequired,
  results: PropTypes.array,
  searchTerm: PropTypes.string.isRequired,
  sendRequest: PropTypes.func.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  sort: PropTypes.func.isRequired,
  sortDirection: PropTypes.string,
  sortField: PropTypes.string,
  totalResults: PropTypes.number.isRequired,
  trancheEffectif: PropTypes.array.isRequired,
};

export default Search;
