import React from "react";
import PropTypes from "prop-types";

const Pager = ({ currentPage, max, setCurrent }) => {
  const pageNumberList = () => {
    const pages = [];
    for (let pageNumber = 1; pageNumber <= max; pageNumber++) {
      if (pageNumber !== currentPage) {
        pages.push(pageNumber);
      }
    }
    return pages;
  };

  return (
    <div className="pager">
      <span className="pr-2 has-text-grey-dark">Page </span>
      <div className="select is-grey-dark mr-1">
        <select
          onChange={e => setCurrent(+e.target.value)}
          className="pager__select is-hovered has-text-grey-dark"
        >
          <option
            className="has-text-grey-dark"
            value={currentPage}
            defaultValue
            hidden
          >
            {currentPage}
          </option>
          {pageNumberList().map(pageNumber => (
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
      <span className="has-text-grey-dark">/ {max}</span>
    </div>
  );
};

Pager.propTypes = {
  currentPage: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default Pager;
