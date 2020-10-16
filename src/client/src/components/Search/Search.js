import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SearchResults from "../SearchResults";
import SiegeFilter from "./Filters/SiegeFilter";
import StateFilter from "./Filters/StateFilter";
import NafFilter from "./Filters/NafFilter";
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

import "./search.scss";

const Search = ({
  isLoading,
  error,
  resultList,
  sendRequest,
  searchTerm,
  setSearchTerm,
  resetSearch,
  handlePageChange,
  addFilter,
  removeFilter,
  filters,
  currentSort,
  sort,
  options,
  divisionsNaf,
  loadLocations
}) => {
  const [isOpenAdvancedSearch, setIsOpenAdvancedSearch] = useState(true);

  return (
    <div className="app-search">
      <div className="app-search__wrapper">
        <div className="container is-fullhd">
          {error && (
            <div className="notification is-danger">
              Une erreur est survenue lors de la communication avec l{"'"}
              API
            </div>
          )}
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
                    <SiegeFilter
                      filters={filters}
                      addFilter={addFilter}
                      removeFilter={removeFilter}
                    />
                  </div>
                  <div className="column is-8">
                    <StateFilter
                      filters={filters}
                      addFilter={addFilter}
                      removeFilter={removeFilter}
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
                              <NafFilter
                                filters={filters}
                                addFilter={addFilter}
                                removeFilter={removeFilter}
                                divisionsNaf={divisionsNaf}
                              />
                            </div>
                            <div className="column is-half">
                              <LocationFilter
                                filters={filters}
                                addFilter={addFilter}
                                removeFilter={removeFilter}
                                loadLocations={loadLocations}
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

      {resultList && (
        <SearchResults
          results={resultList.rawResults}
          pagination={{
            current: resultList.info.meta.page.current,
            handlePageChange,
            itemsPerPage: resultList.info.meta.page.size,
            pages: resultList.info.meta.page.total_pages,
            items: resultList.info.meta.page.total_results,
            searchTerm,
            options
          }}
          isLoading={isLoading}
          sort={sort}
          currentSort={currentSort}
        />
      )}

      <UsersFeedback />
    </div>
  );
};

Search.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  resultList: PropTypes.object,
  sendRequest: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  currentSort: PropTypes.object,
  sort: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  divisionsNaf: PropTypes.array.isRequired,
  loadLocations: PropTypes.func.isRequired
};

export default Search;
