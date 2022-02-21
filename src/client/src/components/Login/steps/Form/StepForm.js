import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export const StepForm = ({ errorMessage, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
      {errorMessage && (
        <div className="login__notif login__notif--error shake-horizontal">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <p>{errorMessage}</p>
        </div>
      )}
      {children}
    </form>
  );
};

StepForm.propTypes = {
  children: PropTypes.node,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

export default StepForm;
