import { nestcribe_path as test } from "../tests/utils";

import frentreprise from "./frentreprise";

test("frentreprise", () => {
  it("have a default ApiGouv datasource", () => {
    const ds = frentreprise.getDataSources();
    expect(ds.length).toBeGreaterThan(0);
    expect(ds[0]).toEqual(expect.objectContaining({ name: "ApiGouv" }));
  });

  it("can get, delete and add a datasource", () => {
    const dsLen = frentreprise.getDataSources().length;
    expect(dsLen).toBeGreaterThan(0);

    const aDs = frentreprise.getDataSource("ApiGouv");

    frentreprise.removeDataSource(aDs);
    expect(frentreprise.getDataSources().length).toBe(dsLen - 1);
    expect(frentreprise.getDataSource("ApiGouv")).toBe(undefined);

    frentreprise.addDataSource(aDs);
    expect(frentreprise.getDataSources().length).toBe(dsLen);
    expect(frentreprise.getDataSource("ApiGouv")).toBe(aDs);
  });
});
