import Proptypes from "prop-types";
import React from "react";

const ArrowDown = ({ size = 24, color = "#000091" }) => (
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
        d="M12.0002 13.1725L16.9502 8.22253L18.3642 9.63653L12.0002 16.0005L5.63623 9.63653L7.05023 8.22253L12.0002 13.1725Z"
        fill={color}
      />
    </g>
  </svg>
);

ArrowDown.propTypes = {
  color: Proptypes.string,
  size: Proptypes.number,
};

export default ArrowDown;
