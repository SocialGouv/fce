import PropTypes from "prop-types";
import React from "react";

import Apprentissage from "./Subcategory/Apprentissage";
import ContratsAides from "./Subcategory/ContratsAides";

const EstablishmentHelps = ({ siret }) => {
  return (
    <section id="helps" className="data-sheet__bloc_section ">
      <div className="section-header ">
        <h2 className="dark-blue-title">Aides</h2>
      </div>
      <div className="section-datas">
        <ContratsAides siret={siret} />
        <Apprentissage siret={siret} />
      </div>
    </section>
  );
};

EstablishmentHelps.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default EstablishmentHelps;
