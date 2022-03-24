import classNames from "classnames";
import Button from "../../../shared/Button";
import React from "react";
import PropTypes from "prop-types";

const FormSubmit = ({ loading, isDisabled, label }) => (
  <Button
    type="submit"
    value={label}
    buttonClasses={classNames("login__button", {
      "is-loading": loading,
      "is-tertiary": !isDisabled
    })}
    isDisabled={isDisabled}
  />
);

FormSubmit.propTypes = {
  loading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  label: PropTypes.string.isRequired
};

export default FormSubmit;
