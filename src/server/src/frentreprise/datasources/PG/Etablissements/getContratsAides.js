export default async (SIRET, ContratsAides) => {
  return ContratsAides.getBySIRET(SIRET).then(contratAide => {
    if (!contratAide) {
      return null;
    }

    return {
      contrat_aide: !!contratAide.contrat_aide,
      contrat_aide_salaries_n1: contratAide.CA_stock_12_2018,
      contrat_aide_embauches_n1: contratAide.CA_entree_2018
    };
  });
};
