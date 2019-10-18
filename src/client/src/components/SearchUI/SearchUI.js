import React from "react";
import PropTypes from "prop-types";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  SearchProvider,
  SearchBox,
  Facet,
  WithSearch
} from "@elastic/react-search-ui";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import SearchUIResults from "../SearchUIResults";
import SiegeFacet from "./Facets/SiegeFacet";
import StateFacet from "./Facets/StateFacet";
import NafFacet from "./Facets/NafFacet";
import DepartmentFacet from "./Facets/DepartmentFacet";
import SearchBar from "./SearchBar";

import "./search.scss";

const connector = new AppSearchAPIConnector({
  searchKey: process.env.REACT_APP_SEARCH_KEY,
  engineName: process.env.REACT_APP_SEARCH_ENGINE_NAME,
  endpointBase: process.env.REACT_APP_SEARCH_ENDPOINT_BASE,
  hostIdentifier: process.env.REACT_APP_SEARCH_HOST_IDENTIFIER
});

const configurationOptions = {
  apiConnector: connector,
  searchQuery: {
    facets: {
      etablissementsiege: { type: "value" },
      etatadministratifetablissement: { type: "value" },
      naf_division: { type: "value", size: 100 },
      departement: { type: "value", size: 150 }
    }
  }
};

const SearchUI = ({ divisionsNaf, departments }) => {
  return (
    <SearchProvider config={configurationOptions}>
      <WithSearch
        mapContextToProps={props => console.log({ WithSearch: props }) || props}
      >
        {({
          isLoading,
          error,
          results,
          totalResults,
          current,
          setCurrent,
          resultsPerPage,
          totalPages,
          facets,
          filters,
          searchTerm
        }) => {
          return (
            <div className="App">
              <div className="app-search pb-4">
                <div className="columns app-search--container">
                  <div className="column is-offset-2-desktop is-offset-2-tablet is-8-desktop is-8-tablet search">
                    <h2 className="title pb-2">
                      Retrouvez un établissement ou une entreprise
                    </h2>

                    {error && (
                      <div className="notification is-danger">
                        Une erreur est survenue lors de la communication avec l
                        {"'"}API
                      </div>
                    )}
                    <SearchBox
                      view={SearchBar}
                      isLoading={isLoading}
                      error={error}
                    />

                    <div className="columns facets__checkboxes">
                      <div className="column is-one-third">
                        <Facet
                          field="etablissementsiege"
                          view={SiegeFacet}
                          label="siege"
                        />
                      </div>
                      <div className="column is-one-third">
                        <Facet
                          field="etatadministratifetablissement"
                          view={StateFacet}
                          label="state"
                        />
                      </div>
                    </div>

                    <div className="columns facets__selects">
                      <div className="column is-one-third">
                        <Facet
                          field="naf_division"
                          view={NafFacet}
                          label="naf"
                          options={
                            facets &&
                            facets.naf_division &&
                            facets.naf_division[0].data
                          }
                          divisionsNaf={divisionsNaf}
                        />
                      </div>
                      <div className="column is-one-third">
                        <Facet
                          field="departement"
                          view={DepartmentFacet}
                          label="departement"
                          departments={departments}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <SearchUIResults
                results={results}
                pagination={{
                  current,
                  setCurrent,
                  itemsPerPage: resultsPerPage,
                  pages: totalPages,
                  items: totalResults,
                  currentItems: results,
                  searchTerm
                }}
                filters={filters}
                isLoading={isLoading}
              />
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
};

SearchUI.propTypes = {
  divisionsNaf: PropTypes.array.isRequired,
  departments: PropTypes.object.isRequired
};

export default SearchUI;
