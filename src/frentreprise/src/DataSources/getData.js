import _get from "lodash.get";

export default (data, fields) => {
  const out = {};

  fields.forEach(field => {
    const inKey = typeof field === "object" ? field.in : field;
    const outKey = typeof field === "object" ? field.out : field;
    const defaultValue =
      typeof field === "object" && field.defaultValue
        ? field.defaultValue
        : undefined;
    let value = _get(data, inKey, defaultValue);

    if (field.callback) {
      value = field.callback(value, data);
    }

    if (typeof value === "boolean") {
      out[outKey] = value;
    } else {
      out[outKey] = value || undefined;
    }
  });

  return out;
};
