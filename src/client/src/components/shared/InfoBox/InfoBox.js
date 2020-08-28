import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Value from "../Value";

import "./infoBox.scss";

const InfoBox = ({ value, infoBoxClasses }) => {
  return (
    <span
      className={classNames([
        "infoBox",
        "has-text-primary",
        "px-3",
        "py-2",
        ...infoBoxClasses
      ])}
    >
      <Value value={value} empty="" />
    </span>
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
