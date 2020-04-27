import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedkit } from "@fortawesome/pro-solid-svg-icons";

import Apprentissage from "./Subcategory/Apprentissage";

const Helps = ({ enterprise }) => {
  return (
    <section id="helps" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faMedkit} />
        </span>
        <h2 className="title">Aides et agréments</h2>
      </div>
      <div className="section-datas">
        <Apprentissage
          apprentissage={enterprise.apprentissage}
          etablissements={enterprise.etablissements}
        />
      </div>
    </section>
  );
};

Helps.propTypes = {
  enterprise: PropTypes.object.isRequired
};

export default Helps;
