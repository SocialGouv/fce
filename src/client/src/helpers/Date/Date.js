import Moment from "../../services/Moment";

export const toI18nDate = (date, format = "L") => {
  if (!date) {
    return null;
  }
  return Moment(date).format(format || "L");
};

export const getCustomPastYear = N => {
  return Moment()
    .subtract(N, "year")
    .format("YYYY");
};

export const getMonthName = (month, shortName = false) => {
  if (!month) {
    return "";
  }
  const format = shortName ? "MMM" : "MMMM";
  return Moment(`2020-${month}-01`).format(format);
};

export const getLastDateInteraction = (interactions, format = "DD/MM/YYYY") => {
  const moments =
    Array.isArray(interactions) &&
    interactions &&
    interactions.map(interaction => Moment(interaction.date));

  return (moments && Moment.max(moments).format(format)) || "";
};

export const sortByDate = sortableList =>
  sortableList.sort((a, b) => new Date(b.date) - new Date(a.date));

export const getStartDateStatsParam = (months = 1) =>
  Moment()
    .subtract(parseInt(months), "months")
    .format("YYYY-MM-DD");
