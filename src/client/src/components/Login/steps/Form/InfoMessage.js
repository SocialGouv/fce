import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/pro-solid-svg-icons";

const InfoMessage = ({ children }) => (
  <div className="login__notif login__notif--info swing-in-top-fwd">
    <FontAwesomeIcon icon={faInfo} />
    <p>{children}</p>
  </div>
);

InfoMessage.propTypes = {
  children: PropTypes.element
};

export default InfoMessage;
