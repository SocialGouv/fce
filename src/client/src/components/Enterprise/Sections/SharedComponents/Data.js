import React from "react";
import PropTypes from "prop-types";
import Value from "../../../../elements/Value";

const Data = ({ dataName, dataValue, dataEmptyValue, dataNonEmptyValue }) => {
  return (
    <>
      <dl className="dl columns">
        <dt className="dt column is-3">{dataName}</dt>
        <dd className="dd column is-8">
          <Value
            value={dataValue}
            empty={dataEmptyValue}
            nonEmptyValues={dataNonEmptyValue}
          />
        </dd>
      </dl>
    </>
  );
};

Data.defaultProps = {
  dataEmptyValue: "-"
};

Data.propTypes = {
  dataName: PropTypes.string.isRequired,
  dataValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.boolean
  ]),
  dataEmptyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dataNonEmptyValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ])
};

export default Data;
