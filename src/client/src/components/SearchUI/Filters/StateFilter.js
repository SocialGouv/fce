import React from "react";
import PropTypes from "prop-types";

const StateFilter = ({ filters, addFilters, removeFilters }) => {
  return (
    <div className="facet-state">
      <div className="facet-state__label">État</div>
      <div className="field">
        <input
          className="is-checkradio is-light"
          type="checkbox"
          name="open"
          id="open"
          onChange={() => {
            filters.state.includes("A")
              ? removeFilters("state", "A")
              : addFilters("state", "A");
          }}
          checked={filters.state.includes("A")}
        />
        <label htmlFor="open" className="check-radio-label">
          Ouvert
        </label>

        <input
          className="is-checkradio is-light"
          type="checkbox"
          name="closed"
          id="closed"
          onChange={() => {
            filters.state.includes("F")
              ? removeFilters("state", "F")
              : addFilters("state", "F");
          }}
          checked={filters.state.includes("F")}
        />
        <label htmlFor="closed" className="check-radio-label">
          Fermé
        </label>
      </div>
    </div>
  );
};

StateFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  addFilters: PropTypes.func.isRequired,
  removeFilters: PropTypes.func.isRequired
};

export default StateFilter;
