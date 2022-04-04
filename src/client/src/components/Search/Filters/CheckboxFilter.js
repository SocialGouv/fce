import PropTypes from "prop-types";
import React from "react";

const CheckboxFilter = ({ filters, addFilter, removeFilter, id, label }) => {
  return (
    <div className="field filter__siege">
      <input
        className="is-checkradio is-light"
        type="checkbox"
        name={id}
        id={id}
        onChange={() => {
          filters[id] ? removeFilter(id) : addFilter(id, "true");
        }}
        checked={!!filters[id]}
      />
      <label className="label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

CheckboxFilter.propTypes = {
  addFilter: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  removeFilter: PropTypes.func.isRequired,
};

export default CheckboxFilter;
