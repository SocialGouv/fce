import { useState } from "react";
import { omit } from "lodash";

export const useFilters = defaultValue => {
  const [filters, setFilters] = useState(defaultValue);

  const addFilter = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const removeFilter = key => {
    setFilters(omit(filters, key));
  };

  return {
    filters,
    addFilter,
    removeFilter
  };
};

export const useSort = () => {
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortField, setSortField] = useState(null);

  const toggleSortField = field => {
    if (field !== sortField) {
      setSortDirection("desc");
      setSortField(field);
      return;
    }

    if (sortDirection === "desc") {
      setSortDirection("asc");
      return;
    }

    setSortField(null);
  };

  return {
    sortDirection,
    sortField,
    toggleSortField
  };
};
