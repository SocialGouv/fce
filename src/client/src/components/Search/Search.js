import "./search.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import trancheEffectif from "../../containers/Search/tranche-effectif.json";
// import Unsubscribe from "../../containers/Unsubscribe/Unsubscribe";
import UsersFeedback from "../../containers/UsersFeedback";
import Config from "../../services/Config";
import SearchResults from "../SearchResults";
import AdministartionFilter from "./Filters/AdministartionFilter.jsx";
import AutoCompleteFilter from "./Filters/AutoCompleteFilter";
import CheckboxFilter from "./Filters/CheckboxFilter";
// import CheckboxFilter from "./Filters/CheckboxFilter";
import DirigeantFromFilter from "./Filters/DirigeantFromFilter";
import LocationFilter from "./Filters/LocationFilter";
// import StateFilter from "./Filters/StateFilter";
import SearchBar from "./SearchBar";

const formatDivisionsNaf = (divisionsNaf) =>
  divisionsNaf.map(({ code, libelle }) => ({
    label: `${code} - ${libelle}`,
    value: code,
  }));

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
  totalResults,
  sendRequest,
  searchTerm,
  setSearchTerm,
  resetSearch,
  handlePageChange,
  addFilter,
  removeFilter,
  removeFilters,
  filters,
  sort,
  sortField,
  sortDirection,
  options,
  divisionsNaf,
  generateXlsx,
  downloadLoading,
}) => {
  const onFromSubmit = (e) => {
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
            <div className="columns">
              <div className="column is-half">
                <div className="field is-grouped is-grouped-centered ">
                  <SearchBar
                    label="Rechercher"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    resetSearch={resetSearch}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="columns filters__selects">
              <div className="column is-one-quarter">
                <LocationFilter
                  filters={filters}
                  addFilter={addFilter}
                  removeFilter={removeFilter}
                />
              </div>
              <div className="column is-one-quarter">
                <AdministartionFilter
                  label="Situation administrative"
                  onFromSubmit={onFromSubmit}
                  customFilters={[
                    "siege",
                    "etats",
                    "tranchesEffectifs",
                    "activites",
                  ]}
                  removeFilters={removeFilters}
                  sendRequest={sendRequest}
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
                  <AutoCompleteFilter
                    filters={filters}
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    options={formattedEtatsAdministratif}
                    id="etats"
                    label="État administratif :"
                    placeholder="Choisir un état administratif"
                  />
                  <div className="horizontal-separator" />
                  <AutoCompleteFilter
                    filters={filters}
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    options={formattedTranchesEffectifs}
                    id="tranchesEffectifs"
                    label="Effectif salarié :"
                    placeholder="Choisir une tranche d’effectif"
                  />
                  <div className="horizontal-separator" />
                  <AutoCompleteFilter
                    filters={filters}
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    options={formatDivisionsNaf(divisionsNaf)}
                    id="activites"
                    label="Activité (NAF ou libellé)"
                    placeholder="Choisir un code NAF/APE"
                  />
                </AdministartionFilter>
              </div>
              <div className="column is-one-quarter">
                <AdministartionFilter
                  id="dirigeant"
                  label="Dirigeant"
                  addSaveClearButton={false}
                >
                  <DirigeantFromFilter
                    filters={filters}
                    addFilter={addFilter}
                    removeFilter={removeFilter}
                    id="dirigeant"
                    placeholder="Dirigeant"
                  />
                </AdministartionFilter>
              </div>

              <div className={classNames("column  search-form__buttons")}>
                <div className="columns filters__checkboxes">
                  {/* <div className="column ">
                      <CheckboxFilter
                        filters={filters}
                        addFilter={addFilter}
                        removeFilter={removeFilter}
                        id="siege"
                        label="Siège Social"
                      />
                    </div>
                    <div className="column">
                      <StateFilter
                        filters={filters}
                        addFilter={addFilter}
                        removeFilter={removeFilter}
                        id="etats"
                      />
                    </div> */}
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half" />
              <div className="column is-half">
                <div className="search_btn">
                  <button
                    className={classNames("action", "button", "is-medium", {
                      "is-loading": isLoading,
                    })}
                    onClick={(e) => {
                      e.preventDefault();
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
          </div>
        </div>
      </div>

      <SearchResults
        results={results}
        searchTerm={searchTerm}
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
      <div className="container is-fullhd">
        <UsersFeedback fullWidth />
      </div>

      {/* <Unsubscribe /> */}
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
  removeFilter: PropTypes.func.isRequired,
  removeFilters: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
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
