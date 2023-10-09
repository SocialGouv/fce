import { prop } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

import { selectCustomStyles } from "./customStyles";

const AutoCompleteFilter = ({
  filters,
  addFilter,
  removeFilter,
  options,
  id,
  label,
  placeholder,
}) => {
  const value = options.filter((option) => filters[id]?.includes(option.value));

  return (
    <div id={id}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <Select
        id={id}
        name={id}
        isMulti
        options={options}
        value={value}
        closeMenuOnSelect={false}
        onChange={(option) => {
          option ? addFilter(id, option.map(prop("value"))) : removeFilter(id);
        }}
        isClearable
        components={{
          IndicatorSeparator: () => null,
        }}
        placeholder={placeholder}
        styles={selectCustomStyles}
      />
    </div>
  );
};

AutoCompleteFilter.propTypes = {
  addFilter: PropTypes.func.isRequired,
  filters: PropTypes.object,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired,
};

export default AutoCompleteFilter;
