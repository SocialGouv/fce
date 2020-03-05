const FILES_FOLDER = "/mnt/data/export";

const config = {
  interactions_pole_t: {
    download: {
      className: "MinioDownloader",
      bucket: "dgt",
      fileMatch: /^EtablissementActifsControlés_(.)*.csv$/,
      outputFileName: "interactions_pole_t.csv"
    },
    ingest: {
      table: "interactions_pole_t",
      historyTable: "interactions_pole_t_historique",
      filename: `${FILES_FOLDER}/interactions_pole_t.csv`,
      cols: ["siret", "date", "realise_pour"],
      delimiter: ";",
      truncate: true,
      history: true,
      date: {
        field: "date",
        format: "DD/MM/YYYY"
      }
    }
  },
  interactions_pole_3e: {
    download: {
      className: "MinioDownloader",
      bucket: "dge",
      fileMatch: /^(.)*_Tableau_donnees_API_EOS_(.)*.csv$/,
      outputFileName: "interactions_pole_3e.csv"
    },
    ingest: {
      table: "interactions_pole_3e",
      historyTable: "interactions_pole_3e_historique",
      filename: `${FILES_FOLDER}/interactions_pole_3e.csv`,
      cols: [
        "siret",
        "date_visite",
        "region",
        "inspecteurs",
        "filieres",
        "type_suivi",
        "suivi_eti"
      ],
      delimiter: ";",
      truncate: true,
      history: true,
      date: {
        field: "date_visite",
        format: "DD/MM/YYYY"
      }
    }
  },
  interactions_pole_3e_src: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^SRC_Extraction(.)*.csv$/,
      outputFileName: "interactions_pole_3e_src.csv"
    },
    ingest: {
      table: "interactions_pole_3e_src",
      filename: `${FILES_FOLDER}/interactions_pole_3e_src.csv`,
      cols: ["region", "siret", "numero_dossier", "type_controle", "date"],
      delimiter: ";",
      truncate: true,
      history: false,
      date: {
        field: "date",
        format: "DD/MM/YYYY"
      }
    }
  }
};

module.exports = config;
