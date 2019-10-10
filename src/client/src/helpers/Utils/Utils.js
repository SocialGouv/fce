export const CountValueInArray = (array, key) =>
  array.reduce((acc, currentValue) => {
    return acc + currentValue[key];
  }, 0);
