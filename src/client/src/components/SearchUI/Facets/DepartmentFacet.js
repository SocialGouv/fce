import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { selectCustomStyles } from "./customStyles";

const DepartmentFacet = ({
  onChange,
  onRemove,
  values,
  options,
  departments
}) => {
  const optionsWithLabels = options
    .map(({ value }) => {
      const department = departments.data.find(
        department => department.code === value
      );
      return {
        value: value,
        label: `${value} - ${department && department.nom}`
      };
    })
    .sort((a, b) => a.value - b.value);

  const activeDepartmentFilter = values[0];

  const selectedOption = optionsWithLabels.find(
    ({ value }) => value === activeDepartmentFilter
  );

  return (
    <Select
      id="department"
      name="department"
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

DepartmentFacet.propTypes = {
  values: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  departments: PropTypes.array.isRequired
};

export default DepartmentFacet;
