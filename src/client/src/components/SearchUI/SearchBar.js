import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";

const SearchBar = ({ onChange, value, onSubmit, isLoading, error }) => (
  <form className="form search-form" onSubmit={onSubmit}>
    <div className="field is-grouped is-grouped-centered">
      <div className="control is-expanded">
        <input
          type="text"
          id="term"
          className="input is-medium"
          placeholder="SIRET, SIREN, raison sociale, nom"
          onChange={e => onChange(e.currentTarget.value)}
          value={value}
        />
      </div>
      <div className="control">
        <button
          disabled={value ? false : true}
          type="submit"
          className="action button is-outlined is-light is-medium"
        >
          {isLoading && !error ? (
            <span className="icon">
              <FontAwesomeIcon icon={faSpinner} spin />
            </span>
          ) : (
            "Rechercher"
          )}
        </button>
      </div>
    </div>
  </form>
);

SearchBar.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default SearchBar;
