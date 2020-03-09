import { SET_SOURCES } from "../constants/ActionTypes";
import Http from "../../Http";
import Config from "../../Config";
import { toI18nDate } from "../../../helpers/Date/Date";

const getSources = () => dispatch => {
  return Http.get("/sources")
    .then(response => {
      const sources = response.data.results.reduce((acc, current) => {
        const customDateFormats = Config.get("sources.customDateFormats");

        if (
          customDateFormats.hasOwnProperty(current.si) &&
          typeof customDateFormats[current.si] === "object"
        ) {
          return {
            ...acc,
            ...Object.entries(customDateFormats[current.si]).reduce(
              (customSources, [label, dateFormat]) => ({
                ...customSources,
                [`${current.si}-${label}`]: {
                  name: `${current.fournisseur} / ${current.si}`,
                  date: toI18nDate(current.date, dateFormat)
                }
              }),
              {}
            )
          };
        }

        return {
          ...acc,
          [current.si]: {
            name: `${current.fournisseur} / ${current.si}`,
            date: toI18nDate(
              current.date,
              typeof customDateFormats[current.si] === "string"
                ? customDateFormats[current.si]
                : "DD/MM/YYYY"
            )
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
