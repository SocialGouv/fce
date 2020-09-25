import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-solid-svg-icons";

const SearchBar = ({ label, searchTerm, setSearchTerm, isLoading }) => {
  return (
    <div className="control is-expanded">
      <label htmlFor="term" className="label">
        {label}
      </label>
      <div className="search-form__search">
        <div className="search-form__search-bar">
          <input
            type="text"
            name="q"
            id="term"
            className="input is-medium"
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
            value={searchTerm}
          />
          {searchTerm.length > 0 && (
            <button
              type="button"
              className="button is-text"
              onClick={() => {
                setSearchTerm("");
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        <div className="search-form__button">
          <button
            className={classNames(
              "action",
              "button",
              "is-secondary",
              "is-medium",
              { "is-loading": isLoading }
            )}
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  label: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default SearchBar;
