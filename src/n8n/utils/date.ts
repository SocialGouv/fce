import { format, parseISO } from "date-fns";

export const formatDate = (date: string) => {
  try {
    return format(parseISO(date), "yyyy-MM-dd");
  } catch (err) {
    return date;
  }
}
