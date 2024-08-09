import PropTypes from "prop-types";
import React, { useState } from "react";

import { useRenderIfSiren } from "../../../../../helpers/hoc/renderIfSiren.js";
import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import { useInteractionsBySiren } from "./Interactions.gql";
import InteractionType from "./InteractionType";

const Direccte = ({ entreprise }) => {
  const { siren } = entreprise;
  const { loading, data, error } = useInteractionsBySiren(siren);
  const [direccteAccordionOpen, setDireccteAccordionOpen] = useState(true);
  const shouldNotRender = useRenderIfSiren({ entreprise, siren });

  if (loading || error || shouldNotRender) {
    return null;
  }

  return (
    <section
      id="direccte"
      className="data-sheet__bloc_section direccte-interactions-enterprise"
    >
      <BlocTitle
        isOpen={direccteAccordionOpen}
        toggleAccordion={() => setDireccteAccordionOpen(!direccteAccordionOpen)}
        text={"Visites et contrôles"}
      />

      {direccteAccordionOpen && (
        <div className="section-datas">
          <InteractionType type="control" interactions={data} />
          <InteractionType type="visit" interactions={data} />
        </div>
      )}
    </section>
  );
};

Direccte.propTypes = {
  entreprise: PropTypes.object.isRequired,
};

export default Direccte;
