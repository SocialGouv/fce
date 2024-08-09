import { format, parse } from "date-fns";
import { pipe } from "lodash/fp";

export const usDateToFrenchDate = pipe(
  (dateString) => {
    if (typeof dateString !== "string") {
      throw new TypeError(
        `Expected a string, but received a ${typeof dateString}`
      );
    }
    return parse(dateString, "yyyy-MM-dd", new Date());
  },
  (date) => format(date, "dd/MM/yyyy")
);
