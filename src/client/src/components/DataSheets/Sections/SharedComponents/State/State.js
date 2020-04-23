import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSquare } from "@fortawesome/pro-solid-svg-icons";
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
  state: PropTypes.string.isRequired
};

export default State;
