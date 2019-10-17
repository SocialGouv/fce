import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { selectCustomStyles } from "./customStyles";

const DepartmentFacet = ({
  onChange,
  onRemove,
  values,
  options,
  departements
}) => {
  const selectOptions = options.map(option => {
    const departement = departements.data.find(
      departement => departement.code === option.value
    );
    return {
      value: option.value,
      label: `${option.value} - ${departement && departement.libelle}`
    };
  });

  const selectedFilterValue = values[0];

  const selectedOption = selectOptions.find(option => {
    if (
      selectedFilterValue &&
      selectedFilterValue.name &&
      option.value.name === selectedFilterValue.name
    ) {
      return true;
    }

    if (option.value === selectedFilterValue) {
      return true;
    }

    return false;
  });

  return (
    <Select
      id="naf"
      name="naf"
      options={selectOptions}
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

DepartmentFacet.propTypes = {
  values: PropTypes.array,
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  departements: PropTypes.array.isRequired
};

export default DepartmentFacet;
