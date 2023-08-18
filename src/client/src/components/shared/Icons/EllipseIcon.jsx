import Proptypes from "prop-types";
import React from "react";

const EllipseIcon = ({ width = 8, height = 8, color = "#000091" }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4" cy="4.00085" r="4" fill={color} />
  </svg>
);

EllipseIcon.propTypes = {
  color: Proptypes.string,
  height: Proptypes.number,
  width: Proptypes.number,
};

export default EllipseIcon;
