import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SuccessMessage = ({ message }) => (
  <div className="login__notif login__notif--success swing-in-top-fwd">
    <FontAwesomeIcon icon={faCheck} />
    <p>{message}</p>
  </div>
);

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired
};

export default SuccessMessage;
