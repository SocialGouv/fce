export default ({
  predecesseur: {
    siretetablissementpredecesseur,
    dateliensuccession,
    transfertsiege,
  },
}) => ({
  predecesseur: {
    siret: siretetablissementpredecesseur,
    date_transfert: dateliensuccession,
    transfert_siege: transfertsiege,
  },
});
