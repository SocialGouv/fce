import Proptypes from "prop-types";
import React from "react";

const ClosedIcon = ({ width = 14, height = 12, color = "#CE0500" }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="&#240;&#159;&#154;&#171; Ne pas changer - Erreur">
      <path
        id="Ic&#195;&#180;ne"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5 6L8.75 1.25H3.25L0.5 6L3.25 10.75H8.75L11.5 6ZM7.41404 3.87848L6.00004 5.29298L4.58604 3.87848L3.87854 4.58598L5.29304 5.99998L3.87854 7.41398L4.58604 8.12148L6.00004 6.70698L7.41404 8.12148L8.12154 7.41398L6.70704 5.99998L8.12154 4.58598L7.41404 3.87848Z"
        fill={color}
      />
    </g>
  </svg>
);

ClosedIcon.propTypes = {
  color: Proptypes.string,
  height: Proptypes.number,
  width: Proptypes.number,
};

export default ClosedIcon;
