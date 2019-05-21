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

export const getLastDateInteraction = (interactions, format = "DD/MM/YYYY") => {
  const moments =
    Array.isArray(interactions) &&
    interactions &&
    interactions.map(interaction => Moment(interaction.date));

  return (moments && Moment.max(moments).format(format)) || "";
};
