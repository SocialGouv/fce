import { omit } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useElasticQuery } from "../../Elastic/elastic";
import {
  resetSearch,
  setSearchFilters,
  setSearchPage as setSearchPageAction,
  setSearchResults,
  setSearchSortField as setSearchSortFieldAction,
  setSearchSortOrder as setSearchSortOrderAction,
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
export const useSearchSortTerms = () => {
  const dispatch = useDispatch();
  const setSearchSortOrder = (term) => {
    dispatch(setSearchSortOrderAction(term));
  };
  const setSearchSortField = (term) => {
    dispatch(setSearchSortFieldAction(term));
  };

  return [setSearchSortOrder, setSearchSortField];
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
        etats: ["A"],
      };
  const addFilter = (key, value) => {
    dispatch(setSearchFilters({ ...savedFilters, [key]: value }));
  };

  const removeFilter = (key) => {
    dispatch(setSearchFilters(omit(savedFilters, key)));
  };
  const deleteKeys = (obj, keys) => {
    if (!Array.isArray(keys)) {
      throw new Error("Keys must be an array");
    }

    const newObj = {};

    Object.keys(obj).forEach((key) => {
      if (!keys.includes(key)) {
        newObj[key] = obj[key];
      }
    });

    return newObj;
  };

  const removeFilters = (keys) => {
    const updatedFilters = keys.reduce(
      (acc, key) => deleteKeys(acc, [key]),
      validFilters
    );
    dispatch(setSearchFilters(updatedFilters));
  };

  return { addFilter, filters: savedFilters, removeFilter, removeFilters };
};

export const useSearchQuery = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => getSearchState(state).results);
  const { data, loading, error, makeQuery, query } = useElasticQuery();

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
    query,
  };
};

export const useResetSearch = () => {
  const dispatch = useDispatch();

  return () => dispatch(resetSearch());
};
