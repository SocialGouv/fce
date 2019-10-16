import React from "react";
import PropTypes from "prop-types";

const SiegeFacet = ({ values, onRemove, onChange }) => {
  const isSelected = values.includes("true");
  return (
    <div className="field facet__siege">
      <input
        className="is-checkradio is-light"
        type="checkbox"
        name="siegeSocial"
        id="siegeSocial"
        onChange={() => {
          isSelected ? onRemove("true") : onChange("true");
        }}
        checked={isSelected}
      />
      <label htmlFor="siegeSocial" className="check-radio-label">
        Siège social
      </label>
    </div>
  );
};

SiegeFacet.propTypes = {
  values: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SiegeFacet;
