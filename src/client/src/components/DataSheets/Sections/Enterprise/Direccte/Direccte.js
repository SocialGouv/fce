import PropTypes from "prop-types";
import React, { useState } from "react";

import { renderIfSiren } from "../../../../../helpers/hoc/renderIfSiren";
import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import { useInteractionsBySiren } from "./Interactions.gql";
import InteractionType from "./InteractionType";

const Direccte = ({ entreprise: { siren } }) => {
  const { loading, data, error } = useInteractionsBySiren(siren);
  const [direccteAccordionOpen, setDireccteAccordionOpen] = useState(false);

  if (loading || error) {
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

export default renderIfSiren(Direccte);
