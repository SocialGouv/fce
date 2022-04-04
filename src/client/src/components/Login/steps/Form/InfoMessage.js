import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

const InfoMessage = ({ children }) => (
  <div className="login__notif login__notif--info swing-in-top-fwd">
    <FontAwesomeIcon icon={faInfo} />
    <p>{children}</p>
  </div>
);

InfoMessage.propTypes = {
  children: PropTypes.oneOfType(PropTypes.element, PropTypes.string),
};

export default InfoMessage;
