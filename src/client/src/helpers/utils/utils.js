export const joinNoFalsy = (arr, delimiter = "") =>
  arr.filter(element => !!element).join(delimiter);

export const capitalize = str =>
  str &&
  str
    .toLowerCase()
    .split(" ")
    .map(str => `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`)
    .join(" ");
