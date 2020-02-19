export default async (SIRET, Successions) => {
  return Successions.getLastSuccesseurBySIRET(SIRET).then(successeur => {
    if (!successeur) {
      return null;
    }

    const {
      siretetablissementsuccesseur,
      dateliensuccession,
      transfertsiege
    } = successeur;

    return {
      successeur: {
        siret: siretetablissementsuccesseur,
        date_transfert: dateliensuccession,
        transfert_siege: transfertsiege
      }
    };
  });
};
