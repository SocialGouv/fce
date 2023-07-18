import "./data.scss";

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import Source from "../../../../../containers/Source";
import Value from "../../../../shared/Value";

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
  numberFormatOptions = null,
}) => {
  return (
    <>
      <div className={`data dl columns ${className}`}>
        <div className={`column ${columnClasses[0]}`}>
          {description ? (
            <div>
              <div className={`dt ${columnClasses[2]} `}>
                {name} {description}
              </div>
            </div>
          ) : (
            <div className="dt dt-title ">{name}</div>
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
              <div className="data-value">
                <Value
                  value={value}
                  empty={emptyValue}
                  nonEmptyValues={nonEmptyValue}
                  hasNumberFormat={hasNumberFormat}
                  numberFormatOptions={numberFormatOptions}
                />
              </div>
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
  className: PropTypes.string,
  columnClasses: PropTypes.array,
  description: PropTypes.node,
  emptyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasNumberFormat: PropTypes.bool,
  link: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.element]),
  nonEmptyValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  numberFormatOptions: PropTypes.object,
  sourceCustom: PropTypes.string,
  sourceDate: PropTypes.string,
  sourceSi: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.node,
  ]),
};

export default Data;
