import { hideIf } from "./hideIf";

export const renderIfSiret = hideIf(
  ({ etablissement, siret }) => !etablissement?.siret && !siret
);
