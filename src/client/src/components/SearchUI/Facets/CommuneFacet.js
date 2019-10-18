import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { selectCustomStyles } from "./customStyles";

const CommuneFacet = ({ onChange, onRemove, values, options, communes }) => {
  const optionsWithLabels = options
    .map(({ value }) => {
      const commune = communes.data.find(commune => commune.code === value);
      return {
        value: value,
        label: `${value} - ${commune && commune.nom}`
      };
    })
    .sort((a, b) => a.value - b.value);

  const activeDepartmentFilter = values[0];

  const selectedOption = optionsWithLabels.find(
    ({ value }) => value === activeDepartmentFilter
  );

  return (
    <Select
      id="commune"
      name="commune"
      options={optionsWithLabels}
      onChange={option =>
        selectedOption
          ? onRemove(selectedOption.value)
          : onChange(option && option.value)
      }
      placeholder="Département"
      isClearable
      value={selectedOption}
      styles={selectCustomStyles}
    />
  );
};

CommuneFacet.propTypes = {
  values: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  communes: PropTypes.array.isRequired
};

export default CommuneFacet;
