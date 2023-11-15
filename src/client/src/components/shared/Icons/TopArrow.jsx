import Proptypes from "prop-types";
import React from "react";

const TopArrow = ({ size = 16, color = "#000091" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M8.66699 7.99999V13.3333H7.33366V7.99999H2.66699L8.00033 2.66666L13.3337 7.99999H8.66699Z"
      fill={color}
    />
  </svg>
);

TopArrow.propTypes = {
  color: Proptypes.string,
  size: Proptypes.number,
};

export default TopArrow;
