import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

import { selectCustomStyles } from "./customStyles";

const EffectifFilter = ({
  filters,
  addFilter,
  removeFilter,
  trancheEffectif,
  id,
}) => {
  const options = trancheEffectif.map(({ code, libelle }) => ({
    label: `${libelle}`,
    value: code,
  }));

  return (
    <div>
      <label htmlFor={id} className="label">
        Tranche effectif (DSN)
      </label>
      <Select
        id={id}
        name={id}
        isMulti
        options={options}
        value={filters.effectif}
        onChange={(effectif) => {
          effectif ? addFilter(id, effectif) : removeFilter(id);
        }}
        isClearable
        placeholder=""
        styles={selectCustomStyles}
      />
    </div>
  );
};

EffectifFilter.propTypes = {
  addFilter: PropTypes.func.isRequired,
  filters: PropTypes.object,
  id: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired,
  trancheEffectif: PropTypes.array.isRequired,
};

export default EffectifFilter;
