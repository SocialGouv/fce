import { SET_SOURCES } from "../constants/ActionTypes";
import Http from "../../Http";
import Config from "../../Config";
import { toI18nDate } from "../../../helpers/Date/Date";

const getSources = () => dispatch => {
  return Http.get("/sources")
    .then(response => {
      const sources = response.data.results.reduce((acc, current) => {
        const dateFormat =
          Config.get("sources.dateFormats")[current.si] ||
          Config.get("sources.dateFormats")["default"];

        return {
          ...acc,
          [current.si]: {
            name: `${current.fournisseur} / ${current.si}`,
            date: toI18nDate(current.date, dateFormat)
          }
        };
      }, {});

      dispatch({
        type: SET_SOURCES,
        payload: sources
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const loadSources = () => dispatch => {
  return dispatch(getSources());
};
