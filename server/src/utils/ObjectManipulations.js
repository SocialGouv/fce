export function copyKeys(source, keys, defaultValue) {
  const dest = {};

  keys.forEach(key => {
    const value =
      typeof source[key] === "undefined" ? defaultValue : source[key];
    if (typeof value !== "undefined") {
      dest[key] = value;
    }
  });

  return dest;
}


export function deleteKeyIfNotDefinedOrEmpty(object, key) {
  let attribute = object[key];
  if (attribute === null || attribute === undefined || (typeof attribute == "string" && attribute.length === 0)) {
    delete object[key];
  }
};

export function clean(obj) {
  for (var propName in obj) {
    deleteKeyIfNotDefinedOrEmpty(obj, propName);
  }
}
