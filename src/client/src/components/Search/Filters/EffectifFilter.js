import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { selectCustomStyles } from "./customStyles";

const EffectifFilter = ({
  filters,
  addFilter,
  removeFilter,
  trancheEffectif
}) => {
  const options = trancheEffectif.map(({ code, libelle }) => ({
    value: code,
    label: `${libelle}`
  }));

  return (
    <div>
      <label htmlFor="effectif" className="label">
        Tranche effectif (DSN)
      </label>
      <Select
        id="effectif"
        name="effectif"
        isMulti
        options={options}
        value={filters.effectif}
        onChange={effectif => {
          effectif ? addFilter("effectif", effectif) : removeFilter("effectif");
        }}
        isClearable
        placeholder=""
        styles={selectCustomStyles}
      />
    </div>
  );
};

EffectifFilter.propTypes = {
  filters: PropTypes.object,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  trancheEffectif: PropTypes.array.isRequired
};

export default EffectifFilter;
