import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Value from "../../../../shared/Value";
import Source from "../../../../../containers/Source";

import "./data.scss";

const Data = ({
  name,
  description = null,
  value,
  emptyValue = "-",
  nonEmptyValue,
  link = null,
  className = "",
  columnClasses = ["is-4", "is-8"],
  sourceSi = null,
  sourceCustom = null,
  sourceDate = null,
  hasNumberFormat = false,
  numberFormatOptions = null
}) => {
  return (
    <>
      <div className={`data dl columns ${className}`}>
        <div className={`column ${columnClasses[0]}`}>
          {description ? (
            <div>
              <div className="dt">{name}</div>
              <div>{description}</div>
            </div>
          ) : (
            <div className="dt">{name}</div>
          )}
        </div>
        <div className={`dd column ${columnClasses[1]}`}>
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
        </div>
      </div>
    </>
  );
};

Data.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element]),
  description: PropTypes.node,
  className: PropTypes.string,
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
  sourceDate: PropTypes.string,
  hasNumberFormat: PropTypes.bool,
  numberFormatOptions: PropTypes.object
};

export default Data;
