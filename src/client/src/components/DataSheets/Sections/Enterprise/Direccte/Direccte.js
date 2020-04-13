import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/pro-solid-svg-icons";
import InteractionType from "./InteractionType";
import { getEnterpriseInteractions } from "../../../../../helpers/Interactions";
import Config from "../../../../../services/Config";

const Direccte = ({ enterprise }) => {
  const controlInteractions = getEnterpriseInteractions({
    enterprise,
    type: Config.get("interactions.types.control")
  });

  const visitInteractions = getEnterpriseInteractions({
    enterprise,
    type: Config.get("interactions.types.visit")
  });

  console.log({
    controlInteractions,
    visitInteractions
  });

  return (
    <section id="direccte" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faCalendarCheck} />
        </span>
        <h2 className="title">Visites et controles</h2>
      </div>
      <div className="section-datas">
        <InteractionType type="control" interactions={controlInteractions} />
        <InteractionType type="visit" interactions={visitInteractions} />
      </div>
    </section>
  );
};

Direccte.propTypes = {
  enterprise: PropTypes.object.isRequired
};

export default Direccte;
