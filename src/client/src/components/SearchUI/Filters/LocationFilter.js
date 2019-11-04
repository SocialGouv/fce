import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/lib/Async";
import Config from "../../../services/Config";
import { selectCustomStyles } from "./customStyles";

const LocationFilter = ({
  filters,
  addFilters,
  removeFilters,
  loadLocations
}) => (
  <div className="field">
    <div className="control">
      <AsyncSelect
        id="commune"
        name="commune"
        defaultOptions={[]}
        loadOptions={loadLocations}
        onChange={location => {
          location
            ? addFilters("location", location)
            : removeFilters("location");
        }}
        loadingMessage={() => "Chargement..."}
        noOptionsMessage={term =>
          term.inputValue.length >= Config.get("advancedSearch").minTerms
            ? "Aucun résultat"
            : `Veuillez saisir au moins ${
                Config.get("advancedSearch").minTerms
              } caractères`
        }
        placeholder="Commune ou code postal"
        isClearable
        value={filters.location}
        styles={selectCustomStyles}
      />
    </div>
  </div>
);

LocationFilter.propTypes = {
  filters: PropTypes.object,
  addFilters: PropTypes.func.isRequired,
  removeFilters: PropTypes.func.isRequired,
  loadLocations: PropTypes.func.isRequired
};

export default LocationFilter;
