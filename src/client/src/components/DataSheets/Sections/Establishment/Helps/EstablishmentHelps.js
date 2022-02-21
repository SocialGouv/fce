import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedkit } from "@fortawesome/free-solid-svg-icons";

import ContratsAides from "./Subcategory/ContratsAides";
import Apprentissage from "./Subcategory/Apprentissage";

const EstablishmentHelps = ({ establishment, apprentissage }) => {
  return (
    <section id="helps" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faMedkit} />
        </span>
        <h2 className="title">Aides</h2>
      </div>
      <div className="section-datas">
        <ContratsAides establishment={establishment} />
        <Apprentissage apprentissage={apprentissage} />
      </div>
    </section>
  );
};

EstablishmentHelps.propTypes = {
  establishment: PropTypes.object.isRequired,
  apprentissage: PropTypes.object.isRequired
};

export default EstablishmentHelps;
