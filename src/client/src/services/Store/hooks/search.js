import { omit } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useElasticQuery } from "../../Elastic/elastic";
import {
  resetSearch,
  setSearchFilters,
  setSearchPage as setSearchPageAction,
  setSearchResults,
  setSearchTerm as setSearchTermAction,
} from "../actions";

const getSearchState = (state) => state.search;

export const useSearchTerms = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => getSearchState(state).term);
  const setSearchTerm = (term) => {
    dispatch(setSearchTermAction(term));
  };

  return [searchTerm, setSearchTerm];
};

export const useSearchPage = () => {
  const dispatch = useDispatch();

  const searchPage = useSelector((state) => getSearchState(state).page);
  const setSearchPage = (page) => {
    dispatch(setSearchPageAction(page));
  };

  return [searchPage || 1, setSearchPage];
};

export const useSearchFilters = () => {
  const dispatch = useDispatch();
  const savedFilters = useSelector((state) => getSearchState(state).filters);

  // cache busting mechanism
  const validFilters = savedFilters.etats
    ? savedFilters
    : {
        etats: ["A", "F"],
      };

  const addFilter = (key, value) => {
    dispatch(setSearchFilters({ ...validFilters, [key]: value }));
  };

  const removeFilter = (key) => {
    dispatch(setSearchFilters(omit(validFilters, key)));
  };

  return { addFilter, filters: savedFilters, removeFilter };
};

export const useSearchQuery = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => getSearchState(state).results);

  const { data, loading, error, makeQuery } = useElasticQuery();

  useEffect(() => {
    if (data.results !== null) {
      dispatch(setSearchResults(data));
    }
  }, [dispatch, data]);

  return {
    data: results,
    error,
    loading,
    makeQuery,
  };
};

export const useResetSearch = () => {
  const dispatch = useDispatch();

  return () => dispatch(resetSearch());
};
