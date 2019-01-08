const ObjectManipulations = require("../../src/utils/ObjectManipulations");

describe("copyKeys", () => {
  test("default", () => {
    const myobj = {
      firstname: "Paul",
      lastname: "Hémique",
      test: "OK"
    };
    const keys = ["firstname", "lastname", "age"];
    const defaultValue = "null";

    const expected = {
      firstname: "Paul",
      lastname: "Hémique",
      age: "null"
    };

    expect(ObjectManipulations.copyKeys(myobj, keys, defaultValue)).toEqual(
      expected
    );
  });
});

describe("deleteKeyIfNotDefinedOrEmpty", () => {
  test("remove null", () => {
    const myobj = {
      firstname: "Paul",
      lastname: null
    };

    ObjectManipulations.deleteKeyIfNotDefinedOrEmpty(myobj, "lastname");

    const expected = {
      firstname: "Paul"
    };

    expect(myobj).toEqual(expected);
  });

  test("remove undefined", () => {
    const myobj = {
      firstname: "Paul",
      lastname: undefined
    };

    ObjectManipulations.deleteKeyIfNotDefinedOrEmpty(myobj, "lastname");

    const expected = {
      firstname: "Paul"
    };

    expect(myobj).toEqual(expected);
  });

  test("remove empty string", () => {
    const myobj = {
      firstname: "Paul",
      lastname: ""
    };

    ObjectManipulations.deleteKeyIfNotDefinedOrEmpty(myobj, "lastname");

    const expected = {
      firstname: "Paul"
    };

    expect(myobj).toEqual(expected);
  });

  test("not remove non empty string", () => {
    const myobj = {
      firstname: "Paul",
      lastname: "Hémique"
    };

    ObjectManipulations.deleteKeyIfNotDefinedOrEmpty(myobj, "lastname");

    const expected = {
      firstname: "Paul",
      lastname: "Hémique"
    };

    expect(myobj).toEqual(expected);
  });

  test("remove empty array", () => {
    const myobj = {
      firstname: "Paul",
      competences: []
    };

    ObjectManipulations.deleteKeyIfNotDefinedOrEmpty(myobj, "competences");

    const expected = {
      firstname: "Paul"
    };

    expect(myobj).toEqual(expected);
  });

  test("not remove non empty array", () => {
    const myobj = {
      firstname: "Paul",
      competences: ["js"]
    };

    ObjectManipulations.deleteKeyIfNotDefinedOrEmpty(myobj, "competences");

    const expected = {
      firstname: "Paul",
      competences: ["js"]
    };

    expect(myobj).toEqual(expected);
  });
});

describe("clean", () => {
  test("remove null", () => {
    const myobj = {
      firstname: "Paul",
      lastname: null
    };

    ObjectManipulations.clean(myobj);

    const expected = {
      firstname: "Paul"
    };

    expect(myobj).toEqual(expected);
  });

  test("remove undefined", () => {
    const myobj = {
      firstname: "Paul",
      lastname: undefined
    };

    ObjectManipulations.clean(myobj);

    const expected = {
      firstname: "Paul"
    };

    expect(myobj).toEqual(expected);
  });

  test("remove empty string", () => {
    const myobj = {
      firstname: "Paul",
      lastname: ""
    };

    ObjectManipulations.clean(myobj);

    const expected = {
      firstname: "Paul"
    };

    expect(myobj).toEqual(expected);
  });

  test("not remove non empty string", () => {
    const myobj = {
      firstname: "Paul",
      lastname: "Hémique"
    };

    ObjectManipulations.clean(myobj);

    const expected = {
      firstname: "Paul",
      lastname: "Hémique"
    };

    expect(myobj).toEqual(expected);
  });

  test("remove empty array", () => {
    const myobj = {
      firstname: "Paul",
      competences: []
    };

    ObjectManipulations.clean(myobj);

    const expected = {
      firstname: "Paul"
    };

    expect(myobj).toEqual(expected);
  });

  test("not remove non empty array", () => {
    const myobj = {
      firstname: "Paul",
      competences: ["js"]
    };

    ObjectManipulations.clean(myobj);

    const expected = {
      firstname: "Paul",
      competences: ["js"]
    };

    expect(myobj).toEqual(expected);
  });
});
