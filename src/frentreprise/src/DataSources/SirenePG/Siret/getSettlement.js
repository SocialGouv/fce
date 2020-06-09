import Etablissement from "../../../Models/Etablissements";
import helpers from "../Helpers/helpers";
import models from "../../../Model";

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

  console.log(
    "////////////////etablissement 007",
    etablissement,
    etablissement.rupcoEtablissements[0]
    // { pse: etablissement.pse, rcc: etablissement.rcc, lice: etablissement.lice }
    // etablissement.naf.libelle,
    // etablissement.entreprise.datecreationunitelegale
  );

  console.log("***");
  console.log(includes);

  return {};
  // console.log({ db });
  // const departements = await models.Departement.findAll();
  // const cjs = await models.CategorieJuridique.findAll();
  // // const etab = await models.Etablissement.findAll(); // LIMIT !!!!
  // // console.log({ departements });
  // console.log({ departement: departements[0] });
  // console.log({ cj: cjs[0] });
  // console.log({ etab: etab[0] });

  if (!etablissement) {
    return {};
  }

  return await helpers.formatEtab(etablissement);
};

export default getSettlement;
