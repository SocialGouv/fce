export default ({
  successeur: {
    siretetablissementsuccesseur,
    dateliensuccession,
    transfertsiege,
  },
}) => ({
  successeur: {
    siret: siretetablissementsuccesseur,
    date_transfert: dateliensuccession,
    transfert_siege: transfertsiege,
  },
});
