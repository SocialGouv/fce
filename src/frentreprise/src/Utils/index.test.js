import { nestcribe_path as test } from "../../tests/utils";

import { cleanObject } from "./index";

test("Utils", () => {
  it("cleanObject", () => {
    const obj = { data: true, test: false, foo: undefined, hello: null };
    const cleanedObj = cleanObject(obj);

    expect(Object.keys(cleanedObj)).toEqual(["data", "test"]);
  });
});
