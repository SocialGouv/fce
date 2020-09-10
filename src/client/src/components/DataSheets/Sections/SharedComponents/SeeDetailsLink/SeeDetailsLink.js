import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/pro-solid-svg-icons";

import "./seeDetailsLink.scss";

const SeeDetailsLink = ({ link, text = "Voir la fiche établissement" }) => {
  return (
    <Link to={link} className="see-details-link">
      <FontAwesomeIcon icon={faEye} className="see-details-link__icon" />
      <span>{text}</span>
    </Link>
  );
};

SeeDetailsLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string
};

export default SeeDetailsLink;
