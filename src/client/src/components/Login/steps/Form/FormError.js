import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PropTypes from "prop-types";

const FormError = ({ errorMessage }) => (
  <div className="login__notif login__notif--error shake-horizontal">
    <FontAwesomeIcon icon={faExclamationTriangle} />
    <p>{errorMessage}</p>
  </div>
);

FormError.propTypes = {
  errorMessage: PropTypes.string
};

export default FormError;
