import { formatSiren, formatSiret } from "./format";

const siren = "491182192";
const siret = "49118219200113";

test("format siren xxxxxxxxx to xxx xxx xxx", () => {
  expect(formatSiren(siren)).toEqual("491 182 192");
});

test("format siret xxxxxxxxxxxxxx to xxx xxx xxx xxxxx", () => {
  expect(formatSiret(siret)).toEqual("491 182 192 00113");
});
