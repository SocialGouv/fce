import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Value from "../../../../shared/Value";
import Source from "../../../../../containers/Source";

import "./data.scss";

const Data = ({
  name,
  value,
  emptyValue = "-",
  nonEmptyValue,
  link = null,
  columnClasses = ["is-4", "is-8"],
  sourceSi = null,
  sourceCustom = null,
  sourceDate = null,
  hasNumberFormat = false,
  numberFormatOptions = null
}) => {
  return (
    <>
      <dl className="data dl columns">
        <dt
          className={`dt column ${columnClasses[0]} is-first-letter-uppercase`}
        >
          {name}
        </dt>
        <dd className={`dd column ${columnClasses[1]}`}>
          <div>
            {link ? (
              <Link to={link}>
                <Value
                  value={value}
                  empty={emptyValue}
                  nonEmptyValues={nonEmptyValue}
                  hasNumberFormat={hasNumberFormat}
                  numberFormatOptions={numberFormatOptions}
                />
              </Link>
            ) : (
              <Value
                value={value}
                empty={emptyValue}
                nonEmptyValues={nonEmptyValue}
                hasNumberFormat={hasNumberFormat}
                numberFormatOptions={numberFormatOptions}
              />
            )}
          </div>
          {(sourceSi || sourceCustom) && (
            <Source
              si={sourceSi}
              sourceDate={sourceDate}
              sourceCustom={sourceCustom}
            />
          )}
        </dd>
      </dl>
    </>
  );
};

Data.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element]),
  columnClasses: PropTypes.array,
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
  link: PropTypes.string,
  sourceSi: PropTypes.string,
  sourceCustom: PropTypes.string,
  sourceDate: PropTypes.string
};

export default Data;
