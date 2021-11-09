import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SearchResults from "../SearchResults";
import SiegeFilter from "./Filters/SiegeFilter";
import StateFilter from "./Filters/StateFilter";
import NafFilter from "./Filters/NafFilter";
import EffectifFilter from "./Filters/EffectifFilter";
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

import "./search.scss";

const Search = ({
  isLoading,
  error,
  resultList,
  pagination,
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
  trancheEffectif,
  loadLocations,
  generateXlsx,
  downloadXlsxStatus
}) => {
  const [isOpenAdvancedSearch, setIsOpenAdvancedSearch] = useState(true);
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
                          <div className="columns filters__selects">
                            <div className="column is-half">
                              <EffectifFilter
                                filters={filters}
                                addFilter={addFilter}
                                removeFilter={removeFilter}
                                trancheEffectif={trancheEffectif}
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
          results={resultList}
          pagination={{
            ...pagination,
            handlePageChange,
            searchTerm,
            options
          }}
          isLoading={isLoading}
          sort={sort}
          currentSort={currentSort}
          generateXlsx={generateXlsx}
          downloadXlsxStatus={downloadXlsxStatus}
        />
      )}
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
  trancheEffectif: PropTypes.array.isRequired,
  loadLocations: PropTypes.func.isRequired,
  generateXlsx: PropTypes.func.isRequired,
  downloadXlsxStatus: PropTypes.object.isRequired
};

export default Search;
