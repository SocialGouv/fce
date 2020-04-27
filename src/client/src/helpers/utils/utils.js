export const joinNoFalsy = (arr, delimiter = "") =>
  arr.filter(element => !!element).join(delimiter);

export const capitalize = str =>
  str &&
  str
    .toLowerCase()
    .split(" ")
    .map(str => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`)
    .join(" ");

export const countValuesInArray = (array, fields) => {
  if (!Array.isArray(fields) || !fields.length) {
    return 0;
  }

  return array.reduce((acc, currentValue) => {
    let currentTotalFieldsValues = fields
      .map(field => currentValue[field])
      .reduce((accFields, currentValueField) => {
        return accFields + currentValueField;
      }, 0);

    return acc + currentTotalFieldsValues;
  }, 0);
};

export const arraySum = array =>
  array.reduce((total, value) => total + value, 0);

export const toNumberFormatFr = (
  number,
  style = "decimal",
  minimumFractionDigits = 0
) =>
  new Intl.NumberFormat("fr-FR", {
    style,
    currency: "EUR",
    minimumFractionDigits
  }).format(number);
