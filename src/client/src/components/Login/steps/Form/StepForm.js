import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

const StepForm = ({ errorMessage, onSubmit, children, className }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
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
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default StepForm;
