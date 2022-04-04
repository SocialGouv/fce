import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

const FormError = ({ errorMessage }) => (
  <div className="login__notif login__notif--error shake-horizontal">
    <FontAwesomeIcon icon={faExclamationTriangle} />
    <p>{errorMessage}</p>
  </div>
);

FormError.propTypes = {
  errorMessage: PropTypes.string,
};

export default FormError;
