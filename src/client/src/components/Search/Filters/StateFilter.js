import React from "react";
import PropTypes from "prop-types";
import Config from "../../../services/Config";

const actif = Config.get("establishmentState").actif;
const ferme = Config.get("establishmentState").ferme;

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
            filters.state.includes(actif)
              ? removeFilter("state", actif)
              : addFilter("state", actif);
          }}
          checked={filters.state.includes(actif)}
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
            filters.state.includes(ferme)
              ? removeFilter("state", ferme)
              : addFilter("state", ferme);
          }}
          checked={filters.state.includes(ferme)}
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
