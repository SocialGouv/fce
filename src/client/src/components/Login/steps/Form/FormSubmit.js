import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Button from "../../../shared/Button";

const FormSubmit = ({ loading, isDisabled, label }) => (
  <Button
    type="submit"
    value={label}
    buttonClasses={classNames("login__button", {
      "is-loading": loading,
      "is-tertiary": !isDisabled,
    })}
    isDisabled={isDisabled}
  />
);

FormSubmit.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default FormSubmit;
