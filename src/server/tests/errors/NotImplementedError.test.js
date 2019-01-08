const NotImplementedError = require("../../src/errors/NotImplementedError");

describe("NotImplementedError", () => {
  test("default", () => {
    const t = () => {
      throw new NotImplementedError("hi !");
    };

    expect(t).toThrow(NotImplementedError);
  });
});
