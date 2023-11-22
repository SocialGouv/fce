import Proptypes from "prop-types";
import React from "react";

const RightArrow = ({ size = 17, color = "#000091" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 17 17"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.28145 8.00243L5.98145 4.70243L6.92411 3.75977L11.1668 8.00243L6.92411 12.2451L5.98145 11.3024L9.28145 8.00243Z"
      fill={color}
    />
  </svg>
);

RightArrow.propTypes = {
  color: Proptypes.string,
  size: Proptypes.number,
};

export default RightArrow;
