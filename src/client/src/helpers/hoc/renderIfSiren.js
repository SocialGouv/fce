import { hideIf } from "./hideIf";

export const renderIfSiren = hideIf(
  ({ entreprise, siren }) => !entreprise?.siren && !siren
);
