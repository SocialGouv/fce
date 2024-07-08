import { branch, renderNothing } from "recompose";

export const hideIf = (test) => branch(test, renderNothing);
export const renderIfSiret = hideIf(
  ({ etablissement, siret }) => !etablissement?.siret && !siret
);
export const useRenderIfSiret = ({ etablissement, siret }) => {
  return !etablissement?.siret && !siret;
};
