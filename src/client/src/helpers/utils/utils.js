import codesNaf from "@socialgouv/codes-naf";

export const joinNoFalsy = (arr, delimiter = "") =>
  arr.filter((element) => !!element).join(delimiter);

export const capitalize = (str) =>
  str &&
  str
    .toLowerCase()
    .split(" ")
    .map((str) => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`)
    .join(" ");

const getCodeNafLibelle = (code) =>
  codesNafLabelIndex.get(code.padEnd(5, "0").slice(0, 5));
const codesNafLabelIndex = codesNaf.reduce(
  (map, { id, label }) => map.set(id, label),
  new Map()
);
export const getLibelletFromCodeNaf = (code) => getCodeNafLibelle(code);

export const countValuesInArray = (array, fields) => {
  if (!Array.isArray(fields) || !fields.length) {
    return 0;
  }

  return array.reduce((acc, currentValue) => {
    const currentTotalFieldsValues = fields
      .map((field) => currentValue[field])
      .reduce((accFields, currentValueField) => {
        return accFields + currentValueField;
      }, 0);

    return acc + currentTotalFieldsValues;
  }, 0);
};

export const arraySum = (array) =>
  array.reduce((total, value) => total + value, 0);

export const range = (min, max) =>
  min === max ? [min] : [min, ...range(min + 1, max)];
export const convertirMoisEnAnnees = (mois) => {
  const annees = Math.floor(mois / 12);
  const moisRestants = mois % 12;

  let result = "";
  if (annees > 0) {
    result += `${annees} an${annees > 1 ? "s" : ""}`;
  }
  if (moisRestants > 0) {
    if (annees > 0) {
      result += " ";
    }
    result += `${moisRestants} mois`;
  }
  return result || "__";
};
