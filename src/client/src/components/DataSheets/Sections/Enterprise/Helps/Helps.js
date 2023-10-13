import PropTypes from "prop-types";
import React, { useState } from "react";

import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import Apprentissage from "./Subcategory/Apprentissage";
import PlanDeRelance from "./Subcategory/PlanDeRelance";

const Helps = ({ enterprise }) => {
  const [accordionOpen, setAccordionOpen] = useState(true);

  return (
    <section id="helps" className="data-sheet__bloc_section">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={"Aides"}
      />

      {accordionOpen && (
        <div className="section-datas">
          <Apprentissage entreprise={enterprise} />
          <PlanDeRelance entreprise={enterprise} />
        </div>
      )}
    </section>
  );
};

Helps.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default Helps;
