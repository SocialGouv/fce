import React from "react";
import PropTypes from "prop-types";
import _range from "lodash.range";

const Pager = ({ currentPage, max, handlePageChange }) => {
  const limit = max > 100 ? 100 : max;
  const pageNumberList = _range(1, limit + 1).filter(
    page => page !== currentPage
  );

  return (
    <div className="pager">
      <span className="pager__label has-text-grey-dark">Page </span>
      <div className="select is-grey-dark">
        <select
          onChange={e => handlePageChange(+e.target.value)}
          className="is-hovered has-text-grey-dark"
        >
          <option
            className="has-text-grey-dark"
            value={currentPage}
            defaultValue
            hidden
          >
            {currentPage}
          </option>
          {pageNumberList.map(pageNumber => (
            <option
              className="has-text-grey-dark"
              value={pageNumber}
              key={`page-${pageNumber}`}
            >
              {pageNumber}
            </option>
          ))}
        </select>
      </div>
      <span className="has-text-grey-dark">/ {limit}</span>
    </div>
  );
};

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired
};

export default Pager;
