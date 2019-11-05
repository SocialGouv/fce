import React, { useState } from "react";
import * as AppSearch from "@elastic/app-search-javascript";
import Http from "../../services/Http";
import SearchView from "../../components/Search";
import divisionsNaf from "./divisions-naf.json";
import Config from "../../services/Config";

const Search = () => {
  const client = AppSearch.createClient(Config.get("appSearch").client);
  const defaultOptions = Config.get("appSearch").defaultOptions;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultList, setResultList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    naf: null,
    location: null,
    siege: null,
    state: ["A", "F"]
  });

  const allFiltersOptions = {
    ...(filters.siege && { etablissementsiege: "true" }),
    ...(filters.state.length === 1 && {
      etatadministratifetablissement: filters.state[0]
    }),
    ...(filters.naf && { naf_division: filters.naf }),
    ...(filters.location &&
      (filters.location.value.length < 5
        ? {
            departement: filters.location.value
          }
        : {
            codecommuneetablissement: filters.location.value
          }))
  };

  const options = {
    ...defaultOptions,
    filters: {
      all: Object.entries(allFiltersOptions).map(([field, value]) => ({
        [field]: value
      })),
      none: {
        ...(filters.state.length === 0 && {
          etatadministratifetablissement: ["A", "F"]
        })
      }
    }
  };

  const sendRequest = (query, options) => {
    setIsLoading(true);
    setError(null);
    client
      .search(query, options)
      .then(resultList => {
        setResultList(resultList);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
        console.error(`error: ${error}`);
      });
  };

  const handlePageChange = nextCurrentPage =>
    sendRequest(searchTerm, {
      ...options,
      page: {
        ...options.page,
        current: nextCurrentPage
      }
    });

  const addFilters = (field, value) => {
    if (field === "state") {
      setFilters({
        ...filters,
        state: [...filters.state, value]
      });
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  const removeFilters = (field, value) => {
    if (field === "state") {
      setFilters({
        ...filters,
        state: [...filters.state.filter(state => state !== value)]
      });
    } else {
      setFilters({ ...filters, [field]: null });
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

  return (
    <SearchView
      isLoading={isLoading}
      error={error}
      resultList={resultList}
      sendRequest={sendRequest}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handlePageChange={handlePageChange}
      addFilters={addFilters}
      removeFilters={removeFilters}
      filters={filters}
      options={options}
      divisionsNaf={divisionsNaf}
      loadLocations={loadLocations}
    />
  );
};

export default Search;
