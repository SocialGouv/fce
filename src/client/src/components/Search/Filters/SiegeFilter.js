import React from "react";
import PropTypes from "prop-types";

const SiegeFilter = ({ filters, addFilter, removeFilter }) => {
  return (
    <div className="field filter__siege">
      <input
        className="is-checkradio is-light"
        type="checkbox"
        name="siegeSocial"
        id="siegeSocial"
        onChange={() => {
          filters.siege ? removeFilter("siege") : addFilter("siege", "true");
        }}
        checked={!!filters.siege}
      />
      <label className="label" htmlFor="siegeSocial">
        Siège social
      </label>
    </div>
  );
};

SiegeFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired
};

export default SiegeFilter;
