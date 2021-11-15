import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { selectCustomStyles } from "./customStyles";
import { prop } from "lodash/fp";

const AutoCompleteFilter = ({
  filters,
  addFilter,
  removeFilter,
  options,
  id,
  label
}) => {
  const value = options.filter(option => filters[id]?.includes(option.value));

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <Select
        id={id}
        name={id}
        isMulti
        options={options}
        value={value}
        onChange={option => {
          option ? addFilter(id, option.map(prop("value"))) : removeFilter(id);
        }}
        isClearable
        placeholder=""
        styles={selectCustomStyles}
      />
    </div>
  );
};

AutoCompleteFilter.propTypes = {
  filters: PropTypes.object,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default AutoCompleteFilter;
