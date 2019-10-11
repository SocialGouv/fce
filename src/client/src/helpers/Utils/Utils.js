export const CountValueInArray = (array, key) =>
  array.reduce((acc, currentValue) => {
    return acc + currentValue[key];
  }, 0);

export const hasInclude = (str, arrayOfStrings) =>
  arrayOfStrings.some(item => str.includes(item));
