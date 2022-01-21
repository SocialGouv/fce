import React, { useState } from "react";
import moment from "moment";
import Http from "../../services/Http";
import SearchView from "../../components/Search";
import divisionsNaf from "./divisions-naf.json";
import trancheEffectif from "./tranche-effectif.json";
import { useSort } from "../../utils/search-table/hooks";
import { groupBy, omit } from "lodash";
import { prop } from "lodash/fp";
import { useFileDownload } from "../../utils/file-download/hooks";
import {
  useResetSearch,
  useSearchFilters,
  useSearchPage,
  useSearchResults,
  useSearchTerms
} from "../../services/Store/hooks/search";

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
  const [searchQuery, setSearchQuery] = useSearchTerms();
  const [searchPage, setSearchPage] = useSearchPage();

  const { filters, addFilter, removeFilter } = useSearchFilters();
  const { sortField, sortDirection, toggleSortField } = useSort();

  const [elasticQuery, setElasticQuery] = useState(searchQuery);
  const [elasticQueryParams, setElasticQueryParams] = useState({});

  const { data, loading, error } = useSearchResults(elasticQuery, {
    searchPage,
    elasticQueryParams
  });

  const resetSearch = useResetSearch();

  const downloadQuery = async () => {
    if (elasticQuery === null) {
      return;
    }
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
    setSearchPage(1);
  };

  return (
    <SearchView
      isLoading={loading}
      error={error}
      results={data?.results}
      page={searchPage}
      pageSize={PAGE_SIZE}
      totalResults={data?.total || 0}
      sendRequest={onSearch}
      searchTerm={searchQuery || ""}
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

export default Search;
