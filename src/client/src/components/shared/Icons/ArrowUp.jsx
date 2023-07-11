import Proptypes from "prop-types";
import React from "react";

const ArrowUp = ({ size = 24, color = "#000091" }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="arrow-s-line">
      <path
        id="Ic&#195;&#180;ne"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.0002 10.8286L7.05023 15.7786L5.63623 14.3646L12.0002 8.00061L18.3642 14.3646L16.9502 15.7786L12.0002 10.8286Z"
        fill={color}
      />
    </g>
  </svg>
);

ArrowUp.propTypes = {
  color: Proptypes.string,
  size: Proptypes.number,
};

export default ArrowUp;
