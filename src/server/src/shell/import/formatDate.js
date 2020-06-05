const { parse, isValid, format } = require("date-fns");
const OUT_FORMAT = "yyyy-MM-dd";

const formatDate = (date) => {
  if (!date) {
    return null;
  }

  if (typeof date === "object") {
    return format(date, OUT_FORMAT);
  }

  date = date.trim();

  const datesFormats = ["yyyy-MM-dd", "dd/MM/yyyy", "ddMMMyyyy", "dd/MM/yy"];

  for (const dateFormat of datesFormats) {
    const parsedDate = parse(date, dateFormat, new Date());

    if (isValid(parsedDate)) {
      return format(parsedDate, OUT_FORMAT);
    }
  }

  return null;
};

module.exports = formatDate;
