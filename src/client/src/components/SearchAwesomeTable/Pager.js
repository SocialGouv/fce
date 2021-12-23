import React from "react";
import PropTypes from "prop-types";
import _range from "lodash.range";

const Pager = ({ currentPage, max, handlePageChange }) => {
  const pageNumberList = _range(1, max + 1);

  return (
    <div className="pager">
      <span className="pager__label">Page </span>
      <div className="select">
        <select
          onChange={e => handlePageChange(+e.target.value)}
          className="is-hovered"
        >
          <option value={currentPage} defaultValue hidden>
            {currentPage}
          </option>
          {pageNumberList.map(pageNumber => (
            <option value={pageNumber} key={`page-${pageNumber}`}>
              {pageNumber}
            </option>
          ))}
        </select>
      </div>
      <span>/ {max}</span>
    </div>
  );
};

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired
};

export default Pager;
