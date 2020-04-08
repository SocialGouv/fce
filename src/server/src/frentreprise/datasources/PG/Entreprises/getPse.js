import { getFormatedDate } from "../Helper";

export default async (SIREN, rupco) => {
  return rupco.getPSEBySIREN(SIREN).then((rows) => {
    if (!rows || !rows.length) {
      return {};
    }

    const pse = rows.reduce(
      (
        pseList,
        {
          date_enregistrement,
          numero,
          etat,
          situation_juridique,
          date_jugement,
          siret,
          nombre_de_ruptures_de_contrats_en_debut_de_procedure,
          nombre_de_ruptures_de_contrats_en_fin_de_procedure,
        }
      ) => {
        console.log({ pseList });

        if (!pseList[numero]) {
          pseList[numero] = {
            date_enregistrement: getFormatedDate(date_enregistrement),
            numero,
            etat,
            situation_juridique,
            date_jugement: getFormatedDate(date_jugement),
            nombre_de_ruptures: 0,
            etablissements: [],
          };
        }

        const nbRupturesEtablissement =
          +nombre_de_ruptures_de_contrats_en_fin_de_procedure ||
          +nombre_de_ruptures_de_contrats_en_debut_de_procedure ||
          0;

        pseList[numero].nombre_de_ruptures += nbRupturesEtablissement;
        pseList[numero].etablissements.push({
          siret,
          nombre_de_ruptures: nbRupturesEtablissement,
        });

        return pseList;
      },
      {}
    );

    return {
      pse: Object.values(pse),
    };
  });
};
