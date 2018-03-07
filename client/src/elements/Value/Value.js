import { toI18nDate } from "../../helpers/Date";

export default ({
  value,
  empty,
  no = "Non",
  yes = "Oui",
  dateFormat = "L"
}) => {
  if (value && typeof value === "object") {
    return "error";
  }

  if (value === true && yes) {
    return yes;
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

  if (!value && empty) {
    return empty;
  }

  return value || null;
};
