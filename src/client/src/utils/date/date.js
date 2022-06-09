import { format, parse } from "date-fns/fp";
import { pipe } from "lodash/fp";

export const usDateToFrenchDate = pipe(
  parse(new Date(), "yyyy-MM-dd"),
  format("dd/MM/yyyy")
);
