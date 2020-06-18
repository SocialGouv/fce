import models from "../../../Model";
import formatEnterprise from "../Format/enterprise";

const getEntreprise = async (siren) => {
  const includes = [
    { model: models.Naf },
    { model: models.CategorieJuridique },
    { model: models.Etablissement },
    ...models.Entreprise.associatedSources.map(({ model }) => ({
      model: models[model],
    })),
    {
      model: models.RupcoEtablissement,
      include: [models.RupcoProcedure],
    },
    {
      model: models.Idcc,
      include: [models.IdccDefinition],
    },
  ];

  const entreprise = await models.Entreprise.findOne({
    where: { siren },
    include: includes,
  });

  if (!entreprise) {
    return {};
  }

  return await formatEnterprise(entreprise);
};

export default getEntreprise;
