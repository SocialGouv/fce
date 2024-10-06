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
      {sortConfig?.key === columnKey && (
        <>
          {sortConfig?.direction === "ascending" ? (
            <TopArrow color="#808080" />
          ) : (
            <DownArrow color="#808080" />
          )}
        </>
      )}
    </button>
  );
};

SortableButton.propTypes = {
  columnKey: Proptypes.string.isRequired,

  // Fonction de tri
  label: Proptypes.string.isRequired,

  // Configuration actuelle de tri
  requestSort: Proptypes.func.isRequired,
  // Clé pour identifier la colonne
  sortConfig: Proptypes.shape({
    direction: Proptypes.string,
    key: Proptypes.string,
  }), // Libellé du bouton
};

export default SortableButton;
