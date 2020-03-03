export default async (SIRET, Successions) => {
  return Successions.getLastPredecesseurBySIRET(SIRET).then(predecesseur => {
    if (!predecesseur) {
      return null;
    }

    const {
      siretetablissementpredecesseur,
      dateliensuccession,
      transfertsiege
    } = predecesseur;

    return {
      predecesseur: {
        siret: siretetablissementpredecesseur,
        date_transfert: dateliensuccession,
        transfert_siege: transfertsiege
      }
    };
  });
};
