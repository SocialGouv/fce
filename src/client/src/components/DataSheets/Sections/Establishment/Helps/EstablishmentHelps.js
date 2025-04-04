import PropTypes from "prop-types";
import React, { useState } from "react";

import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import AidesFinancieres from "./Subcategory/AidesFinancieres.jsx";
import Apprentissage from "./Subcategory/Apprentissage";
import ContratsAides from "./Subcategory/ContratsAides";

const EstablishmentHelps = ({ siret }) => {
  const [accordionOpen, setAccordionOpen] = useState(true);

  return (
    <section id="helps" className="data-sheet__bloc_section ">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={"Aides"}
      />
      {accordionOpen && (
        <div className="section-datas">
          <ContratsAides siret={siret} />
          <Apprentissage siret={siret} />
          <AidesFinancieres siret={siret} />
        </div>
      )}
    </section>
  );
};

EstablishmentHelps.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default EstablishmentHelps;
