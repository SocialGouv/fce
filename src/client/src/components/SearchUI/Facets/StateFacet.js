import React from "react";
import PropTypes from "prop-types";

const StateFacet = ({ values, onRemove, onChange }) => {
  const handleStateFilter = value => {
    const invertedValue = value === "A" ? "F" : "A";
    if (
      (values && values.includes(invertedValue)) ||
      (values && values.includes(value))
    ) {
      onRemove();
    } else {
      onChange(invertedValue);
    }
  };

  return (
    <div className="facet-state">
      <div className="facet-state__label">État</div>
      <div className="field">
        <input
          className="is-checkradio is-light"
          type="checkbox"
          name="open"
          id="open"
          onChange={() => handleStateFilter("A")}
          checked={values.length === 0 || (values && values.includes("A"))}
        />
        <label htmlFor="open" className="check-radio-label">
          Ouvert
        </label>

        <input
          className="is-checkradio is-light"
          type="checkbox"
          name="closed"
          id="closed"
          onChange={() => handleStateFilter("F")}
          checked={values.length === 0 || (values && values.includes("F"))}
        />
        <label htmlFor="closed" className="check-radio-label">
          Fermé
        </label>
      </div>
    </div>
  );
};

StateFacet.propTypes = {
  values: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default StateFacet;
