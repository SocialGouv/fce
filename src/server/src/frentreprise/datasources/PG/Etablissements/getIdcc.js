export default async (SIRET, Idcc) => {
  return Idcc.getBySIRET(SIRET).then(idcc => {
    if (!idcc) {
      return null;
    }

    return { code_idcc: idcc.code, libelle_idcc: idcc.libelle };
  });
};
