import { faMedkit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import Apprentissage from "./Subcategory/Apprentissage";
import ContratsAides from "./Subcategory/ContratsAides";

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
  apprentissage: PropTypes.object.isRequired,
  establishment: PropTypes.object.isRequired,
};

export default EstablishmentHelps;
