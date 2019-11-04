import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import SearchUIResults from "../SearchUIResults";
import SiegeFilter from "./Filters/SiegeFilter";
import StateFilter from "./Filters/StateFilter";
import NafFilter from "./Filters/NafFilter";
import LocationFilter from "./Filters/LocationFilter";

import "./search.scss";

const SearchUI = ({
  isLoading,
  error,
  resultList,
  sendRequest,
  searchTerm,
  setSearchTerm,
  handlePageChange,
  addFilters,
  removeFilters,
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
            <div className="field is-grouped is-grouped-centered">
              <div className="control is-expanded">
                <input
                  type="text"
                  name="q"
                  id="term"
                  className="input is-medium"
                  placeholder="SIRET, SIREN, raison sociale, nom"
                  onChange={e => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
              </div>
              <div className="control">
                <button
                  type="submit"
                  className="action button is-outlined is-light is-medium"
                >
                  {false ? (
                    <span className="icon">
                      <FontAwesomeIcon icon={faSpinner} spin />
                    </span>
                  ) : (
                    "Rechercher"
                  )}
                </button>
              </div>
            </div>
          </form>
          <div className="columns facets__checkboxes">
            <div className="column is-one-third">
              <SiegeFilter
                filters={filters}
                addFilters={addFilters}
                removeFilters={removeFilters}
              />
            </div>
            <div className="column is-one-third">
              <StateFilter
                filters={filters}
                addFilters={addFilters}
                removeFilters={removeFilters}
              />
            </div>
          </div>{" "}
          <div className="columns facets__selects">
            <div className="column is-one-third">
              <NafFilter
                filters={filters}
                addFilters={addFilters}
                removeFilters={removeFilters}
                divisionsNaf={divisionsNaf}
              />
            </div>
            <div className="column is-one-third">
              <LocationFilter
                filters={filters}
                addFilters={addFilters}
                removeFilters={removeFilters}
                loadLocations={loadLocations}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    {resultList && (
      <SearchUIResults
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

SearchUI.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  resultList: PropTypes.object,
  sendRequest: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  addFilters: PropTypes.func.isRequired,
  removeFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  divisionsNaf: PropTypes.array.isRequired,
  loadLocations: PropTypes.func.isRequired
};

export default SearchUI;
