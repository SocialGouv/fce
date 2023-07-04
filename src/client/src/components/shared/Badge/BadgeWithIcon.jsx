import "./Badge.scss";

import PropTypes from "prop-types";
import React from "react";

import ClosedIcon from "../Icons/ClosedIcon.jsx";
import OpenedIcon from "../Icons/OpenedIcon.jsx";

const BadgeWithIcon = ({ text, state }) => {
  return (
    <div className={`badge badge__${state}`}>
      <span className="badge__span">
        {text === "ouvert" ? <OpenedIcon /> : <ClosedIcon />}
      </span>
      <span className="badge-text">{text}</span>
    </div>
  );
};
BadgeWithIcon.propTypes = {
  text: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};
export default BadgeWithIcon;
