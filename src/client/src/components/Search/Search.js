import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SearchResults from "../SearchResults";
import CheckboxFilter from "./Filters/CheckboxFilter";
import StateFilter from "./Filters/StateFilter";
import AutoCompleteFilter from "./Filters/AutoCompleteFilter";
import LocationFilter from "./Filters/LocationFilter";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from "react-accessible-accordion";
import SearchBar from "./SearchBar";
import UsersFeedback from "../../containers/UsersFeedback";
import Unsubscribe from "../../containers/Unsubscribe/Unsubscribe";
import trancheEffectif from "../../containers/Search/tranche-effectif.json";

import "./search.scss";

const formatDivisionsNaf = divisionsNaf =>
  divisionsNaf.map(({ code, libelle }) => ({
    value: code,
    label: `${code} - ${libelle}`
  }));

const formatTrancheEffectifs = trancheEffectifs =>
  trancheEffectifs.map(({ code, libelle }) => ({
    value: code,
    label: libelle
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
  filters,
  sort,
  sortField,
  sortDirection,
  options,
  divisionsNaf,
  generateXlsx,
  downloadLoading
}) => {
  const [isOpenAdvancedSearch, setIsOpenAdvancedSearch] = useState(true);
  console.log("comp", totalResults, results);
  return (
    <div className="app-search">
      <div className="app-search__wrapper">
        <div className="container is-fullhd">
          {error && <div className="notification is-danger">{error}</div>}
          <form
            className="form search-form"
            onSubmit={e => {
              e.preventDefault();
              sendRequest(searchTerm, options);
            }}
          >
            <div className="columns">
              <div className="column is-10">
                <div className="field is-grouped is-grouped-centered">
                  <SearchBar
                    label="Nom ou raison sociale, SIRET ou SIREN"
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    resetSearch={resetSearch}
                    isLoading={isLoading}
                  />
                </div>

                <div className="columns filters__checkboxes">
                  <div className="column is-4">
                    <CheckboxFilter
                      filters={filters}
                      addFilter={addFilter}
                      removeFilter={removeFilter}
                      id="siege"
                      label="Siège Social"
                    />
                  </div>
                  <div className="column is-8">
                    <StateFilter
                      filters={filters}
                      addFilter={addFilter}
                      removeFilter={removeFilter}
                      id="etats"
                    />
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <Accordion
                      allowZeroExpanded
                      preExpanded={["advancedSearch"]}
                      onChange={e => {
                        setIsOpenAdvancedSearch(!!e.length);
                      }}
                    >
                      <AccordionItem uuid="advancedSearch">
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            <span>Recherche avancée</span>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <div className="columns filters__selects">
                            <div className="column is-half">
                              <AutoCompleteFilter
                                filters={filters}
                                addFilter={addFilter}
                                removeFilter={removeFilter}
                                options={formatDivisionsNaf(divisionsNaf)}
                                id="activites"
                                label="Activité (NAF ou libellé)"
                              />
                            </div>
                            <div className="column is-half">
                              <LocationFilter
                                filters={filters}
                                addFilter={addFilter}
                                removeFilter={removeFilter}
                              />
                            </div>
                          </div>
                          <div className="columns filters__selects">
                            <div className="column is-half">
                              <AutoCompleteFilter
                                filters={filters}
                                addFilter={addFilter}
                                removeFilter={removeFilter}
                                options={formattedTranchesEffectifs}
                                id="tranchesEffectifs"
                                label="Tranche effectif (DSN)"
                              />
                            </div>
                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>

              <div
                className={classNames("column is-2 search-form__buttons", {
                  "search-form__buttons--align-top": !isOpenAdvancedSearch
                })}
              >
                <div>
                  <button
                    className={classNames(
                      "action",
                      "button",
                      "is-secondary",
                      "is-medium",
                      { "is-loading": isLoading }
                    )}
                  >
                    Rechercher
                  </button>
                  <button
                    className="button is-text search-form__reset"
                    onClick={e => {
                      e.preventDefault();
                      resetSearch();
                    }}
                  >
                    Vider la recherche
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <SearchResults
        results={results}
        pagination={{
          current: page,
          handlePageChange,
          itemsPerPage: 10,
          pages: Math.ceil(totalResults / 10),
          items: totalResults,
          searchTerm,
          options
        }}
        isLoading={isLoading}
        sortField={sortField}
        sortDirection={sortDirection}
        sort={sort}
        generateXlsx={generateXlsx}
        downloadLoading={downloadLoading}
      />
      <div>
        <UsersFeedback />
        <Unsubscribe />
      </div>
    </div>
  );
};

Search.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  results: PropTypes.array.isRequired,
  page: PropTypes.number,
  sendRequest: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  sortField: PropTypes.string,
  sortDirection: PropTypes.string,
  sort: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  divisionsNaf: PropTypes.array.isRequired,
  trancheEffectif: PropTypes.array.isRequired,
  totalResults: PropTypes.number.isRequired,
  generateXlsx: PropTypes.func.isRequired,
  downloadLoading: PropTypes.bool.isRequired
};

export default Search;
