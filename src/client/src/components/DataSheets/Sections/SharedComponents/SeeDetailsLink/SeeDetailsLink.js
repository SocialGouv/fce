import "./seeDetailsLink.scss";

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
    <div className="details-link">
      <Link
        to={link}
        className="see-details-link__link"
        scroll={(el) => scrollWithOffset(el)}
      >
        {text}
      </Link>
    </div>
  );
};

SeeDetailsLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default SeeDetailsLink;
