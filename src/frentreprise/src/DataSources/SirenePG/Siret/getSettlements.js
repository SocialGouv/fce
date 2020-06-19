import models from "../../../Model";
import formatEstablishment from "../Format/establishment";

const LIMIT_ETABLISSEMENTS = 20;

const getSettlements = async (siren) => {
  const etablissements = await models.Etablissement.findAll({
    where: { siren },
    order: [
      ["etablissementsiege", "DESC"],
      ["etatadministratifetablissement", "ASC"],
    ],
    limit: LIMIT_ETABLISSEMENTS,
  });

  if (!etablissements) {
    return {};
  }

  const etabs = await Promise.all(
    etablissements.map(async (etab) => await formatEstablishment(etab))
  );

  return {
    nombre_etablissements_actifs: etabs.filter((eta) => eta.actif).length,
    _ets: etabs,
  };
};

export default getSettlements;
