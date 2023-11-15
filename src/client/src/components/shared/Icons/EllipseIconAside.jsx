import Proptypes from "prop-types";
import React from "react";

const EllipseIconAside = ({ width = 8, height = 7, color = "#000091" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 8 7"
    fill="none"
  >
    <circle cx="3.50293" cy="3.5" r="3.5" fill={color} />
  </svg>
);

EllipseIconAside.propTypes = {
  color: Proptypes.string,
  height: Proptypes.number,
  width: Proptypes.number,
};

export default EllipseIconAside;
