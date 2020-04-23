import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/pro-solid-svg-icons";

const SeeDetailsLink = ({ link }) => {
  return (
    <Link to={link}>
      <FontAwesomeIcon icon={faEye} className="mr-2" />
      <span>Voir le détail</span>
    </Link>
  );
};

SeeDetailsLink.propTypes = {
  link: PropTypes.string.isRequired
};

export default SeeDetailsLink;
