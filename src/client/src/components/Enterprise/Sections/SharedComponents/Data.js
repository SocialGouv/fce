import React from "react";
import PropTypes from "prop-types";
import Value from "../../../../elements/Value";

const Data = ({ name, value, emptyValue, nonEmptyValue }) => {
  return (
    <>
      <dl className="dl columns">
        <dt className="dt column is-3">{name}</dt>
        <dd className="dd column is-8">
          <Value
            value={value}
            empty={emptyValue}
            nonEmptyValues={nonEmptyValue}
          />
        </dd>
      </dl>
    </>
  );
};

Data.defaultProps = {
  emptyValue: "-"
};

Data.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.boolean
  ]),
  emptyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nonEmptyValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ])
};

export default Data;
