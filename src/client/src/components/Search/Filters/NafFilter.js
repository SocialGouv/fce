import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

import { selectCustomStyles } from "./customStyles";

const NafFilter = ({ filters, addFilter, removeFilter, divisionsNaf }) => {
  const options = divisionsNaf.map(({ code, libelle }) => ({
    label: `${code} - ${libelle}`,
    value: code,
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
        onChange={(naf) => {
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
  addFilter: PropTypes.func.isRequired,
  divisionsNaf: PropTypes.array.isRequired,
  filters: PropTypes.object,
  removeFilter: PropTypes.func.isRequired,
};

export default NafFilter;
