export const nestscribe = (names, fn) =>
  (Array.isArray(names) ? names : [names]).reverse().reduce(
    (existing, name) => {
      return () => {
        describe(name, existing);
      };
    },
    () => {
      fn();
    }
  )();

export const explode_path = path => path.split("/");

export const nestcribe_path = (path, fn) => nestscribe(explode_path(path), fn);
