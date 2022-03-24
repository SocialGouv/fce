import React from "react";
import PropTypes from "prop-types";

const FormInput = ({ name, label, type, input, required }) => (
  <div>
    <label htmlFor={name} className="label">
      {label}
    </label>
    <div className="field has-addons">
      {input ? (
        input({ name, label })
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className="input"
          required={required}
        />
      )}
    </div>
  </div>
);

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  input: PropTypes.func,
  required: PropTypes.bool
};

export default FormInput;
