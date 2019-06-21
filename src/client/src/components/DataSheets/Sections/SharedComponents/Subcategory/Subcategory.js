import React from "react";
import PropTypes from "prop-types";
import Data from "../Data";

import "./subcategory.scss";

const Subcategory = ({ subtitle, datas }) => {
  return (
    <div className="subcategory">
      <h3 className="subtitle subcategory-title pb-2">{subtitle}</h3>
      {datas.map(data => {
        return (
          <Data
            key={data.name}
            name={data.name}
            value={data.value}
            emptyValue={data.emptyValue || "-"}
            nonEmptyValue={data.nonEmptyValue}
            link={data.link}
          />
        );
      })}
    </div>
  );
};

Subcategory.propTypes = {
  subtitle: PropTypes.string.isRequired,
  datas: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Subcategory;
