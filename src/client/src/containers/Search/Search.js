import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setSearchTerm,
  setSearchFilters,
  setSearchResults,
  setSearchIsLoading,
  setSearchError
} from "../../services/Store/actions";
import * as AppSearch from "@elastic/app-search-javascript";
import Http from "../../services/Http";
import SearchView from "../../components/Search";
import divisionsNaf from "./divisions-naf.json";
import Config from "../../services/Config";

const client = AppSearch.createClient(Config.get("appSearch").client);
const defaultOptions = Config.get("appSearch").defaultOptions;

const Search = ({
  search,
  setSearchTerm,
  setSearchFilters,
  setSearchResults,
  setSearchIsLoading,
  setSearchError
}) => {
  const allFiltersOptions = {
    ...(search.filters.siege && { etablissementsiege: "true" }),
    ...(search.filters.state.length === 1 && {
      etatadministratifetablissement: search.filters.state[0]
    }),
    ...(search.filters.naf && { naf_division: search.filters.naf }),
    ...(search.filters.location &&
      (search.filters.location.value.length < 5
        ? {
            departement: search.filters.location.value
          }
        : {
            codecommuneetablissement: search.filters.location.value
          }))
  };

  const options = {
    ...defaultOptions,
    filters: {
      all: Object.entries(allFiltersOptions).map(([field, value]) => ({
        [field]: value
      })),
      none: {
        ...(search.filters.state.length === 0 && {
          etatadministratifetablissement: Object.values(
            Config.get("establishmentState")
          )
        })
      }
    }
  };

  const sendRequest = (query, options) => {
    setSearchIsLoading(true);
    setSearchError(null);

    client
      .search(`"${query}"`, options)
      .then(resultList => {
        setSearchResults(resultList);
        setSearchIsLoading(false);
      })
      .catch(error => {
        setSearchError(error);
        setSearchIsLoading(false);
        console.error(`error: ${error}`);
      });
  };

  const handlePageChange = nextCurrentPage =>
    sendRequest(search.term, {
      ...options,
      page: {
        ...options.page,
        current: nextCurrentPage
      }
    });

  const addFilter = (field, value) => {
    if (field === "state") {
      setSearchFilters({
        ...search.filters,
        state: [...search.filters.state, value]
      });
    } else {
      setSearchFilters({ ...search.filters, [field]: value });
    }
  };

  const removeFilter = (field, value) => {
    if (field === "state") {
      setSearchFilters({
        ...search.filters,
        state: [...search.filters.state.filter(state => state !== value)]
      });
    } else {
      setSearchFilters({ ...search.filters, [field]: null });
    }
  };

  const loadLocations = term => {
    const minTermLength = Config.get("advancedSearch").minTerms;
    const debounceTime = Config.get("advancedSearch").debounce;

    let loadLocationsTimer;
    clearTimeout(loadLocationsTimer);

    if (term.length < minTermLength) {
      return new Promise(resolve => {
        resolve([]);
      });
    }

    const communesPromise = Http.get("/communes", {
      params: {
        q: term
      }
    })
      .then(response => {
        if (response.data && response.data.results) {
          return response.data.results.map(commune => {
            return {
              label: `${commune.nom} (${commune.code_postal
                .trim()
                .padStart(5, "0")})`,
              value: commune.code_insee.trim().padStart(5, "0")
            };
          });
        }
        return [];
      })
      .catch(function(error) {
        console.error(error);
        return [];
      });

    const departementsPromise = Http.get("/departements", {
      params: {
        q: term
      }
    })
      .then(response => {
        if (response.data && response.data.results) {
          return response.data.results.map(departement => {
            return {
              label: `${departement.nom.toUpperCase()} (${departement.code})`,
              value: departement.code
            };
          });
        }
        return [];
      })
      .catch(function(error) {
        console.error(error);
        return [];
      });

    return new Promise(resolve => {
      return (loadLocationsTimer = setTimeout(() => {
        return Promise.all([communesPromise, departementsPromise]).then(
          result =>
            resolve([
              { label: "Départements", options: result[1] },
              { label: "Communes", options: result[0] }
            ])
        );
      }, debounceTime));
    });
  };

  useEffect(() => {
    if (search.term) {
      sendRequest(search.term, options);
    }
  }, []);

  return (
    <SearchView
      isLoading={search.isLoading}
      error={search.error}
      resultList={search.results}
      sendRequest={sendRequest}
      searchTerm={search.term}
      setSearchTerm={setSearchTerm}
      handlePageChange={handlePageChange}
      addFilter={addFilter}
      removeFilter={removeFilter}
      filters={search.filters}
      options={options}
      divisionsNaf={divisionsNaf}
      loadLocations={loadLocations}
    />
  );
};

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchTerm: term => {
      dispatch(setSearchTerm(term));
    },
    setSearchFilters: filters => {
      dispatch(setSearchFilters(filters));
    },
    setSearchResults: results => {
      dispatch(setSearchResults(results));
    },
    setSearchIsLoading: isLoading => {
      dispatch(setSearchIsLoading(isLoading));
    },
    setSearchError: error => {
      dispatch(setSearchError(error));
    }
  };
};

Search.propTypes = {
  search: PropTypes.object.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  setSearchFilters: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  setSearchIsLoading: PropTypes.func.isRequired,
  setSearchError: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
