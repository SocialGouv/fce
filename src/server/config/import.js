const FILES_FOLDER = "/mnt/data/export";

const config = {
  interactions_pole_t: {
    download: {
      className: "MinioDownloader",
      bucket: "dgt"
    },
    ingest: {
      className: "InteractionsPoleTIngestor",
      table: "interactions_pole_t",
      historyTable: "interactions_pole_t_historique",
      filename: `${FILES_FOLDER}/interactions_pole_t.csv`,
      cols: ["siret", "date", "realise_pour"],
      delimiter: ";",
      truncate: true,
      date: {
        field: "date",
        format: "DD/MM/YYYY"
      }
    }
  },
  interactions_pole_3e: {
    download: {
      className: "MinioDownloader",
      bucket: "dge"
    },
    ingest: {
      className: "InteractionsPole3EIngestor",
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
      date: {
        field: "date_visite",
        format: "DD/MM/YYYY"
      }
    }
  }
};

module.exports = config;
