import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import "./linkButton.scss";

const LinkButton = ({ link, isTargetBlank, isInfo, value, icon }) => {
  return (
    <Link
      to={link}
      target={isTargetBlank ? "_blank" : ""}
      className={`link-button ${isInfo ? "info-color" : "link-color"}`}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      <span>{value}</span>
    </Link>
  );
};

LinkButton.propTypes = {
  icon: PropTypes.object,
  isTargetBlank: PropTypes.bool,
  isInfo: PropTypes.bool,
  link: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default LinkButton;
