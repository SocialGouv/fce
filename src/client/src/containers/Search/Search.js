import { groupBy, omit } from "lodash";
import { prop } from "lodash/fp";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import SearchView from "../../components/Search";
import Http from "../../services/Http";
import {
  useResetSearch,
  useResetSort,
  useSearchFilters,
  useSearchPage,
  useSearchQuery,
  useSearchTerms,
} from "../../services/Store/hooks/search";
import { normalizeCodeCommunes } from "../../utils/code-commune/code-commune";
import { useFileDownload } from "../../utils/file-download/hooks";
import { useSort } from "../../utils/search-table/hooks";
import divisionsNaf from "./divisions-naf.json";
import trancheEffectif from "./tranche-effectif.json";

const PAGE_SIZE = 10;

const XLSX_DOC_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const formatLocationFilter = (filters, sortDirection, sortField) => {
  const locationFilters = groupBy(filters.location, "type");
  const codesCommunes = locationFilters?.commune?.map(prop("value")) || [];
  const departements = [
    ...(locationFilters?.departement?.map(prop("value")) || []),
    ...(locationFilters?.region?.flatMap((regionItem) =>
      regionItem.regions.map((region) => region.value)
    ) || []),
  ];
  return {
    ...omit(filters, "location"),
    codesCommunes: normalizeCodeCommunes(codesCommunes),
    departements,

    sortField: sortField,
    sortOrder: sortDirection,
  };
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useSearchTerms();
  const [searchPage, setSearchPage] = useSearchPage();
  const sortFieldFromStore = useSelector(
    (state) => state?.search?.sort?.sortField
  );

  const sortOrderFromStore = useSelector(
    (state) => state?.search?.sort?.sortOrder
  );

  const { filters, addFilter, removeFilter, removeFilters } =
    useSearchFilters();
  const { sortField, sortDirection, toggleSortField } = useSort();

  const { data, loading, error, makeQuery, query } = useSearchQuery();
  const resetSearch = useResetSearch();
  const resetSort = useResetSort();
  useEffect(() => {
    if (searchQuery) {
      onSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    onSearch();
  }, [sortField, sortDirection]);

  const downloadQuery = async () => {
    const trimmedQuery = searchQuery?.trim();

    const response = await Http.get("/downloadXlsx", {
      params: {
        q: trimmedQuery,
        ...formatLocationFilter(
          filters,
          sortOrderFromStore != null ? sortDirection : null,
          sortFieldFromStore != null ? sortField : null
        ),
      },
      responseType: "blob",
    });

    return {
      contentType: response.headers["content-type"],
      data: response.data,
    };
  };

  const exportDate = moment().format("YYYY-MM-DD_HH-m-s");

  const { download, loading: downloadLoading } = useFileDownload(
    downloadQuery,
    {
      documentType: XLSX_DOC_TYPE,
      fileName: `FceExport-${exportDate}.xlsx`,
    }
  );

  const handlePageChange = (nextCurrentPage) => {
    setSearchPage(nextCurrentPage);
    makeQuery(searchQuery, {
      page: { current: nextCurrentPage - 1, size: PAGE_SIZE },
      params: formatLocationFilter(
        filters,
        sortOrderFromStore != null ? sortDirection : null,
        sortFieldFromStore != null ? sortField : null
      ),
    });
  };

  const onSearch = () => {
    setSearchPage(1);
    makeQuery(searchQuery, {
      page: { current: 0, size: PAGE_SIZE },
      params: formatLocationFilter(
        filters,
        sortOrderFromStore != null ? sortDirection : null,
        sortFieldFromStore != null ? sortField : null
      ),
    });
  };

  return (
    <SearchView
      isLoading={loading}
      error={error}
      results={data?.results}
      page={searchPage}
      pageSize={PAGE_SIZE}
      query={query}
      totalResults={data?.total || 0}
      sendRequest={onSearch}
      searchTerm={searchQuery || ""}
      setSearchTerm={setSearchQuery}
      resetSearch={resetSearch}
      resetSort={resetSort}
      handlePageChange={handlePageChange}
      addFilter={addFilter}
      removeFilter={removeFilter}
      removeFilters={removeFilters}
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
