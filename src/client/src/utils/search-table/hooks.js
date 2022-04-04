import { omit } from "lodash";
import { useState } from "react";

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
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortField, setSortField] = useState(null);

  const toggleSortField = (field) => {
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
    toggleSortField,
  };
};
