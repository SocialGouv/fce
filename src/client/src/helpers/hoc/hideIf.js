import { branch, renderNothing } from "recompose";

export const hideIf = (test) => branch(test, renderNothing);
