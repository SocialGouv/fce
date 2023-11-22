import pDebounce from "p-debounce";
import PropTypes from "prop-types";
import React from "react";
import AsyncSelect from "react-select/async";

import Config from "../../../services/Config";
import {
  searchCommune,
  searchDepartement,
} from "../../../services/LocationSearch/LocationSearch";
import { selectCustomStyles } from "./customStyles";

const searchLocation = async (query) => {
  const [departements, communes] = await Promise.all([
    searchDepartement(query),
    searchCommune(query),
  ]);
  const formattedDepartements = departements.map(({ code, nom }) => ({
    label: `${nom} (${code})`,
    type: "departement",
    value: code,
  }));

  const formattedCommunes = communes.map(({ code, nom, codesPostaux }) => ({
    label: `${nom} (${codesPostaux.join(", ")})`,
    type: "commune",
    value: code,
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
      options: formattedCommunes,
    });
  }

  return options;
};

const throttledSearch = pDebounce(searchLocation, 300);

const LocationFilter = ({ filters, addFilter, removeFilter }) => (
  <div className="control  is-expanded select-control-field ">
    <AsyncSelect
      id="location"
      name="location"
      placeholder={<div className="select_placeholder">Zone géographique</div>}
      isMulti
      defaultOptions={[]}
      loadOptions={throttledSearch}
      onChange={(location) => {
        location ? addFilter("location", location) : removeFilter("location");
      }}
      components={{
        IndicatorSeparator: () => null,
      }}
      loadingMessage={() => "Chargement..."}
      noOptionsMessage={(term) =>
        term.inputValue.length >= Config.get("advancedSearch").minTerms
          ? "Aucun résultat"
          : `Veuillez saisir au moins ${
              Config.get("advancedSearch").minTerms
            } caractères`
      }
      value={filters?.location || []}
      styles={selectCustomStyles}
    />
  </div>
);

LocationFilter.propTypes = {
  addFilter: PropTypes.func.isRequired,
  filters: PropTypes.object,
  removeFilter: PropTypes.func.isRequired,
};

export default LocationFilter;
