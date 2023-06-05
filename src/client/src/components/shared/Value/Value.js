import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { toI18nDate } from "../../../helpers/Date";
import { formatNumber } from "../../../helpers/utils";

const Value = ({
  value,
  empty = "-",
  no = "Non",
  yes = "Oui",
  dateFormat = "L",
  breakLines = false,
  isApi = false,
  link = false,
  nonEmptyValues = [],
  hasNumberFormat = false,
  numberFormatOptions = {},
}) => {
  if (value && React.isValidElement(value)) {
    return value;
  }

  if (value && typeof value === "object") {
    return "error";
  }

  if (value === true && yes) {
    return yes;
  }

  if (value === false && empty === "0") {
    return "0";
  }

  if (value === false && no) {
    return no;
  }

  if (typeof value === "undefined" || value === "undefined") {
    value = null;
  }

  const iso_date =
    /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/;

  if (typeof value === "string" && iso_date.test(value)) {
    value = toI18nDate(value, dateFormat);
  }

  if (!value && empty && !nonEmptyValues.includes(value)) {
    return empty;
  }

  if (value === "Non disponible") {
    return empty;
  }

  if (typeof value === "string" && breakLines) {
    return value.split("\n").map((l, i) => <div key={`line_${i}`}>{l}</div>);
  }

  if (link) {
    return (
      <Link to={link} onClick={(e) => e && e.stopPropagation()}>
        {value}
      </Link>
    );
  }

  if (
    (typeof value === "string" || typeof value === "number") &&
    hasNumberFormat
  ) {
    return isApi ? (
      <div className="sourceApi">
        {formatNumber(value, numberFormatOptions)}
        <span className="source">{" (DGFIP)"}</span>
      </div>
    ) : (
      formatNumber(value, numberFormatOptions)
    );
  }

  return isApi ? (
    <div className="sourceApi">
      {value}
      <span className="source">{" (DGFIP)"}</span>
    </div>
  ) : (
    value
  );
};

Value.propTypes = {
  breakLines: PropTypes.bool,
  dateFormat: PropTypes.string,
  empty: PropTypes.string,
  hasNumberFormat: PropTypes.bool,
  isApi: PropTypes.bool,
  link: PropTypes.string,
  no: PropTypes.string,
  nonEmptyValues: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  numberFormatOptions: PropTypes.object,
  value: PropTypes.any,
  yes: PropTypes.string,
};

export default Value;
