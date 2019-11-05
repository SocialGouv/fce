import React from "react";
import PropTypes from "prop-types";

const SiegeFilter = ({ filters, addFilters, removeFilters }) => {
  return (
    <div className="field filter__siege">
      <input
        className="is-checkradio is-light"
        type="checkbox"
        name="siegeSocial"
        id="siegeSocial"
        onChange={() => {
          filters.siege ? removeFilters("siege") : addFilters("siege", "true");
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
  addFilters: PropTypes.func.isRequired,
  removeFilters: PropTypes.func.isRequired
};

export default SiegeFilter;
