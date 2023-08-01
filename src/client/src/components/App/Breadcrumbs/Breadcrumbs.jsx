import "./Breadcrumbs.scss";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  if (
    location.pathname === "" ||
    location.pathname === "/" ||
    location.pathname === "/search"
  )
    return null;

  return (
    <div className="breadcrumbs">
      <div className="crumb">
        <Link to="/">Recherche</Link>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
      <div className="crumb">
        <span>Liste établissements</span>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
      <div className="crumb">
        <span>
          {location.pathname.includes("establishment")
            ? "Fiche établissement"
            : "Fiche entreprise"}
        </span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
