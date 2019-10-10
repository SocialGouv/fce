import React from "react";
import { Link } from "react-router-dom";
import { toI18nDate } from "../../../helpers/Date";

export default ({
  value,
  empty = "-",
  no = "Non",
  yes = "Oui",
  dateFormat = "L",
  breakLines = false,
  link = false,
  nonEmptyValues = []
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

  const iso_date = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/;

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
      <Link to={link} onClick={e => e && e.stopPropagation()}>
        {value}
      </Link>
    );
  }

  return value;
};
