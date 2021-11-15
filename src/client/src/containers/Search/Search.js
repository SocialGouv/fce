import React, { useState } from "react";
import PropTypes from "prop-types";
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
import Http from "../../services/Http";
import SearchView from "../../components/Search";
import divisionsNaf from "./divisions-naf.json";
import trancheEffectif from "./tranche-effectif.json";
import { useElasticQuery } from "../../services/Elastic/elastic";
import { useFilters, useSort } from "../../utils/search-table/hooks";
import { groupBy, omit } from "lodash";
import { prop } from "lodash/fp";
import { useFileDownload } from "../../utils/file-download/hooks";

const PAGE_SIZE = 10;

const XLSX_DOC_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const formatLocationFilter = filters => {
  const locationFilters = groupBy(filters.location, "type");
  return {
    ...omit(filters, "location"),
    codesCommunes: locationFilters?.commune?.map(prop("value")) || [],
    departements: locationFilters?.departement?.map(prop("value")) || []
  };
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);

  const { filters, addFilter, removeFilter } = useFilters({
    etats: ["A", "F"]
  });
  const { sortField, sortDirection, toggleSortField } = useSort();

  const [elasticQuery, setElasticQuery] = useState("");
  const [elasticQueryParams, setElasticQueryParams] = useState({});

  const {
    data: { total, results },
    loading,
    error
  } = useElasticQuery(elasticQuery, {
    page: { current: searchPage - 1, size: 10 },
    params: elasticQueryParams
  });

  const downloadQuery = async () => {
    const trimmedQuery = elasticQuery.trim();

    const response = await Http.get("/downloadXlsx", {
      params: {
        q: trimmedQuery,
        ...elasticQueryParams
      },
      responseType: "blob"
    });

    return {
      contentType: response.headers["content-type"],
      data: response.data
    };
  };

  const exportDate = moment().format("YYYY-MM-DD_HH-m-s");

  const { download, loading: downloadLoading } = useFileDownload(
    downloadQuery,
    {
      fileName: `FceExport-${exportDate}.xlsx`,
      documentType: XLSX_DOC_TYPE
    }
  );

  const handlePageChange = nextCurrentPage => {
    setSearchPage(nextCurrentPage);
  };

  const onSearch = () => {
    setElasticQuery(searchQuery);
    setElasticQueryParams(formatLocationFilter(filters));
  };

  return (
    <SearchView
      isLoading={loading}
      error={error}
      results={results}
      page={searchPage}
      pageSize={PAGE_SIZE}
      totalResults={total}
      sendRequest={onSearch}
      searchTerm={searchQuery}
      setSearchTerm={setSearchQuery}
      resetSearch={resetSearch}
      handlePageChange={handlePageChange}
      addFilter={addFilter}
      removeFilter={removeFilter}
      filters={filters}
      sortField={sortField}
      sortDirection={sortDirection}
      sort={toggleSortField}
      options={{}}
      divisionsNaf={divisionsNaf}
      trancheEffectif={trancheEffectif}
      generateXlsx={download}
      downloadLoading={downloadLoading}
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
