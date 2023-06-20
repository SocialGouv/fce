import Moment from "../../services/Moment";

export const toI18nDate = (date, format = "L") => {
  if (!date) {
    return null;
  }
  return Moment(date).format(format || "L");
};

export const getCustomPastYear = (N) => {
  return Moment().subtract(N, "year").format("YYYY");
};

export const getMonthName = (month, shortName = false) => {
  if (!month) {
    return "";
  }
  const twoDigitsMonth = `${month}`.padStart(2, "0");
  const format = shortName ? "MMM" : "MMMM";
  return Moment(`2020-${twoDigitsMonth}-01`).format(format);
};

export const getDateMonthName = (date) => {
  if (!date) {
    return "";
  }
  return Moment(date).format("MMMM");
};

export const getDateYear = (date) => {
  if (!date) {
    return "";
  }
  return Moment(date).year();
};

export const getLastDateInteraction = (interactions, format = "DD/MM/YYYY") => {
  const moments =
    Array.isArray(interactions) &&
    interactions &&
    interactions.map((interaction) => Moment(interaction.date));

  return (moments && Moment.max(moments).format(format)) || "";
};

export const sortByDate = (sortableList) =>
  sortableList.sort((a, b) => new Date(b.date) - new Date(a.date));

export const getStartDateStatsParam = (months = 1) =>
  Moment().subtract(parseInt(months), "months").format("YYYY-MM-DD");

export const setYearMonthFormat = (date) => {
  if (!date) {
    return "";
  }
  return Moment(date).format("YYYY-MM");
};
const START_DATE_LABEL = {
  LAST_FIVE_YEARS: 60,
  LAST_FOUR_YEARS: 48,
  LAST_SIX_MONTHS: 6,
  LAST_THREE_YEARS: 36,
  LAST_TWO_YEARS: 24,
  LAST_YEAR: 12,
};

export const START_DATE_BY_LABEL = {
  [START_DATE_LABEL.LAST_YEAR]: {
    num: "1",
    path: "years",
  },
  [START_DATE_LABEL.LAST_TWO_YEARS]: {
    num: "2",
    path: "years",
  },
  [START_DATE_LABEL.LAST_THREE_YEARS]: {
    num: "3",
    path: "years",
  },
  [START_DATE_LABEL.LAST_FOUR_YEARS]: {
    num: "4",
    path: "years",
  },
  [START_DATE_LABEL.LAST_FIVE_YEARS]: {
    num: "5",
    path: "years",
  },
  [START_DATE_LABEL.LAST_SIX_MONTHS]: {
    num: "6",
    path: "months",
  },
};

export const getStartDateEtp = (date, range) => {
  if (date && range) {
    return Moment(date)
      .subtract(START_DATE_BY_LABEL[range].num, START_DATE_BY_LABEL[range].path)
      .add(1, "months")
      .format("YYYY-MM-DD");
  }
};
export const getStartDate = (date, range) => {
  const data = getStartDateEtp(date, range);
  console.log(date, "====>", data);
  return setYearMonthFormat(data);
};

export const getLastObjectStatsKey = () => Moment().format("YYYY-MM");
