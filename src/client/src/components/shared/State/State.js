import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import Config from "../../../services/Config";

const State = ({ state }) => (
  <FontAwesomeIcon
    className={
      state === Config.get("establishmentState").actif
        ? "icon--success"
        : "icon--danger"
    }
    icon={faCircle}
  />
);

State.propTypes = {
  state: PropTypes.string.isRequired
};

export default State;
