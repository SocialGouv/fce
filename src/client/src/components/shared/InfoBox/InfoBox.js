import React from "react";
import ClassNames from "classnames";
import PropTypes from "prop-types";
import Value from "../Value";

const InfoBox = ({ value, infoBoxClasses }) => {
  return (
    <span className={`infoBox has-text-primary ${ClassNames(infoBoxClasses)}`}>
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
