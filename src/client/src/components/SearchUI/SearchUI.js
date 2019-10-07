import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout, SingleLinksFacet } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new AppSearchAPIConnector({
  searchKey: "search-37cj9814zm5zcbhqf4q1byqm",
  engineName: "fce",
  endpointBase: "https://appsearch.fce.test",
  hostIdentifier: "dumbValueToAvoidError"
});

const configurationOptions = {
  apiConnector: connector
  // Complétons ensemble.
};

const SearchUI = () => {
  return (
    <SearchProvider config={configurationOptions}>
      <WithSearch mapContextToProps={props => ({ ...props })}>
        {props => {
          return props.isLoading ? (
            <div>Loading</div>
          ) : (
            <div className="App">
              <pre>{JSON.stringify(props, null, 2)}</pre>
              <ErrorBoundary>
                <Layout
                  header={<SearchBox />}
                  // titleField est le champ le plus important dans un résultat : c’est l’en-tête du résultat.
                  bodyContent={
                    <>
                      <Paging />
                      <PagingInfo />
                      <ResultsPerPage />
                      <Results titleField="siret" />
                    </>
                  }
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
};

export default SearchUI;
