import "./seeDetailsLink.scss";

import PropTypes from "prop-types";
import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import BuildingIcon from "../../../../shared/Icons/BuildingIcon.jsx";

const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -60;
  window.scrollTo({ behavior: "smooth", top: yCoordinate + yOffset });
};

const SeeDetailsLink = ({
  link,
  text = "Voir la fiche établissement",
  description,
  className,
}) => {
  return (
    <div className="details-link">
      <Link
        to={link}
        className={`see-details-link__link ${className}`}
        scroll={(el) => scrollWithOffset(el)}
      >
        {text}
      </Link>
      {description && (
        <div className="details-link-text">
          <span className="data-sheet-header-address-icon">
            <BuildingIcon color="black" />
          </span>{" "}
          {description}
        </div>
      )}
    </div>
  );
};

SeeDetailsLink.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default SeeDetailsLink;
