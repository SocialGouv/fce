import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      className="data-sheet__section direccte-interactions-enterprise"
    >
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faCalendarCheck} />
        </span>
        <h2 className="title">Visites et contrôles</h2>
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
