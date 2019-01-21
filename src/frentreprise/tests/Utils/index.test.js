import { nestcribe_path as test } from "../utils";

import { cleanObject } from "../../src/Utils/index";

test("Utils", () => {
  it("cleanObject", () => {
    const obj = { data: true, test: false, foo: undefined, hello: null };
    const cleanedObj = cleanObject(obj);

    expect(Object.keys(cleanedObj)).toEqual(["data", "test"]);
  });
});
