import React from "react";
import PropTypes from "prop-types";

const Pager = ({ currentPage, max, selectedPage }) => {
  function pageNumberList() {
    var el = [];
    for (let i = 1; i <= max; i++) {
      if (i !== currentPage) el.push(i);
    }
    return el;
  }

  return (
    <div className="pager">
      <span className="pr-2 has-text-grey-dark">Page </span>
      <div className="select is-grey-dark mr-1">
        <select
          onChange={event => selectedPage(event.target.value)}
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
          {pageNumberList().map(el => (
            <option className="has-text-grey-dark" value={el} key={el}>
              {el}
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
  selectedPage: PropTypes.func.isRequired
};

export default Pager;
