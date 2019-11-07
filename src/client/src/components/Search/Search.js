import React from "react";
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

import "./search.scss";

const Search = ({
  isLoading,
  error,
  resultList,
  sendRequest,
  searchTerm,
  setSearchTerm,
  handlePageChange,
  addFilter,
  removeFilter,
  filters,
  options,
  divisionsNaf,
  loadLocations
}) => (
  <div className="App">
    <div className="app-search pb-4">
      <div className="columns app-search--container">
        <div className="column is-offset-2-desktop is-offset-2-tablet is-8-desktop is-8-tablet search">
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
              <div className="column is-four-fifths">
                <div className="field is-grouped is-grouped-centered">
                  <div className="control is-expanded">
                    <label htmlFor="term" className="label">
                      Nom ou raison sociale, SIRET ou SIREN
                    </label>
                    <input
                      type="text"
                      name="q"
                      id="term"
                      className="input is-medium"
                      onChange={e => {
                        setSearchTerm(e.target.value);
                      }}
                      value={searchTerm}
                    />
                  </div>
                </div>
                <div className="columns filters__checkboxes">
                  <div className="column is-one-third">
                    <SiegeFilter
                      filters={filters}
                      addFilter={addFilter}
                      removeFilter={removeFilter}
                    />
                  </div>
                  <div className="column is-one-third">
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
                      preExpanded={
                        filters.naf || filters.location
                          ? ["advancedSearch"]
                          : []
                      }
                    >
                      <AccordionItem uuid="advancedSearch">
                        <AccordionItemHeading>
                          <AccordionItemButton>
                            <span>Recherche avancée</span>
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                          <div className="columns filters__selects">
                            <div className="column is-one-third">
                              <NafFilter
                                filters={filters}
                                addFilter={addFilter}
                                removeFilter={removeFilter}
                                divisionsNaf={divisionsNaf}
                              />
                            </div>
                            <div className="column is-one-third">
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
              <div className="control column is-one-fifth button-wrapper">
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
              </div>
            </div>
          </form>
        </div>
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
          searchTerm
        }}
        isLoading={isLoading}
      />
    )}
  </div>
);

Search.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  resultList: PropTypes.object,
  sendRequest: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  divisionsNaf: PropTypes.array.isRequired,
  loadLocations: PropTypes.func.isRequired
};

export default Search;
