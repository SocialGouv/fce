const _importData = Symbol("_importData");
const _data = Symbol("_data");

export default class BaseModel {
  constructor(data = {}) {
    this[_importData](data, true);
  }

  updateData(data) {
    this[_importData](data);
  }

  replaceData(data) {
    this[_importData](data, true);
  }

  getData() {
    return this[_data];
  }

  [_importData](data, replace = false) {
    const isDefinedValue = value => value || value === false;

    if (typeof data === "object") {
      if (replace || this[_data] === undefined) {
        this[_data] = { ...{}, ...data };
      } else {
        for (const [key, value] of Object.entries(data)) {
          if (!this[_data].hasOwnProperty(key) || isDefinedValue(value)) {
            this[_data] = { ...this[_data], ...{ [key]: value } };
          }
        }
      }
    }

    // Add missing accessors
    Object.keys(this[_data]).forEach(key => {
      if (!this.hasOwnProperty(key)) {
        Object.defineProperty(this, key, {
          get: () => {
            return this[_data][key];
          }
        });
      }
    }, this);
  }
}

export const _protected = {
  _importData
};
