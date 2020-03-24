import React from "react";
import PropTypes from "prop-types";

import "./source.scss";

const Source = ({ name, updated, isTableCell = false }) => {
  return isTableCell ? (
    <div className="source">
      <div className="source__name">{name}</div>
      <div className="source__updated">{updated}</div>
    </div>
  ) : (
    <div className="source">
      <span className="source__label">Source: </span>
      <span className="source__name">{name} </span>
      <span className="source__updated">{updated}</span>
    </div>
  );
};

Source.propTypes = {
  name: PropTypes.string,
  updated: PropTypes.string,
  isTableCell: PropTypes.bool
};

export default Source;
