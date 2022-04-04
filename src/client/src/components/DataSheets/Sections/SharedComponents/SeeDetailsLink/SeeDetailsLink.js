import "./seeDetailsLink.scss";

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { HashLink as Link } from "react-router-hash-link";

const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -60;
  window.scrollTo({ behavior: "smooth", top: yCoordinate + yOffset });
};

const SeeDetailsLink = ({ link, text = "Voir la fiche établissement" }) => {
  return (
    <div className="see-details-link">
      <Link
        to={link}
        className="see-details-link__link"
        scroll={(el) => scrollWithOffset(el)}
      >
        <FontAwesomeIcon icon={faEye} className="see-details-link__icon" />
        <span>{text}</span>
      </Link>
    </div>
  );
};

SeeDetailsLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default SeeDetailsLink;
