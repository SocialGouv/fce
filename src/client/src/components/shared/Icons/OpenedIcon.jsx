import Proptypes from "prop-types";
import React from "react";

const OpenedIcon = ({ size = 16, color = "#18753C" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99967 14.6667C4.31767 14.6667 1.33301 11.682 1.33301 8C1.33301 4.318 4.31767 1.33334 7.99967 1.33334C11.6817 1.33334 14.6663 4.318 14.6663 8C14.6663 11.682 11.6817 14.6667 7.99967 14.6667ZM7.33501 10.6667L12.0483 5.95267L11.1057 5.01L7.33501 8.78134L5.44901 6.89534L4.50634 7.838L7.33501 10.6667Z"
      fill={color}
    />
  </svg>
);

OpenedIcon.propTypes = {
  color: Proptypes.string,
  size: Proptypes.number,
};

export default OpenedIcon;
