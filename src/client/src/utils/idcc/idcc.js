import { filter, pipe, uniqBy } from "lodash/fp";

const NO_CONVENTION_CODE = "9999";
const NOT_YET_APPLIED_CODE = "9998";

const invalidCodes = [NO_CONVENTION_CODE, NOT_YET_APPLIED_CODE];

export const formatIdcc = pipe(
  filter(({ idcc }) => !invalidCodes.includes(idcc)),
  uniqBy("idcc")
);
