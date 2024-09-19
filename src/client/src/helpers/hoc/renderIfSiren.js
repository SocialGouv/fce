export const useRenderIfSiren = ({ entreprise, siren }) => {
  return !entreprise?.siren && !siren;
};
