export * from "./Validator";

export function cleanObject(object) {
  Object.keys(object || {}).forEach(key => {
    if (object[key] === null || typeof object[key] === "undefined") {
      delete object[key];
    }
  });
  return object;
}
