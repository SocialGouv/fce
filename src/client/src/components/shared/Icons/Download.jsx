import Proptypes from "prop-types";
import React from "react";

const Download = ({ width = 24, height = 24, color = "#000091" }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="download">
      <path
        id="Ic&#195;&#180;ne"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 19H21V21H3V19ZM13 13.172L19.071 7.1L20.485 8.514L12 17L3.515 8.515L4.929 7.1L11 13.17V2H13V13.172Z"
        fill={color}
      />
    </g>
  </svg>
);

Download.propTypes = {
  color: Proptypes.string,
  height: Proptypes.number,
  width: Proptypes.number,
};

export default Download;
