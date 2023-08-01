import PropTypes from "prop-types";
import React from "react";

import AgrementsIAE from "./AgrementsIAE";
import OrganismeFormation from "./OrganismeFormation";

const Agrements = ({ siret }) => {
  return (
    <section id="agrements" className="data-sheet__bloc_section ">
      <div className="section-header">
        <h2 className="dark-blue-title">Agréments</h2>
      </div>
      <div className="section-datas">
        <AgrementsIAE siret={siret} />
        <OrganismeFormation siret={siret} />
      </div>
    </section>
  );
};

Agrements.propTypes = {
  siret: PropTypes.object.isRequired,
};

export default Agrements;
