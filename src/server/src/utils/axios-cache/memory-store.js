export const createMemoryStore = ({
  ttl = 24 * 60 * 60
                           } = {}) => {
  const store = new Map();
  return {
    get: (key) => {
      const entry = store.get(key);

      if (!entry) {
        return null;
      }

      if (entry.date + ttl < Date.now()/1000) {
        return null;
      }
      return entry.value;
    },
    set: (key, value) => {
      const entry = {
        value,
        date: Date.now() / 1000
      }
      store.set(key, entry);
    }
  }
}
