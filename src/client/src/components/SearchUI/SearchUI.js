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
import Select from "react-select";
import SearchUIResults from "../SearchUIResults";
import SiegeFacet from "./Facets/SiegeFacet";
import StateFacet from "./Facets/StateFacet";
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
      naf_division: { type: "value", size: 100 }
    }
  }
};

const SearchUI = ({ divisionsNaf }) => {
  const selectCustomStyles = {
    option: (provided, state) => ({
      ...provided,
      color: "#353535"
    })
  };

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
          totalPages
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
                        <Facet field="etablissementsiege" view={SiegeFacet} />
                      </div>
                      <div className="column is-one-third">
                        <Facet
                          field="etatadministratifetablissement"
                          view={StateFacet}
                        />
                      </div>
                    </div>

                    <div className="columns facets__selects">
                      <div className="column is-one-third">
                        <div className="field">
                          <div className="control">
                            <Facet
                              field="naf_division"
                              view={({
                                onChange,
                                onRemove,
                                values,
                                options
                              }) => {
                                const selectOptions = options.map(option => {
                                  const division = divisionsNaf.find(
                                    division => division.code === option.value
                                  );
                                  return {
                                    value: option.value,
                                    label: `${option.value} - ${division &&
                                      division.libelle}`
                                  };
                                });

                                const selectedFilterValue = values[0];

                                const selectedOption = selectOptions.find(
                                  option => {
                                    if (
                                      selectedFilterValue &&
                                      selectedFilterValue.name &&
                                      option.value.name ===
                                        selectedFilterValue.name
                                    ) {
                                      return true;
                                    }

                                    if (option.value === selectedFilterValue) {
                                      return true;
                                    }

                                    return false;
                                  }
                                );

                                return (
                                  <Select
                                    id="naf"
                                    name="naf"
                                    options={selectOptions}
                                    onChange={option =>
                                      selectedOption
                                        ? onRemove(selectedOption.value)
                                        : onChange(option && option.value)
                                    }
                                    placeholder="Code NAF ou libellé"
                                    isClearable
                                    value={selectedOption}
                                    styles={selectCustomStyles}
                                  />
                                );
                              }}
                              label="naf"
                            />
                          </div>
                        </div>
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
                  currentItems: results
                }}
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
  divisionsNaf: PropTypes.array.isRequired
};

export default SearchUI;
