import PropTypes from "prop-types";
import React from "react";

import { renderIfSiren } from "../../../../../helpers/hoc/renderIfSiren";
import { useInteractionsBySiren } from "./Interactions.gql";
import InteractionType from "./InteractionType";

const Direccte = ({ entreprise: { siren } }) => {
  const { loading, data, error } = useInteractionsBySiren(siren);
  if (loading || error) {
    return null;
  }

  return (
    <section
      id="direccte"
      className="data-sheet__bloc_section direccte-interactions-enterprise"
    >
      <div className="section-header">
        <h2 className="dark-blue-title">Visites et contrôles</h2>
      </div>
      <div className="section-datas">
        <InteractionType type="control" interactions={data} />
        <InteractionType type="visit" interactions={data} />
      </div>
    </section>
  );
};

Direccte.propTypes = {
  entreprise: PropTypes.object.isRequired,
};

export default renderIfSiren(Direccte);
