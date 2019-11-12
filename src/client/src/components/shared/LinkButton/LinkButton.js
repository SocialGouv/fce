import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

import "./linkButton.scss";

const LinkButtonChildren = ({ value, icon }) => (
  <>
    {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
    <span>{value}</span>
  </>
);

const LinkButton = ({ link, isTargetBlank, isInfo, value, icon }) => {
  const target = isTargetBlank ? "_blank" : "";
  const classnames = `link-button ${isInfo ? "info-color" : "link-color"}`;

  return link.slice(0, 4) === "http" ? (
    <a href={link} target={target} className={classnames}>
      <LinkButtonChildren value={value} icon={icon} />
    </a>
  ) : (
    <Link to={link} target={target} className={classnames}>
      <LinkButtonChildren value={value} icon={icon} />
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

LinkButtonChildren.propTypes = {
  icon: PropTypes.object,
  value: PropTypes.string.isRequired
};

export default LinkButton;
