import { parse, isValid, format } from "date-fns";

export const getFormatedDate = date => {
  if (!date) {
    return null;
  }

  date = date.trim();

  const datesFormats = ["dd/MM/yyyy", "ddMMMyyyy"];

  for (const dateFormat of datesFormats) {
    const parsedDate = parse(date, dateFormat, new Date());

    if (isValid(parsedDate)) {
      return format(parsedDate, "yyyy-MM-dd");
    }
  }

  return null;
};
