import React from "react";
import PropTypes from "prop-types";
import { HashLink as Link } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/pro-solid-svg-icons";

import "./seeDetailsLink.scss";

const scrollWithOffset = el => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -60;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
};

const SeeDetailsLink = ({ link, text = "Voir la fiche établissement" }) => {
  return (
    <div className="see-details-link">
      <Link
        to={link}
        className="see-details-link__link"
        scroll={el => scrollWithOffset(el)}
      >
        <FontAwesomeIcon icon={faEye} className="see-details-link__icon" />
        <span>{text}</span>
      </Link>
    </div>
  );
};

SeeDetailsLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string
};

export default SeeDetailsLink;
