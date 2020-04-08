import { getFormatedDate } from "../Helper";

export default async (SIRET, rupco) => {
  return rupco.getPSEBySIRET(SIRET).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    const pse = rows
      .map(
        ({
          date_enregistrement,
          numero,
          etat,
          nombre_de_ruptures_de_contrats_en_debut_de_procedure,
          nombre_de_ruptures_de_contrats_en_fin_de_procedure,
          etablissements,
        }) => ({
          date_enregistrement: getFormatedDate(date_enregistrement),
          numero,
          etat,
          nombre_de_ruptures:
            +nombre_de_ruptures_de_contrats_en_fin_de_procedure ||
            +nombre_de_ruptures_de_contrats_en_debut_de_procedure ||
            0,
          autres_etablissements: etablissements && etablissements.split(","),
        })
      )
      .filter(({ nombre_de_ruptures }) => nombre_de_ruptures > 0);

    return {
      pse,
    };
  });
};
