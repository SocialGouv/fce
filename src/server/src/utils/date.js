import {addMonths, getMonth} from "date-fns";
import { range } from "lodash";

export const getMonthRange = (baseDate, rangeSize) => range(0, rangeSize)
  .map(offset => addMonths(baseDate, offset));

export const getTwoCharactersMonth = (date) => `${getMonth(date) + 1}`.padStart(2, "0");
