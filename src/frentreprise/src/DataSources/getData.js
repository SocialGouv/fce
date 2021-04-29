import _get from "lodash.get";

export default async (data, fields) => {
  const out = {};

  if (typeof data !== "object") {
    return out;
  }

  for (const field of fields) {
    const inKey = typeof field === "object" ? field.in : field;
    const outKey = typeof field === "object" ? field.out : field;
    const defaultValue =
      typeof field === "object" && field.defaultValue
        ? field.defaultValue
        : undefined;
    let value = _get(data, inKey, defaultValue);

    if (field.callback) {
      value = await field.callback(value, data);
    }

    if (typeof value === "boolean") {
      out[outKey] = value;
    } else {
      out[outKey] = value || undefined;
    }
  }

  return out;
};
