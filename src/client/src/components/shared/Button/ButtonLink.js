import "./button-link.scss";

import PropTypes from "prop-types";
import React from "react";

const ButtonLink = ({ children, onClick }) => (
  <div className="all_effectifs_etp_button is-link-text">
    <button className="button-link" onClick={onClick}>
      {children}
    </button>
  </div>
);

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonLink;
