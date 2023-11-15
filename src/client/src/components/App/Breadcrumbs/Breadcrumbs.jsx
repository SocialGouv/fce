import "./Breadcrumbs.scss";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const invalidPaths = [
    "",
    "/",
    "/search",
    "/a-propos",
    "/faq",
    "/aide",
    "/sources-des-donnees",
    "/statistics",
    "/mentions-legales",
    "/politique-de-confidentialite",
  ];

  if (invalidPaths.includes(location.pathname)) return null;
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
      {!location.pathname.includes("list-establishments") && (
        <div className="crumb">
          <span>
            {location.pathname.includes("establishment")
              ? "Fiche établissement"
              : location.pathname.includes("entreprise") && "Fiche entreprise"}
          </span>
        </div>
      )}
    </div>
  );
};

export default Breadcrumbs;
