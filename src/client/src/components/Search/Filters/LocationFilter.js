import React from "react";
import pDebounce from "p-debounce";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import Config from "../../../services/Config";
import { selectCustomStyles } from "./customStyles";
import { searchCommune, searchDepartement } from "../../../services/LocationSearch/LocationSearch";


const searchLocation = async (query) => {
  const [departements, communes] = await Promise.all([
    searchDepartement(query),
    searchCommune(query),
  ]);
  const formattedDepartements = departements.map(({
    code,
    nom
  }) => ({
    label: `${nom} (${code})`,
    value: code,
    type: "departement",
  }));

  const formattedCommunes = communes.map(({
    code,
    nom,
    codesPostaux
  }) => ({
    label: `${nom} (${codesPostaux.join(", ")})`,
    value: code,
    type: "commune",
  }));

  const options = [];

  if (formattedDepartements.length > 0) {
    options.push({
      label: "DÉPARTEMENTS",
      options: formattedDepartements,
    });
  }

  if (formattedCommunes.length > 0) {
    options.push({
      label: "COMMUNES",
      options: formattedCommunes
    });
  }

  return options;
}

const throttledSearch = pDebounce(searchLocation, 300);

const LocationFilter = ({
  filters,
  addFilter,
  removeFilter,
}) => (
  <div className="field">
    <div className="control">
      <label htmlFor="location" className="label">
        Département ou commune
      </label>
      <AsyncSelect
        id="location"
        name="location"
        isMulti
        defaultOptions={[]}
        loadOptions={throttledSearch}
        onChange={location => {
          location ? addFilter("location", location) : removeFilter("location");
        }}
        loadingMessage={() => "Chargement..."}
        noOptionsMessage={term =>
          term.inputValue.length >= Config.get("advancedSearch").minTerms
            ? "Aucun résultat"
            : `Veuillez saisir au moins ${Config.get("advancedSearch").minTerms
            } caractères`
        }
        isClearable
        placeholder=""
        value={filters.location}
        styles={selectCustomStyles}
      />
    </div>
  </div>
);

LocationFilter.propTypes = {
  filters: PropTypes.object,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
};

export default LocationFilter;
