import PropTypes from "prop-types";
import React from "react";

const FormInput = ({ name, label, type, input, required }) => (
  <div>
    <label htmlFor={name} className="label">
      {label}
    </label>
    <div className="field has-addons">
      {input ? (
        input({ label, name })
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
  input: PropTypes.func,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
};

export default FormInput;
