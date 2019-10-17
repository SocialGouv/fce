import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { selectCustomStyles } from "./customStyles";

const NafFacet = ({ onChange, onRemove, values, options, divisionsNaf }) => {
  const sortedOptions = options
    .map(option => option.value)
    .sort((a, b) => a - b);

  const optionsWithLabels = sortedOptions.map(option => {
    const division = divisionsNaf.find(division => division.code === option);
    return {
      value: option,
      label: `${option} - ${division && division.libelle}`
    };
  });

  const activeFilter = values[0];

  const selectedOption = optionsWithLabels.find(option => {
    console.log(activeFilter);
    if (activeFilter && option.value.name === activeFilter.name) {
      return true;
    }

    if (option.value === activeFilter) {
      return true;
    }

    return false;
  });

  return (
    <Select
      id="naf"
      name="naf"
      options={optionsWithLabels}
      onChange={option =>
        selectedOption
          ? onRemove(selectedOption.value)
          : onChange(option && option.value)
      }
      placeholder="Code NAF ou libellé"
      isClearable
      value={selectedOption}
      styles={selectCustomStyles}
    />
  );
};

NafFacet.propTypes = {
  values: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  divisionsNaf: PropTypes.array.isRequired
};

export default NafFacet;
