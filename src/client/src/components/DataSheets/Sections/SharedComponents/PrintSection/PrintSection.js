import "./PrintSection.scss";

import React from "react";

import PrintIcon from "../../../../shared/Icons/PrintIcon.jsx";

const PrintSection = () => {
  return (
    <div className="data-sheet__print-section">
      <button
        className="print-btn data-sheet__print-button"
        onClick={() => window.print()}
      >
        <PrintIcon />
      </button>
    </div>
  );
};

export default PrintSection;
