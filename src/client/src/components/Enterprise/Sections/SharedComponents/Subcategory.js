import React from "react";
import PropTypes from "prop-types";
import Data from "./Data";

const Subcategory = ({ subtitle, datas }) => {
  return (
    <div className="subcategory">
      <h3 className="subtitle subcategory-title pb-2">{subtitle}</h3>
      {datas.map(data => {
        return (
          <Data
            key={data.dataName}
            dataName={data.dataName}
            dataValue={data.dataValue}
            dataEmptyValue={data.dataEmptyValue}
            dataNonEmptyValue={data.dataNonEmptyValue}
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
