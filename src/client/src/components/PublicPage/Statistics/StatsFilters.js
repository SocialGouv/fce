import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Select from "react-select";

import { selectCustomStyles } from "../../../components/Search/Filters/customStyles";
import "./statistics.scss";

const StatsFilters = ({ setDate, date, range, setRange }) => {
  const options = [
    { label: "jour", value: "day" },
    { label: "semaine", value: "week" },
    { label: "mois", value: "month" },
    { label: "année", value: "year" }
  ];

  return (
    <div className="stats-filters">
      <input
        className="datepicker"
        type="date"
        id="date"
        name="date"
        value={date}
        max={moment().format("YYYY-MM-DD")}
        onChange={e => setDate(moment(e.target.value).format("YYYY-MM-DD"))}
      />
      <Select
        id="range"
        name="range"
        options={options}
        value={range}
        onChange={range => range && setRange(range)}
        placeholder="Période"
        styles={selectCustomStyles}
      />
    </div>
  );
};

StatsFilters.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  range: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.string
    })
  ]).isRequired,
  setDate: PropTypes.func.isRequired,
  setRange: PropTypes.func.isRequired
};

export default StatsFilters;
