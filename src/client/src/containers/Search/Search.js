import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setSearchTerm,
  setSearchFilters,
  setSearchSort,
  setSearchResults,
  setSearchIsLoading,
  setSearchError,
  resetSearch
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
  setSearchSort,
  setSearchResults,
  setSearchIsLoading,
  setSearchError,
  resetSearch
}) => {
  const allFiltersOptions = {
    ...(search.filters.siege && { etablissementsiege: "true" }),
    ...(search.filters.state.length === 1 && {
      etatadministratifetablissement: search.filters.state[0]
    })
  };

  if (Array.isArray(search.filters.location)) {
    search.filters.location.forEach(location => {
      const isCodeInsee =
        location.value.length === Config.get("codeInseeLength");

      const filterKey = isCodeInsee
        ? "codecommuneetablissement"
        : "departement";

      if (!allFiltersOptions.hasOwnProperty(filterKey)) {
        allFiltersOptions[filterKey] = [];
      }

      const values = location.value.split(",");
      allFiltersOptions[filterKey] = [
        ...allFiltersOptions[filterKey],
        ...values
      ];
    });
  }

  if (Array.isArray(search.filters.naf)) {
    search.filters.naf.forEach(({ value }) => {
      if (!allFiltersOptions.hasOwnProperty("naf_division")) {
        allFiltersOptions.naf_division = [];
      }

      allFiltersOptions.naf_division.push(value);
    });
  }

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

  if (search.sort && search.sort.field) {
    options.sort = {
      [search.sort.field]: search.sort.ascDirection ? "asc" : "desc"
    };
  }

  const sendRequest = (query, options) => {
    setSearchIsLoading(true);
    setSearchError(null);

    client
      .search(query === "" ? query : `"${query}"`, options)
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

  const sort = field => {
    const { sort } = setSearchSort({
      field,
      ascDirection:
        search.sort && search.sort.field === field
          ? !search.sort.ascDirection
          : true
    });

    sendRequest(search.term, {
      ...options,
      sort: { [sort.field]: sort.ascDirection ? "asc" : "desc" }
    });
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
      resetSearch={resetSearch}
      handlePageChange={handlePageChange}
      addFilter={addFilter}
      removeFilter={removeFilter}
      filters={search.filters}
      currentSort={search.sort}
      sort={sort}
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
    setSearchSort: sort => {
      return dispatch(setSearchSort(sort));
    },
    setSearchResults: results => {
      dispatch(setSearchResults(results));
    },
    setSearchIsLoading: isLoading => {
      dispatch(setSearchIsLoading(isLoading));
    },
    setSearchError: error => {
      dispatch(setSearchError(error));
    },
    resetSearch: () => {
      dispatch(resetSearch());
    }
  };
};

Search.propTypes = {
  search: PropTypes.object.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  setSearchFilters: PropTypes.func.isRequired,
  setSearchSort: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  setSearchIsLoading: PropTypes.func.isRequired,
  setSearchError: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
