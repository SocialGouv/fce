const _importData = Symbol("_importData");
const _data = Symbol("_data");

export default class BaseModel {
  constructor(data) {
    this[_importData](data, true);
  }

  updateData(data) {
    this[_importData](data);
  }

  replaceData(data) {
    this[_importData](data, true);
  }

  [_importData](data, replace = false) {
    if (typeof data === "object") {
      this[_data] = {
        ...(replace === true ? {} : this[_data]),
        ...data
      };
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
