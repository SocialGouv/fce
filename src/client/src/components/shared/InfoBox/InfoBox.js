import React from "react";
import PropTypes from "prop-types";
import Value from "../Value";

import "./infoBox.scss";

const formatPrefix = value =>
  `Données ${value.toLowerCase() === "siège social" ? "du " : "de l'"}`;

const formatPostfix = value =>
  value.toLowerCase() === "établissement" ? " secondaire" : "";

const getClasses = (type) => type === "warning" ? ["info-box__pill--warning"] : ["has-text-primary"];

const InfoBox = ({ value, type, children }) => (
  <div className="info-box">
    <span className={["info-box__pill", ...getClasses(type)].join(" ")}>
      {children || <>
        <span className="info-box__print">{formatPrefix(value)}</span>
        <Value value={value} empty="" />
        <span className="info-box__print">{formatPostfix(value)}</span>
      </>
      }
    </span>
  </div>
);

InfoBox.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default InfoBox;
