import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
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
      <div className="App">
        <Layout
          header={<SearchBox />}
          // titleField est le champ le plus important dans un résultat : c’est l’en-tête du résultat.
          bodyContent={<Results titleField="name" urlField="image_url" />}
        />
      </div>
    </SearchProvider>
  );
};

export default SearchUI;
