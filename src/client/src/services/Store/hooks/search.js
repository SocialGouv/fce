import { useEffect, useState } from "react";
import { useFilters } from "../../../utils/search-table/hooks";
import { useElasticQuery } from "../../Elastic/elastic";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm as setSearchTermAction,
  setSearchPage as setSearchPageAction,
  setSearchFilters,
  setSearchResults,
  resetSearch
} from "../actions";

const getSearchState = state => state.search;

export const useSearchTerms = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector(state => getSearchState(state).term);
  const setSearchTerm = term => {
    dispatch(setSearchTermAction(term));
  };

  return [searchTerm, setSearchTerm];
};

export const useSearchPage = () => {
  const dispatch = useDispatch();

  const searchPage = useSelector(state => getSearchState(state).page);
  const setSearchPage = page => {
    dispatch(setSearchPageAction(page));
  };

  return [searchPage || 1, setSearchPage];
};

export const useSearchFilters = () => {
  const dispatch = useDispatch();
  const savedFilters = useSelector(state => getSearchState(state).filters);

  // cache busting mechanism
  const validFilters = savedFilters.etats
    ? savedFilters
    : {
        etats: ["A", "F"]
      };

  const { filters, addFilter, removeFilter } = useFilters(validFilters);

  useEffect(() => {
    dispatch(setSearchFilters(filters));
  }, [filters]);

  return { filters, addFilter, removeFilter };
};

export const useSearchResults = (
  elasticQuery,
  { searchPage, elasticQueryParams }
) => {
  const dispatch = useDispatch();
  const results = useSelector(state => getSearchState(state).results);

  const { data, loading, error } = useElasticQuery(elasticQuery, {
    page: { current: searchPage - 1, size: 10 },
    params: elasticQueryParams,
    defaultValue: results
  });

  useEffect(() => {
    if (data.results !== null) {
      dispatch(setSearchResults(data));
    }
  }, [data]);

  return {
    data: results,
    loading,
    error
  };
};

export const useResetSearch = () => {
  const dispatch = useDispatch();

  return () => dispatch(resetSearch());
};
