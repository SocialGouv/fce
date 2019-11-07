import React from "react";
import PropTypes from "prop-types";

const StateFilter = ({ filters, addFilter, removeFilter }) => {
  return (
    <div className="filter-state">
      <div className="label">État</div>
      <div className="field">
        <input
          className="is-checkradio is-light"
          type="checkbox"
          name="open"
          id="open"
          onChange={() => {
            filters.state.includes("A")
              ? removeFilter("state", "A")
              : addFilter("state", "A");
          }}
          checked={filters.state.includes("A")}
        />
        <label htmlFor="open" className="label label--state">
          Ouverts
        </label>

        <input
          className="is-checkradio is-light"
          type="checkbox"
          name="closed"
          id="closed"
          onChange={() => {
            filters.state.includes("F")
              ? removeFilter("state", "F")
              : addFilter("state", "F");
          }}
          checked={filters.state.includes("F")}
        />
        <label htmlFor="closed" className="label label--state">
          Fermés
        </label>
      </div>
    </div>
  );
};

StateFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired
};

export default StateFilter;
