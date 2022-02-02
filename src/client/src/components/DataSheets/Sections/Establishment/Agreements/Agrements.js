import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from "@fortawesome/pro-solid-svg-icons";

import OrganismeFormation from "./OrganismeFormation";
import AgrementsIAE from "./AgrementsIAE";

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
  etablissement: PropTypes.object.isRequired
};

export default Agrements;
