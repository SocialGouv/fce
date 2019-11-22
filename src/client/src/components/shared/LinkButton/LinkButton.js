import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./linkButton.scss";

const LinkButtonChildren = ({ value, icon }) => (
  <>
    {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
    <span>{value}</span>
  </>
);

const NativeLink = ({ to, children, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

const LinkButton = ({
  link,
  isTargetBlank,
  isInfo,
  value,
  icon,
  className
}) => {
  const LinkComponent = link.startsWith("http") ? NativeLink : Link;

  return (
    <LinkComponent
      to={link}
      target={isTargetBlank ? "_blank" : ""}
      className={
        className
          ? className
          : `link-button ${isInfo ? "info-color" : "link-color"}`
      }
    >
      <LinkButtonChildren value={value} icon={icon} />
    </LinkComponent>
  );
};

LinkButton.propTypes = {
  icon: PropTypes.object,
  isTargetBlank: PropTypes.bool,
  isInfo: PropTypes.bool,
  link: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string
};

LinkButtonChildren.propTypes = {
  icon: PropTypes.object,
  value: PropTypes.string.isRequired
};

NativeLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default LinkButton;
