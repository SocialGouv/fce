import PropTypes from "prop-types";
import React from "react";

import Config from "../../../services/Config";

const actif = Config.get("establishmentState").actif;
const ferme = Config.get("establishmentState").ferme;

const StateFilter = ({ filters, addFilter, id }) => {
  const onCheckboxCheck = (value) => () => {
    if (filters[id]?.includes(value)) {
      addFilter(
        id,
        filters[id]?.filter((filterValue) => filterValue !== value) || []
      );
      return;
    }
    addFilter(id, [...(filters[id] || []), value]);
  };
  return (
    <div className="filter-state">
      <div className="label">État</div>
      <div className="field">
        <div className="field-input">
          <input
            className="checkradio "
            type="checkbox"
            name="open"
            id="open"
            onChange={onCheckboxCheck(actif)}
            checked={filters[id]?.includes(actif) || false}
          />
          <label htmlFor="open" className="label label--state">
            Ouverts
          </label>
        </div>
        <div className="field-input">
          <input
            className="checkradio"
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
    </div>
  );
};

StateFilter.propTypes = {
  addFilter: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default StateFilter;
