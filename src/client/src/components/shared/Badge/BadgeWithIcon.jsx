import "./Badge.scss";

import PropTypes from "prop-types";
import React from "react";

import ClosedIcon from "../Icons/ClosedIcon.jsx";
import OpenedIcon from "../Icons/OpenedIcon.jsx";

const BadgeWithIcon = ({ text, state, isTableBadge = false }) => {
  return (
    <span className={text ? `badge badge__${state}` : ""}>
      <span className={text ? "badge__span" : ""}>
        {state === "icon--success" ? <OpenedIcon /> : <ClosedIcon />}
      </span>
      {text && (
        <span className={`${isTableBadge && "badge__small-text"} badge-text`}>
          {text}
        </span>
      )}
    </span>
  );
};
BadgeWithIcon.propTypes = {
  isTableBadge: PropTypes.bool,
  state: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default BadgeWithIcon;
