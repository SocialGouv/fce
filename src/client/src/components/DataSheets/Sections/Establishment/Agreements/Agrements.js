import { faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import AgrementsIAE from "./AgrementsIAE";
import OrganismeFormation from "./OrganismeFormation";

const Agrements = ({ etablissement }) => {
  return (
    <section id="agrements" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faFileSignature} />
        </span>
        <h2 className="title">Agréments</h2>
      </div>
      <div className="section-datas">
        <AgrementsIAE establishment={etablissement} />
        <OrganismeFormation siret={etablissement.siret} />
      </div>
    </section>
  );
};

Agrements.propTypes = {
  etablissement: PropTypes.object.isRequired,
};

export default Agrements;
