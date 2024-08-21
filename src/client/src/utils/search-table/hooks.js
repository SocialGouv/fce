import { omit } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useSearchSortTerms } from "../../services/Store/hooks/search";

export const useFilters = (defaultValue) => {
  const [filters, setFilters] = useState(defaultValue);

  const addFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const removeFilter = (key) => {
    setFilters(omit(filters, key));
  };

  return {
    addFilter,
    filters,
    removeFilter,
  };
};

export const useSort = () => {
  const [setSearchSortOrder, setSearchSortField] = useSearchSortTerms();
  const sortFieldFromStore = useSelector((state) => state?.sort?.sortField);
  const sortOrderFromStore = useSelector((state) => state?.sort?.sortOrder);
  const [sortDirection, setSortDirection] = useState(sortOrderFromStore);
  const [sortField, setSortField] = useState(sortFieldFromStore);
  const { addFilter } = useFilters();

  useEffect(() => {
    if (sortFieldFromStore == null && sortOrderFromStore == null) {
      setSortField(sortFieldFromStore);
      setSortDirection(sortOrderFromStore);
    }
  }, [sortFieldFromStore, sortOrderFromStore]);

  const toggleSortField = (field) => {
    if (field !== sortField) {
      setSearchSortField(field);
      setSortField(field);
      addFilter("sortField", field);
      addFilter("sortDirection", "desc");
      setSortDirection("desc");
      setSearchSortOrder("desc");
      return;
    }

    if (sortDirection === "desc") {
      setSortDirection("asc");
      setSearchSortOrder("asc");
      addFilter("sortDirection", "asc");

      return;
    }
    if (sortDirection === "asc") {
      setSortDirection("desc");
      setSearchSortOrder("desc");
      addFilter("sortDirection", "desc");

      return;
    }

    setSortField(null);
  };

  return {
    sortDirection,
    sortField,
    toggleSortField,
  };
};
