import "./NonBorderedTable.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const NonBorderedTable = ({ children, className = "" }) => {
  return (
    <div className="non-bordered-table-overflow-container ">
      <table className={classNames(`table is-fullwidth ${className}`)}>
        {children}
      </table>
    </div>
  );
};

NonBorderedTable.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default NonBorderedTable;
