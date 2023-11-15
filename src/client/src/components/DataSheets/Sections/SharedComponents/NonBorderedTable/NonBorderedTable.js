import "./NonBorderedTable.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const NonBorderedTable = ({
  children,
  className = "",
  isScrollable = false,
}) => {
  return (
    <div
      className={classNames(
        "non-bordered-table-overflow-container hoverable ",

        className
      )}
    >
      <div
        className={classNames({
          "is-scrollable": isScrollable,
        })}
      >
        <table className={classNames(`table is-fullwidth `)}>{children}</table>
      </div>
    </div>
  );
};

NonBorderedTable.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isScrollable: PropTypes.bool,
};

export default NonBorderedTable;
