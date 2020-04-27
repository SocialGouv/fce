import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedkit } from "@fortawesome/pro-solid-svg-icons";

import Agrements from "./Subcategory/Agrements";
import ContratsAides from "./Subcategory/ContratsAides";
import Apprentissage from "./Subcategory/Apprentissage";

const EstablishmentHelps = ({ establishment }) => {
  return (
    <section id="helps" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faMedkit} />
        </span>
        <h2 className="title">Aides et agréments</h2>
      </div>
      <div className="section-datas">
        <Agrements establishment={establishment} />
        <ContratsAides establishment={establishment} />
        <Apprentissage apprentissage={establishment.apprentissage} />
      </div>
    </section>
  );
};

EstablishmentHelps.propTypes = {
  establishment: PropTypes.object.isRequired
};

export default EstablishmentHelps;
