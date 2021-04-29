import models from "../../../Models";
import formatEnterprise from "../Format/enterprise";

const getEntreprise = async (siren) => {
  const includes = [
    { model: models.Naf },
    { model: models.CategorieJuridique },
  ];

  const entreprise = await models.Entreprise.findOne({
    where: { siren },
    include: includes,
  });

  const sources = [
    ...models.Entreprise.associatedSources,
    ...[
      {
        model: "RupcoEtablissement",
        include: [models.RupcoProcedure],
        entity: "rupcoEtablissements",
      },
      { model: "Idcc", include: [models.IdccDefinition], entity: "idccs" },
      {
        model: "InteractionsPole3ESEER",
        include: [models.Etablissement],
        entity: "interactionsPole3ESEERs",
      },
      {
        model: "InteractionsPole3ESRC",
        include: [models.Etablissement],
        entity: "interactionsPole3ESRCs",
      },
      {
        model: "InteractionsPoleC",
        include: [models.Etablissement],
        entity: "interactionsPoleCs",
      },
      {
        model: "InteractionsPoleT",
        include: [models.Etablissement],
        entity: "interactionsPoleTs",
      },
    ],
  ];

  if (!entreprise) {
    return {};
  }

  await Promise.all(
    sources.map(({ model, include, entity }) =>
      models[model]
        .findAll({
          where: { siren },
          ...(include && { include }),
        })
        .then((result) => (entreprise[entity] = result))
    )
  );

  return await formatEnterprise(entreprise);
};

export default getEntreprise;
