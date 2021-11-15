import React from "react";
import PropTypes from "prop-types";
import Config from "../../../services/Config";
const actif = Config.get("establishmentState").actif;
const ferme = Config.get("establishmentState").ferme;

const StateFilter = ({ filters, addFilter, id }) => {
  const onCheckboxCheck = (value) => () => {
    if (filters[id]?.includes(value)) {
      addFilter(id, filters[id]?.filter((filterValue) => filterValue !== value) || []);
      return;
    }
    addFilter(id, [...(filters[id] || []), value]);
  }
  return (
    <div className="filter-state">
      <div className="label">État</div>
      <div className="field">
        <input
          className="is-checkradio is-light"
          type="checkbox"
          name="open"
          id="open"
          onChange={onCheckboxCheck(actif)}
          checked={filters[id]?.includes(actif) || false}
        />
        <label htmlFor="open" className="label label--state">
          Ouverts
        </label>

        <input
          className="is-checkradio is-light"
          type="checkbox"
          name="closed"
          id="closed"
          onChange={onCheckboxCheck(ferme)}
          checked={filters[id]?.includes(ferme) || false}
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
