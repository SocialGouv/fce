const FILES_FOLDER = "/mnt/data/export";

const config = {
  interactions_pole_t: {
    download: {
      className: "MinioDownload"
    },
    ingest: {
      className: "InteractionsPoleTIngestor",
      table: "interactions_pole_t",
      filename: `${FILES_FOLDER}/interactions_pole_t.csv`,
      cols: ["siret", "date", "realise_pour"],
      delimiter: ";",
      truncate: true
    }
  }
};

module.exports = config;
