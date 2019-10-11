import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  SearchProvider,
  SearchBox,
  WithSearch
} from "@elastic/react-search-ui";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import SearchUIResults from "../SearchUIResults";

const connector = new AppSearchAPIConnector({
  searchKey: process.env.REACT_APP_SEARCH_KEY,
  engineName: process.env.REACT_APP_SEARCH_ENGINE_NAME,
  endpointBase: process.env.REACT_APP_SEARCH_ENDPOINT_BASE,
  hostIdentifier: process.env.REACT_APP_SEARCH_HOST_IDENTIFIER
});

const configurationOptions = {
  apiConnector: connector
};

const SearchUI = () => {
  const hasParameters = window.location.href.includes("?");

  return (
    <SearchProvider config={configurationOptions}>
      <WithSearch mapContextToProps={props => props}>
        {({
          isLoading,
          error,
          results,
          totalResults,
          current,
          setCurrent,
          resultsPerPage,
          totalPages
        }) => (
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

                  {!isLoading && (
                    <SearchBox
                      view={({ onChange, value, onSubmit }) => (
                        <form className="form search-form" onSubmit={onSubmit}>
                          <div className="field is-grouped is-grouped-centered">
                            <div className="control is-expanded">
                              <input
                                type="text"
                                id="term"
                                className="input is-medium"
                                placeholder="SIRET, SIREN, raison sociale, nom"
                                onChange={e => onChange(e.currentTarget.value)}
                                value={value}
                              />
                            </div>
                            <div className="control">
                              <button
                                type="submit"
                                className="action button is-outlined is-light is-medium"
                              >
                                {isLoading && !error ? (
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
                      )}
                    />
                  )}
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
                currentItems: results
              }}
              isLoading={isLoading}
              hasParameters={hasParameters}
            />
          </div>
        )}
      </WithSearch>
    </SearchProvider>
  );
};

export default SearchUI;
