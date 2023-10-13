import PropTypes from "prop-types";
import React, { useState } from "react";

import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import OrganismeFormation from "./OrganismeFormation";

const Agrements = ({ enterprise }) => {
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
          <OrganismeFormation entreprise={enterprise} />
        </div>
      )}
    </section>
  );
};

Agrements.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default Agrements;
