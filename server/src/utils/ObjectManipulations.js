export function copyKeys(source, keys) {
  const dest = {};

  keys.forEach(key => {
    dest[key] = source[key];
  });

  return dest;
}
