import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const ID = "siege";
const CheckboxFilter = ({ filters, addFilter, removeFilter, label }) => {
  const [isChecked, setIsChecked] = useState(!!filters["siege"]);
  useEffect(() => {
    setIsChecked(!!filters["siege"]);
  }, [filters]);

  const handleChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      removeFilter(ID);
    } else {
      addFilter(ID, "true");
    }
  };

  return (
    <div className="field filter__siege is-centred">
      <label className="label" htmlFor={ID}>
        {label}
      </label>
      <div className="filter__siege_button">
        <input
          className="checkradio "
          type="checkbox"
          name={ID}
          id={ID}
          onChange={handleChange}
          checked={isChecked}
        />
      </div>
    </div>
  );
};

CheckboxFilter.propTypes = {
  addFilter: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  label: PropTypes.string,
  removeFilter: PropTypes.func.isRequired,
};

export default CheckboxFilter;
