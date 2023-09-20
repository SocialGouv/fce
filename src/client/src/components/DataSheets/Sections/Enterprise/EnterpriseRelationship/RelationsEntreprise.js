import PropTypes from "prop-types";
import React, { useState } from "react";

import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import AccidentTravail from "./AccidentTravail";
import AccordsEntreprise from "./AccordsEntreprise";
import ConventionsCollectives from "./ConventionsCollectives";
import Egapro from "./Egapro";
import Psi from "./Psi";

const RelationsEntreprise = ({ enterprise }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <section id="relationship" className="data-sheet__bloc_section">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={"Relation travail"}
      />
      {accordionOpen && (
        <div className="section-datas">
          <Egapro enterprise={enterprise} />
          <ConventionsCollectives enterprise={enterprise} />
          <AccordsEntreprise enterprise={enterprise} />
          <Psi entreprise={enterprise} />
          <AccidentTravail entreprise={enterprise} />
        </div>
      )}
    </section>
  );
};

RelationsEntreprise.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default RelationsEntreprise;
