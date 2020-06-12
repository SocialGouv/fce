import Etablissement from "../../../Models/Etablissements";
import helpers from "../Helpers/helpers";
import models from "../../../Model";
import formatEstablishment from "../Helpers/formatEstablishment";

const getSettlement = async (SIRET, db) => {
  const includes = [
    { model: models.Naf },
    { model: models.Entreprise },
    { association: models.Etablissement.Successeur, as: "successeur" },
    { association: models.Etablissement.Predecesseur, as: "predecesseur" },
    ...models.Etablissement.associatedSources.map(({ model }) => ({
      model: models[model],
    })),
    {
      model: models.RupcoEtablissement,
      include: [models.RupcoProcedure],
    },
  ];

  const etablissement = await models.Etablissement.findOne({
    where: { siret: SIRET },
    include: includes,
  });

  if (!etablissement) {
    return {};
  }

  return await formatEstablishment(etablissement);
};

export default getSettlement;
