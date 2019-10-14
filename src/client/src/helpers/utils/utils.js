export const joinNoFalsy = (arr, delimiter = "") =>
  arr.filter(element => !!element).join(delimiter);

export const capitalize = str =>
  str &&
  str
    .toLowerCase()
    .split(" ")
    .map(str => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`)
    .join(" ");

export const countValueInArray = (array, key) =>
  array.reduce((acc, currentValue) => {
    return acc + currentValue[key];
  }, 0);

export const hasInclude = (str, arrayOfStrings) =>
  arrayOfStrings.some(item => str.includes(item));
