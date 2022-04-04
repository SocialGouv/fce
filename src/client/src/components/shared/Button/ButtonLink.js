import "./button-link.scss";

import PropTypes from "prop-types";
import React from "react";

const ButtonLink = ({ children, onClick }) => (
  <button className="button-link" onClick={onClick}>
    {children}
  </button>
);

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonLink;
