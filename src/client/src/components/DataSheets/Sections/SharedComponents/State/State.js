import { faCircle, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import Config from "../../../../../services/Config";

const State = ({ state }) => {
  const isActive = state === Config.get("establishmentState").actif;
  return (
    <FontAwesomeIcon
      className={isActive ? "icon--success" : "icon--danger"}
      icon={isActive ? faCircle : faSquare}
    />
  );
};

State.propTypes = {
  state: PropTypes.string.isRequired,
};

export default State;
