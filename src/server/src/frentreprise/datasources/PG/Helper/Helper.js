import { parse, isValid, format } from "date-fns";

export const getFormatedDate = date => {
  if (!date) {
    return null;
  }

  date = date.trim();

  const datesFormats = [
    "yyyy-MM-dd",
    "dd/MM/yyyy",
    "ddMMMyyyy",
    "dd/MM/yy",
    "M/d/yy"
  ];

  for (const dateFormat of datesFormats) {
    const parsedDate = parse(date, dateFormat, new Date());

    if (isValid(parsedDate)) {
      return format(parsedDate, "yyyy-MM-dd");
    }
  }

  return null;
};
