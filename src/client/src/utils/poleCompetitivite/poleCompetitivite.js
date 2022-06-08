import { isEmpty, negate, pipe, prop, trim } from "lodash/fp";

export const getPole = pipe(prop("designation_pole"), trim);

export const isPole = pipe(getPole, negate(isEmpty));
