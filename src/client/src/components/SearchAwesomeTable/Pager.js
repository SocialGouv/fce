import PropTypes from "prop-types";
import React from "react";

const Pager = ({ currentPage, max, handlePageChange }) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    const firstPage = 1;
    const lastPage = max;

    const addPageButton = (page) => {
      if (!buttons.some((button) => button.key === page.toString())) {
        buttons.push(
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => handlePageChange(+page)}
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
    <div className="pager">
      <div className="pager-btns">{renderPaginationButtons()}</div>
    </div>
  );
};

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired,
};

export default Pager;
