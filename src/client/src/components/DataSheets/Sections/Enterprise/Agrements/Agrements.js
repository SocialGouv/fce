import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from "@fortawesome/pro-solid-svg-icons";
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
        <OrganismeFormation siren={enterprise.siren} />
      </div>
    </section>
  );
};

Agrements.propTypes = {
  enterprise: PropTypes.object.isRequired
};

export default Agrements;
