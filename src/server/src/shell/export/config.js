const config = {
  interactions: {
    upload: {
      className: "MinioUploader",
      bucket: "dge",
      pathInBucket: "signaux_faibles/",
      fileMatch: /^.*_interactions.csv$/,
    },
    export: {
      className: "InteractionsExporter",
      filename: "interactions.csv",
    },
  },
};

module.exports = config;
