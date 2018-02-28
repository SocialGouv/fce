import Moment from "../../services/Moment";

export const toI18nDate = date => {
  if (!date) {
    return null;
  }
  return Moment(date).format("L");
};
