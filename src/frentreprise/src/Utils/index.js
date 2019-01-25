export * from "./Validator";

export function cleanObject(object) {
  const data = { ...object
  };

  return Object.keys(data).reduce((acc, key) => {
    if (data[key] !== null && typeof data[key] !== "undefined") {
      acc[key] = data[key];
    }
    return acc;
  }, {});
}
