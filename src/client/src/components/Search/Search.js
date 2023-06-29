import "./search.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

import trancheEffectif from "../../containers/Search/tranche-effectif.json";
// import Unsubscribe from "../../containers/Unsubscribe/Unsubscribe";
import UsersFeedback from "../../containers/UsersFeedback";
import SearchResults from "../SearchResults";
import AutoCompleteFilter from "./Filters/AutoCompleteFilter";
import CheckboxFilter from "./Filters/CheckboxFilter";
import LocationFilter from "./Filters/LocationFilter";
import StateFilter from "./Filters/StateFilter";
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
  filters,
  sort,
  sortField,
  sortDirection,
  options,
  divisionsNaf,
  generateXlsx,
  downloadLoading,
}) => {
  const [isOpenAdvancedSearch, setIsOpenAdvancedSearch] = useState(true);

  return (
    <div className="app-search">
      <div className="app-search__wrapper">
        <div className="container is-fullhd">
          {error && <div className="notification is-danger">{error}</div>}
          <form
            className="form search-form"
            onSubmit={(e) => {
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
                      onChange={(e) => {
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
                  "search-form__buttons--align-top": !isOpenAdvancedSearch,
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
                    onClick={(e) => {
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
      <div>
        <UsersFeedback />
        {/* <Unsubscribe /> */}
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
  removeFilter: PropTypes.func.isRequired,
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
