import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Value from "../Value";

import "./infoBox.scss";

const InfoBox = ({ value, infoBoxClasses }) => {
  return (
    <div className="info-box">
      <span
        className={classNames([
          "info-box__pill",
          "has-text-primary",
          ...infoBoxClasses
        ])}
      >
        <Value value={value} empty="" />
      </span>
    </div>
  );
};

InfoBox.propTypes = {
  value: PropTypes.string.isRequired,
  infoBoxClasses: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ])
};

export default InfoBox;
