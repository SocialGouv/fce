import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import {
  getEnterpriseControls,
  getEnterpriseVisits,
} from "../../../../../helpers/Interactions";
import InteractionType from "./InteractionType";

const Direccte = ({ enterprise }) => {
  const controlInteractions = getEnterpriseControls(enterprise);
  const visitInteractions = getEnterpriseVisits(enterprise);

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
        <InteractionType type="control" interactions={controlInteractions} />
        <InteractionType type="visit" interactions={visitInteractions} />
      </div>
    </section>
  );
};

Direccte.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default Direccte;
