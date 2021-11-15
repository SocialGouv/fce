import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { selectCustomStyles } from "./customStyles";

const NafFilter = ({ filters, addFilter, removeFilter, divisionsNaf }) => {
  const options = divisionsNaf.map(({ code, libelle }) => ({
    value: code,
    label: `${code} - ${libelle}`
  }));

  return (
    <div>
      <label htmlFor="naf" className="label">
        Activité (NAF ou libellé)
      </label>
      <Select
        id="naf"
        name="naf"
        isMulti
        options={options}
        value={filters.naf}
        onChange={naf => {
          naf ? addFilter("naf", naf.co) : removeFilter("naf");
        }}
        isClearable
        placeholder=""
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
