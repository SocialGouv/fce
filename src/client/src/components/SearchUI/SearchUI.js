import React, { useEffect } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  ErrorBoundary,
  SearchProvider,
  SearchBox,
  PagingInfo,
  ResultsPerPage,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout, SingleLinksFacet } from "@elastic/react-search-ui-views";
import SearchUIResults from "../SearchUIResults";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { createSecureContext } from "tls";

const connector = new AppSearchAPIConnector({
  searchKey: "search-37cj9814zm5zcbhqf4q1byqm",
  engineName: "fce",
  endpointBase: "https://appsearch.fce.test",
  hostIdentifier: "dumbValueToAvoidError"
});

const configurationOptions = {
  apiConnector: connector
};

const SearchUI = () => {
  return (
    <SearchProvider config={configurationOptions}>
      <WithSearch
        mapContextToProps={props =>
          console.log("from SearchUI.js", props) || { ...props }
        }
      >
        {({
          isLoading,
          results,
          totalResults,
          current,
          setCurrent,
          resultsPerPage,
          totalPages
        }) =>
          isLoading ? (
            <div>Loading</div>
          ) : (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      inputProps={{
                        placeholder: "SIRET, SIREN, raison sociale, nom"
                      }}
                    />
                  }
                  bodyContent={
                    <div>
                      <PagingInfo />
                      <ResultsPerPage />
                    </div>
                  }
                />

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
                />
              </ErrorBoundary>
            </div>
          )
        }
      </WithSearch>
    </SearchProvider>
  );
};

export default SearchUI;
