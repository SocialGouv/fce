import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { selectCustomStyles } from "./customStyles";

const NafFilter = ({ filters, addFilters, removeFilters, divisionsNaf }) => {
  const options = divisionsNaf.map(({ code, libelle }) => ({
    value: code,
    label: `${code} - ${libelle}`
  }));

  const selectedValue = options.find(({ value }) => value === filters.naf);

  return (
    <Select
      id="naf"
      name="naf"
      options={options}
      onChange={option => {
        option ? addFilters("naf", option.value) : removeFilters("naf");
      }}
      placeholder="Code NAF ou libellé"
      isClearable
      value={selectedValue}
      styles={selectCustomStyles}
    />
  );
};

NafFilter.propTypes = {
  filters: PropTypes.object,
  addFilters: PropTypes.func.isRequired,
  removeFilters: PropTypes.func.isRequired,
  divisionsNaf: PropTypes.array.isRequired
};

export default NafFilter;
