import "./statistics.scss";

import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

import { selectCustomStyles } from "../../../components/Search/Filters/customStyles";

const StatsFilters = ({ range, setRange, isLoading }) => {
  const options = [
    { label: "1 mois", value: "1" },
    { label: "3 mois", value: "3" },
    { label: "6 mois", value: "6" },
    { label: "12 mois", value: "12" },
  ];

  return (
    <div className="stats-filters">
      <Select
        id="range"
        name="range"
        options={options}
        value={range}
        isDisabled={isLoading}
        onChange={(range) => range && setRange(range)}
        placeholder="Période"
        styles={selectCustomStyles}
      />
    </div>
  );
};

StatsFilters.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  range: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string,
    }),
  ]).isRequired,
  setRange: PropTypes.func.isRequired,
};

export default StatsFilters;
