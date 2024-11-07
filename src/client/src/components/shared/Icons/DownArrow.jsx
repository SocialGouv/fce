import Proptypes from "prop-types";
import React from "react";

const DownArrow = ({ size = 16, color = "#000091" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M7.333 8V2.66667H8.667V8H13.334L8.00067 13.3333L2.667 8H7.333Z"
      fill={color}
    />
  </svg>
);

DownArrow.propTypes = {
  color: Proptypes.string,
  size: Proptypes.number,
};

export default DownArrow;
