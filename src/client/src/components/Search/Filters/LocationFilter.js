import pDebounce from "p-debounce";
import PropTypes from "prop-types";
import React from "react";
import AsyncSelect from "react-select/async";

import Config from "../../../services/Config";
import {
  searchCommune,
  searchDepartement,
  searchRegion,
  serachDepartementsByRegion,
} from "../../../services/LocationSearch/LocationSearch";
import { selectCustomStyles } from "./customStyles";

const searchLocation = async (query) => {
  const [departements, communes, regions] = await Promise.all([
    searchDepartement(query),
    searchCommune(query),
    searchRegion(query),
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
  const formattedRegions = regions?.map(({ code, nom }) => ({
    label: nom,
    type: "region",
    value: code,
  }));

  const options = [];
  if (formattedRegions.length > 0) {
    options.push({
      label: "REGIONS",
      options: formattedRegions,
    });
  }
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

const LocationFilter = ({ filters, addFilter, removeFilter }) => {
  const addAddress = (locations) => {
    Promise.all(
      locations.map(async (loc) => {
        const { type, value, label, regions } = loc;

        if (type === "region" && !regions) {
          try {
            const data = await serachDepartementsByRegion(value);
            const departementsResult = data.map(({ code, nom }) => ({
              label: `${nom} (${code})`,
              type: "departement",
              value: code,
            }));

            return {
              label: label,
              regions: departementsResult,
              type: type,
              value: value,
            };
          } catch (error) {
            console.error("Error fetching departements:", error);
            return loc; // Return the original location in case of an error
          }
        } else {
          return loc; // Return the original location for non-region types
        }
      })
    ).then((updatedLocations) => {
      // Update the filter with the new array of locations
      addFilter("location", updatedLocations);
    });
  };

  return (
    <div className="control  is-expanded select-control-field ">
      <AsyncSelect
        id="location"
        name="location"
        placeholder={
          <div className="select_placeholder">Zone géographique</div>
        }
        isMulti
        defaultOptions={[]}
        loadOptions={throttledSearch}
        onChange={(location) => {
          location ? addAddress(location) : removeFilter("location");
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
};

LocationFilter.propTypes = {
  addFilter: PropTypes.func.isRequired,
  filters: PropTypes.object,
  removeFilter: PropTypes.func.isRequired,
};

export default LocationFilter;
