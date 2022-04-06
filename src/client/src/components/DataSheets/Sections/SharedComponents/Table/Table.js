import "./table.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Table = ({ isBordered, children, className = "" }) => {
  return (
    <div className="table-overflow-container">
      <table
        className={classNames(`table is-hoverable ${className}`, {
          "is-bordered": isBordered,
        })}
      >
        {children}
      </table>
    </div>
  );
};

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isBordered: PropTypes.bool,
};

export default Table;
