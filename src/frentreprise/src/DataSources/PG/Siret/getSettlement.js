import models from "../../../Models";
import formatEstablishment from "../Format/establishment";

const getSettlement = async (siret) => {
  const includes = [
    { model: models.Naf },
    { model: models.Entreprise },
    /* { association: models.Etablissement.Successeur, as: "successeur" },
    { association: models.Etablissement.Predecesseur, as: "predecesseur" },
    ...models.Etablissement.associatedSources.map(({ model }) => ({
      model: models[model],
    })), */
    {
      model: models.RupcoEtablissement,
      include: [models.RupcoProcedure],
    },
    {
      model: models.Idcc,
      include: [models.IdccDefinition],
    },
  ];

  const etablissement = await models.Etablissement.findOne({
    where: { siret },
    include: includes,
  });

  if (!etablissement) {
    return {};
  }

  return await formatEstablishment(etablissement);
};

export default getSettlement;
