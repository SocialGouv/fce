import PropTypes from "prop-types";
import React, { useState } from "react";

import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import ActivitePartielle from "./ActivitePartielle";
import Lice from "./Lice";
import Pse from "./Pse";
import Rcc from "./Rcc";

const EnterpriseMuteco = ({ enterprise }) => {
  const [accordionOpen, setAccordionOpen] = useState(true);

  return (
    <section id="muteco" className="data-sheet__bloc_section">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={"Mutations Economiques"}
      />

      {accordionOpen && (
        <div className="section-datas">
          <ActivitePartielle enterprise={enterprise} />
          <Pse entreprise={enterprise} />
          <Lice entreprise={enterprise} />
          <Rcc entreprise={enterprise} />
        </div>
      )}
    </section>
  );
};

EnterpriseMuteco.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default EnterpriseMuteco;
