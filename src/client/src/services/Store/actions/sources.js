import { toI18nDate } from "../../../helpers/Date/Date";
import Config from "../../Config";
import Http from "../../Http";
import { SET_SOURCES } from "../constants/ActionTypes";

const getSources = () => (dispatch) => {
  return Http.get("/sources")
    .then((response) => {
      const sources = response.data.results.reduce((acc, current) => {
        const customDateFormats = Config.get("sources.customDateFormats");

        if (
          Object.prototype.hasOwnProperty.call(customDateFormats, current.si) &&
          typeof customDateFormats[current.si] === "object"
        ) {
          return {
            ...acc,
            ...Object.entries(customDateFormats[current.si]).reduce(
              (customSources, [label, dateFormat]) => {
                const sourceLabel =
                  label === "default" ? current.si : `${current.si}-${label}`;

                return {
                  ...customSources,
                  [sourceLabel]: {
                    date: toI18nDate(current.date, dateFormat),
                    name: `${current.fournisseur} / ${current.si}`,
                  },
                };
              },
              {}
            ),
          };
        }

        return {
          ...acc,
          [current.si]: {
            date: toI18nDate(
              current.date,
              typeof customDateFormats[current.si] === "string"
                ? customDateFormats[current.si]
                : "DD/MM/YYYY"
            ),
            name: `${current.fournisseur} / ${current.si}`,
          },
        };
      }, {});

      dispatch({
        payload: sources,
        type: SET_SOURCES,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const loadSources = () => (dispatch) => {
  return dispatch(getSources());
};
