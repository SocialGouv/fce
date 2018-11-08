const NotImplementedError = require("./NotImplementedError");

describe("NotImplementedError", () => {
  test("default", () => {
    const t = () => {
      throw new NotImplementedError("hi !");
    };

    expect(t).toThrow(NotImplementedError);
  });
});
