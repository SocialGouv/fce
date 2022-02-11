import { faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import OrganismeFormation from "./OrganismeFormation";

const Agrements = ({ enterprise }) => {
  return (
    <section id="agrements" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faFileSignature} />
        </span>
        <h2 className="title">Agréments</h2>
      </div>
      <div className="section-datas">
        <OrganismeFormation entreprise={enterprise} />
      </div>
    </section>
  );
};

Agrements.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default Agrements;
