import PropTypes from "prop-types";
import React from "react";

import Apprentissage from "./Subcategory/Apprentissage";
import PlanDeRelance from "./Subcategory/PlanDeRelance";

const Helps = ({ enterprise }) => {
  return (
    <section id="helps" className="data-sheet__bloc_section">
      <div className="section-header">
        <h2 className="dark-blue-title">Aides</h2>
      </div>

      <div className="section-datas">
        <Apprentissage entreprise={enterprise} />
        <PlanDeRelance entreprise={enterprise} />
      </div>
    </section>
  );
};

Helps.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default Helps;
