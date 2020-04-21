import { parse, isValid, format } from "date-fns";

export const getFormatedDate = (date) => {
  if (!date) {
    return null;
  }

  date = date.trim();

  const datesFormats = [
    "yyyy-MM-dd",
    "dd/MM/yyyy",
    "ddMMMyyyy",
    "dd/MM/yy",
    "M/d/yy",
  ];

  for (const dateFormat of datesFormats) {
    const parsedDate = parse(date, dateFormat, new Date());

    if (isValid(parsedDate)) {
      return format(parsedDate, "yyyy-MM-dd");
    }
  }

  return null;
};

export const getRupcoDataForEstablishment = (rows) =>
  rows
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

export const getRupcoDataForEnterprise = (rows) => {
  const rupco = rows.reduce(
    (
      rupcoList,
      {
        date_enregistrement,
        type,
        numero,
        etat,
        situation_juridique,
        date_jugement,
        siret,
        nombre_de_ruptures_de_contrats_en_debut_de_procedure,
        nombre_de_ruptures_de_contrats_en_fin_de_procedure,
      }
    ) => {
      if (!rupcoList[numero]) {
        rupcoList[numero] = {
          date_enregistrement: getFormatedDate(date_enregistrement),
          type,
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

      rupcoList[numero].nombre_de_ruptures += nbRupturesEtablissement;
      rupcoList[numero].etablissements.push({
        siret,
        nombre_de_ruptures: nbRupturesEtablissement,
      });

      return rupcoList;
    },
    {}
  );

  return Object.values(rupco).filter(
    ({ nombre_de_ruptures }) => nombre_de_ruptures > 0
  );
};
