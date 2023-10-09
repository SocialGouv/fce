import PropTypes from "prop-types";
import React from "react";

import LeftArrow from "../../../../shared/Icons/LeftArrow.jsx";
import RightArrow from "../../../../shared/Icons/RightArrow.jsx";

const PaginationTable = ({ currentPage, totalPages, handlePageClick }) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    const firstPage = 1;
    const lastPage = totalPages;

    const addPageButton = (page) => {
      if (!buttons.some((button) => button.key === page.toString())) {
        buttons.push(
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        );
      }
    };

    if (currentPage > 1) {
      addPageButton(firstPage);
    }

    if (currentPage > 4 && lastPage > 5) {
      buttons.push(
        <button key="dotsLeft" disabled>
          ...
        </button>
      );
    }

    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, lastPage);

    for (let page = startPage; page <= endPage; page++) {
      addPageButton(page);
    }

    if (currentPage < lastPage - 3 && lastPage > 5) {
      buttons.push(
        <button key="dotsRight" disabled>
          ...
        </button>
      );
    }

    if (currentPage < lastPage && lastPage > 5) {
      addPageButton(lastPage);
    }

    return buttons;
  };
  return (
    <div className="table-pagination">
      <button
        className="prev-btn"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        <LeftArrow />
        Précédent
      </button>
      {renderPaginationButtons()}
      <button
        className="prev-btn"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        Suivant
        <RightArrow />
      </button>
    </div>
  );
};
PaginationTable.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  totalPages: PropTypes.string.isRequired,
};

export default PaginationTable;
