import { parse, isValid, format, differenceInMonths, parseISO } from "date-fns";
import utils from "../../../Utils/utils";
import getData from "../../getData";

export const getFormatedDate = (date, outputFormat = "yyyy-MM-dd") => {
  if (!date) {
    return null;
  }

  date = date.trim();

  const datesFormats = [
    "yyyy-MM-dd",
    "yyyy/MM/dd",
    "dd/MM/yyyy",
    "ddMMMyyyy",
    "dd/MM/yy",
    "M/d/yy",
  ];

  for (const dateFormat of datesFormats) {
    const parsedDate = parse(date, dateFormat, new Date());

    if (isValid(parsedDate)) {
      return format(parsedDate, outputFormat);
    }
  }

  return null;
};
