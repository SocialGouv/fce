import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Value from "../../../../shared/Value";

import "./data.scss";

const Data = ({ name, value, emptyValue, nonEmptyValue, link }) => {
  return (
    <>
      <dl className="data dl columns">
        <dt className="dt column is-3">{name}</dt>
        <dd className="dd column is-8">
          {link ? (
            <Link to={link}>
              <Value
                value={value}
                empty={emptyValue}
                nonEmptyValues={nonEmptyValue}
              />
            </Link>
          ) : (
            <Value
              value={value}
              empty={emptyValue}
              nonEmptyValues={nonEmptyValue}
            />
          )}
        </dd>
      </dl>
    </>
  );
};

Data.defaultProps = {
  emptyValue: "-",
  link: null
};

Data.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.node
  ]),
  emptyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nonEmptyValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  link: PropTypes.string
};

export default Data;
