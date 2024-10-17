import Proptypes from "prop-types";
import React from "react";

import DownArrow from "../../../../shared/Icons/DownArrow.jsx";
import TopArrow from "../../../../shared/Icons/TopArrow.jsx";

const SortableButton = ({ columnKey, sortConfig, requestSort, label }) => {
  return (
    <button
      type="button"
      className="sortable-btn"
      onClick={() => requestSort(columnKey)}
    >
      {label}
      <>
        <TopArrow
          color={
            sortConfig?.key === columnKey &&
            sortConfig?.direction === "ascending"
              ? "#000091"
              : "#808080"
          }
        />

        <DownArrow
          color={
            sortConfig?.key === columnKey &&
            sortConfig?.direction === "descending"
              ? "#000091"
              : "#808080"
          }
        />
      </>
    </button>
  );
};

SortableButton.propTypes = {
  columnKey: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  requestSort: Proptypes.func.isRequired,
  sortConfig: Proptypes.shape({
    direction: Proptypes.string,
    key: Proptypes.string,
  }),
};

export default SortableButton;
