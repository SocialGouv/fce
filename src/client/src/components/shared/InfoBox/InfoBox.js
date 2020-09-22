import React from "react";
import PropTypes from "prop-types";
import Value from "../Value";

import "./infoBox.scss";

const formatPrintLabel = value =>
  `Données ${value === "Siège social" ? "du " : "de l'"}`;

const InfoBox = ({ value }) => {
  return (
    <div className="info-box">
      <span className="info-box__pill has-text-primary">
        <span className="info-box__print">{formatPrintLabel(value)}</span>
        <Value value={value} empty="" />
      </span>
    </div>
  );
};

InfoBox.propTypes = {
  value: PropTypes.string.isRequired
};

export default InfoBox;
