const FILES_FOLDER = "/mnt/data/export";

const config = {
  interactions_pole_t: {
    download: {
      className: "MinioDownload"
    },
    ingest: {
      table: "interactions_pole_t",
      filename: `${FILES_FOLDER}/interactions_pole_t.csv`,
      colsMapping: {
        Siret: "siret",
        "Date de dernier controle": "date",
        Propriétaire: "realise_pour"
      }
    }
  }
};

module.exports = config;
