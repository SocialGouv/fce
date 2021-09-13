import { format, parse, parseISO } from "date-fns";

type FormatDateOptions = {
  inputFormat?: string;
  outputFormat: string;
};

export const formatDate = (date: string, options: FormatDateOptions) => {
  try {
    const parsedDate = options.inputFormat ?
      parse(date, options.inputFormat, new Date()) :
      parseISO(date);
    return format(parsedDate, options.outputFormat);
  } catch (err) {
    return date;
  }
}

export const formatPlainTextDate = (date: string) =>
  format(parse(date, "ddMMyyyy", new Date()), "dd-MM-yyyy")
