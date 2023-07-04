import Proptypes from "prop-types";
import React from "react";

const BuildingIcon = ({ width = 24, height = 24, color = "#000091" }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="building">
      <path
        id="Ic&#195;&#180;ne"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 3C14.5523 3 15 3.44772 15 4V19H19V11H17V9H20C20.5523 9 21 9.44772 21 10V19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H14ZM13 5H5V19H13V5ZM11 11V13H7V11H11ZM11 7V9H7V7H11Z"
        fill={color}
      />
    </g>
  </svg>
);

BuildingIcon.propTypes = {
  color: Proptypes.string,
  height: Proptypes.number,
  width: Proptypes.number,
};

export default BuildingIcon;
