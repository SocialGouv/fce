import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import downloadjs from "downloadjs";
import { connect } from "react-redux";
import moment from "moment";
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
import trancheEffectif from "./tranche-effectif.json";
import Config from "../../services/Config";
import { formatSearchInput, isSiret } from "../../helpers/Search";
import {
  formatAppSearchResults,
  formatAppSearchPagination
} from "../../helpers/AppSearch/AppSearch";

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
  const [downloadXlsxStatus, setDownloadXlsxStatus] = useState({
    isLoading: false,
    success: false,
    error: null
  });

  const allFiltersOptions = {
    ...(search.filters.siege && { etablissementsiege: "true" }),
    ...(search.filters.state.length === 1 && {
      etatadministratifetablissement: search.filters.state[0]
    })
  };

  if (Array.isArray(search.filters.location)) {
    search.filters.location.forEach(location => {
      const isCodeInsee =
        location.value.length >= Config.get("codeInseeLength");

      const filterKey = isCodeInsee
        ? "codecommuneetablissement"
        : "departement";

      if (!Object.prototype.hasOwnProperty.call(allFiltersOptions, filterKey)) {
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
      if (
        !Object.prototype.hasOwnProperty.call(allFiltersOptions, "naf_division")
      ) {
        allFiltersOptions.naf_division = [];
      }

      allFiltersOptions.naf_division.push(value);
    });
  }

  if (Array.isArray(search.filters.effectif)) {
    search.filters.effectif.forEach(({ value }) => {
      if (
        !Object.prototype.hasOwnProperty.call(
          allFiltersOptions,
          "lastdsntrancheeffectifsetablissement"
        )
      ) {
        allFiltersOptions.lastdsntrancheeffectifsetablissement = [];
      }
      allFiltersOptions.lastdsntrancheeffectifsetablissement.push(value);
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

  const sendRequest = async (query, options) => {
    setSearchIsLoading(true);
    setSearchError(null);

    if (isSiret(query)) {
      // query is a siret, call ApiGouv endpoint to get establishment
      const response = await Http.get(`/search/api-gouv/${query.replace(/\s/g, "")}`);

      setSearchResults({
        results: [response.data],
        pagination: {
          current: 1,
          size: 1,
          pages: 1,
          items: 1
        }
      }, options.filters);
    } else {
      // query is not a siret, call AppSearch
      try {
        const resultList = await client.search(formatSearchInput(query), options);
        setSearchResults({
          results: formatAppSearchResults(resultList),
          pagination: formatAppSearchPagination(resultList)
        }, options.filters);
      } catch (error) {
        setSearchError(
          `Une erreur est survenue lors de la communication avec l'API`
        );
        console.error(`error: ${error}`);
      }
    }

    setSearchIsLoading(false);
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

  const loadLocations = async term => {
    const minTermLength = Config.get("advancedSearch").minTerms;
    const debounceTime = Config.get("advancedSearch").debounce;

    let loadLocationsTimer;
    clearTimeout(loadLocationsTimer);

    if (term.length < minTermLength) {
      return [];
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
      .catch(function (error) {
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
      .catch(function (error) {
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

  const generateXlsx = () => {
    setDownloadXlsxStatus({ isLoading: true, succes: false, error: null });

    const exportDate = moment().format("YYYY-MM-DD_HH-m-s");

    Http.post(
      "/downloadXlsx",
      {
        payload: {
          totalItems: search.results.info.meta.page.total_results,
          searchTerm: search.term,
          filters: search.results.resultsFilters
        }
      },
      { responseType: "blob" }
    )
      .then(response => {
        setDownloadXlsxStatus({
          isLoading: false,
          succes: true,
          error: null
        });
        if (response.data && response.data) {
          const fileName = `FceExport-${exportDate}.xlsx`;

          return downloadjs(
            new Blob([response.data], {
              type: response.headers["content-type"]
            }),
            fileName,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
        }
      })
      .catch(async error => {
        const errorMessage = await error.response.data.text();
        setDownloadXlsxStatus({
          isLoading: false,
          succes: false,
          error: errorMessage
        });
      });
  };

  const searchParamsOnLoad = useRef({ searchTerm: search.term, options });
  const sendRequestOnce = useRef(sendRequest);

  useEffect(() => {
    const { searchTerm, options } = searchParamsOnLoad.current;
    const sendRequest = sendRequestOnce.current;
    if (searchTerm) {
      sendRequest(searchTerm, options);
    }
  }, [searchParamsOnLoad, sendRequestOnce]);

  console.log(search.results);

  return (
    <SearchView
      isLoading={search.isLoading}
      error={search.error || downloadXlsxStatus.error}
      resultList={search?.results?.results || []}
      pagination={search?.results?.pagination}
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
      trancheEffectif={trancheEffectif}
      loadLocations={loadLocations}
      generateXlsx={generateXlsx}
      downloadXlsxStatus={downloadXlsxStatus}
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
    setSearchResults: (results, resultsFilters) => {
      dispatch(setSearchResults(results, resultsFilters));
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
