import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./table.scss";

const Table = ({ isBordered, children, className = "" }) => {
  return (
    <div className="table-overflow-container">
      <table
        className={classNames(`table is-hoverable ${className}`, {
          "is-bordered": isBordered
        })}
      >
        {children}
      </table>
    </div>
  );
};

Table.propTypes = {
  isBordered: PropTypes.bool,
  children: PropTypes.node
};

export default Table;
