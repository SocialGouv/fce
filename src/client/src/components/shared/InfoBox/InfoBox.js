import "./infoBox.scss";

import PropTypes from "prop-types";
import React from "react";

import Value from "../Value";

const formatPrefix = (value) =>
  `Données ${(value || "").toLowerCase() === "siège social" ? "du " : "de l'"}`;

const formatPostfix = (value) =>
  (value || "").toLowerCase() === "établissement" ? " secondaire" : "";

const InfoBox = ({ value }) => {
  return (
    <div className="info-box">
      <span className="info-box__pill ">
        <span className="info-box__print">{formatPrefix(value)}</span>
        <Value value={value} empty="" />
        <span className="info-box__print">{formatPostfix(value)}</span>
      </span>
    </div>
  );
};

InfoBox.propTypes = {
  value: PropTypes.string.isRequired,
};

export default InfoBox;
