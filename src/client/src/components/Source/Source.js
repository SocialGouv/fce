import "./source.scss";

import PropTypes from "prop-types";
import React from "react";

const Source = ({ name, updated, isTableCell = false, isCustomSource }) => {
  return isTableCell ? (
    <div className="source">
      <div className="source__name">{name}</div>
      {!isCustomSource && <div className="source__updated">{updated}</div>}
    </div>
  ) : (
    <div className="source">
      <span className="source__label">Source: </span>
      <span className="source__name">{name} </span>
      {!isCustomSource && <span className="source__updated">{updated}</span>}
    </div>
  );
};

Source.propTypes = {
  isCustomSource: PropTypes.bool.isRequired,
  isTableCell: PropTypes.bool,
  name: PropTypes.string,
  updated: PropTypes.string,
};

export default Source;
