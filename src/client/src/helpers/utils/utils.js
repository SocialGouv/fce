export const joinNoFalsy = (arr, delimiter = "") =>
  arr.filter(element => !!element).join(delimiter);

export const capitalize = str =>
  str &&
  str
    .toLowerCase()
    .split(" ")
    .map(str => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`)
    .join(" ");

export const countValueInArray = (array, fields) => {
  if (Array.isArray(fields) && fields.length) {
    return array.reduce((acc, currentValue) => {
      let currentTotalFieldsValues = fields
        .map(field => currentValue[field])
        .reduce(
          (accFields, currentValueField) => accFields + currentValueField
        );

      return acc + currentTotalFieldsValues;
    }, 0);
  } else {
    return 0;
  }
};

export const hasInclude = (str, arrayOfStrings) =>
  arrayOfStrings.some(item => str.includes(item));
