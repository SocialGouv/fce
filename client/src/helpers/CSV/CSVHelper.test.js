const CSVHelper = require("./CSVHelper");

test("default", () => {
  const data = {
    siret: "01010101",
    siren: "0110"
  };

  const res = CSVHelper.jsonToCSV(data);
  expect(res).toBe('"siret","siren"\n"01010101","0110"');
});
