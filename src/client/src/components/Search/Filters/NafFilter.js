import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { selectCustomStyles } from "./customStyles";

const NafFilter = ({ filters, addFilter, removeFilter, divisionsNaf }) => {
  const options = divisionsNaf.map(({ code, libelle }) => ({
    value: code,
    label: `${code} - ${libelle}`
  }));

  const selectedValue =
    options.find(({ value }) => value === filters.naf) || null;

  return (
    <div>
      <label htmlFor="naf" className="label">
        Activité (NAF ou libellé)
      </label>
      <Select
        id="naf"
        name="naf"
        options={options}
        onChange={option => {
          option ? addFilter("naf", option.value) : removeFilter("naf");
        }}
        isClearable
        placeholder=""
        value={selectedValue}
        styles={selectCustomStyles}
      />
    </div>
  );
};

NafFilter.propTypes = {
  filters: PropTypes.object,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  divisionsNaf: PropTypes.array.isRequired
};

export default NafFilter;
