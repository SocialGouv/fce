import PropTypes from "prop-types";
import React from "react";

import OrganismeFormation from "./OrganismeFormation";

const Agrements = ({ enterprise }) => {
  return (
    <section id="agrements" className="data-sheet__bloc_section ">
      <div className="section-header">
        <h2 className="dark-blue-title">Agréments</h2>
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
