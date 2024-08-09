export const useRenderIfSiret = ({ etablissement, siret }) => {
  return !etablissement?.siret && !siret;
};
