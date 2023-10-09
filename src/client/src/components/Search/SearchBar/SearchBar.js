import PropTypes from "prop-types";
import React from "react";

const SearchBar = ({ label, searchTerm, setSearchTerm }) => {
  return (
    <div className="control is-expanded">
      <div className="search-form__search">
        <div className="search-form__search-bar">
          <input
            type="text"
            name="q"
            id="term"
            placeholder={label}
            className="input is-medium"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
          />
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  label: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
