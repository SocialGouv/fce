import { fromPairs } from "lodash";

export const getFormValues = form =>
  fromPairs([...new FormData(form).entries()]);
