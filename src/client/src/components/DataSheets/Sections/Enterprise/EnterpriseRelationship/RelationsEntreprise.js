import PropTypes from "prop-types";
import React from "react";

import AccidentTravail from "./AccidentTravail";
import AccordsEntreprise from "./AccordsEntreprise";
import ConventionsCollectives from "./ConventionsCollectives";
import Egapro from "./Egapro";
import Psi from "./Psi";

const RelationsEntreprise = ({ enterprise }) => (
  <section id="relationship" className="data-sheet__bloc_section">
    <div className="section-header">
      <h2 className="dark-blue-title">Relation travail</h2>
    </div>
    <div className="section-datas">
      <Egapro enterprise={enterprise} />
      <ConventionsCollectives enterprise={enterprise} />
      <AccordsEntreprise enterprise={enterprise} />
      <Psi entreprise={enterprise} />
      <AccidentTravail entreprise={enterprise} />
    </div>
  </section>
);

RelationsEntreprise.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default RelationsEntreprise;
