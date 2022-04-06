import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

const ErrorMessage = ({ children }) => (
  <div className="login__notif login__notif--error swing-in-top-fwd">
    <FontAwesomeIcon icon={faExclamation} />
    <p>{children}</p>
  </div>
);

ErrorMessage.propTypes = {
  children: PropTypes.oneOfType(PropTypes.element, PropTypes.string),
};

export default ErrorMessage;
