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
  const sortFieldFromStore = useSelector(
    (state) => state?.search?.sort?.sortField
  );
  const sortOrderFromStore = useSelector(
    (state) => state?.search?.sort?.sortOrder
  );
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
      // Set a new sort field and default direction to "desc"
      setSortField(field);
      setSearchSortField(field);
      setSortDirection("desc");
      setSearchSortOrder("desc");
      addFilter("sortField", field);
      addFilter("sortDirection", "desc");
    } else {
      // Toggling sort direction if field is the same
      if (sortDirection === "desc") {
        setSortDirection("asc");
        setSearchSortOrder("asc");
        addFilter("sortDirection", "asc");
      } else if (sortDirection === "asc") {
        // Reset on the third click
        setSortField(null);
        setSortDirection(null);
        setSearchSortField(null);
        setSearchSortOrder(null);
        addFilter("sortField", null);
        addFilter("sortDirection", null);
      }
    }
  };

  return {
    sortDirection,
    sortField,
    toggleSortField,
  };
};
