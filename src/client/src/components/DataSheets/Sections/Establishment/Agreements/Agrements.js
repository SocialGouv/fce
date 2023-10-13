import PropTypes from "prop-types";
import React, { useState } from "react";

import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import AgrementsIAE from "./AgrementsIAE";
import OrganismeFormation from "./OrganismeFormation";

const Agrements = ({ siret }) => {
  const [accordionOpen, setAccordionOpen] = useState(true);

  return (
    <section id="agrements" className="data-sheet__bloc_section ">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={"Agréments"}
      />
      {accordionOpen && (
        <div className="section-datas">
          <AgrementsIAE siret={siret} />
          <OrganismeFormation siret={siret} />
        </div>
      )}
    </section>
  );
};

Agrements.propTypes = {
  siret: PropTypes.object.isRequired,
};

export default Agrements;
