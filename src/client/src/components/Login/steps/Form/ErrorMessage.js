import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const ErrorMessage = ({ children }) => (
  <div className="login__notif login__notif--error swing-in-top-fwd">
    <FontAwesomeIcon icon={faExclamation} />
    <p>{children}</p>
  </div>
);

ErrorMessage.propTypes = {
  children: PropTypes.oneOfType(PropTypes.element, PropTypes.string)
};

export default ErrorMessage;
