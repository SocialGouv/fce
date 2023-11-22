import Proptypes from "prop-types";
import React from "react";

const LeftArrow = ({ size = 17, color = "#000091" }) => (
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
      d="M7.71834 8.00243L11.0183 11.3024L10.0757 12.2451L5.83301 8.00243L10.0757 3.75977L11.0183 4.70243L7.71834 8.00243Z"
      fill={color}
    />
  </svg>
);

LeftArrow.propTypes = {
  color: Proptypes.string,
  size: Proptypes.number,
};

export default LeftArrow;
