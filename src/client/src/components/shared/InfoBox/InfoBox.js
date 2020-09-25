import React from "react";
import PropTypes from "prop-types";
import Value from "../Value";

import "./infoBox.scss";

const formatPrefix = value =>
  `Données ${value.toLowerCase() === "siège social" ? "du " : "de l'"}`;

const formatPostfix = value =>
  value.toLowerCase() === "établissement" ? " secondaire" : "";

const InfoBox = ({ value }) => {
  return (
    <div className="info-box">
      <span className="info-box__pill has-text-primary">
        <span className="info-box__print">{formatPrefix(value)}</span>
        <Value value={value} empty="" />
        <span className="info-box__print">{formatPostfix(value)}</span>
      </span>
    </div>
  );
};

InfoBox.propTypes = {
  value: PropTypes.string.isRequired
};

export default InfoBox;
