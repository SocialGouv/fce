const FILES_FOLDER = "/mnt/data/export";
const CONVERTER_XLSX_TO_CSV = "xlsxToCsv";

const config = {
  interactions_pole_t: {
    download: {
      className: "MinioDownloader",
      bucket: "dgt",
      fileMatch: /^EtablissementActifsControlés_(.)*.csv$/,
      outputFileName: "interactions_pole_t.csv",
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
        format: "DD/MM/YYYY",
      },
    },
  },
  interactions_pole_3e: {
    download: {
      className: "MinioDownloader",
      bucket: "dge",
      fileMatch: /^(.)*_Tableau_donnees_API_EOS_(.)*.csv$/,
      outputFileName: "interactions_pole_3e.csv",
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
        "suivi_eti",
      ],
      delimiter: ";",
      truncate: true,
      history: true,
      date: {
        field: "date_visite",
        format: "DD/MM/YYYY",
      },
    },
  },
  interactions_pole_3e_src: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^SRC_Extraction(.)*.csv$/,
      outputFileName: "interactions_pole_3e_src.csv",
    },
    ingest: {
      className: "InteractionsPole3ESrcIngestor",
      table: "interactions_pole_3e_src",
      filename: `${FILES_FOLDER}/interactions_pole_3e_src.csv`,
      cols: ["region", "siret", "numero_dossier", "type_controle", "date"],
      delimiter: ";",
      truncate: true,
      history: false,
      date: {
        field: "date",
        format: "DD/MM/YYYY",
      },
    },
  },
  interactions_pole_c: {
    download: {
      className: "MinioDownloader",
      bucket: "dgccrf",
      fileMatch: /^donnee_FCE_extract(.)*.xlsx$/,
      converter: CONVERTER_XLSX_TO_CSV,
      outputFileName: "interactions_pole_c.csv",
    },
    ingest: {
      className: "InteractionsPoleCIngestor",
      table: "interactions_pole_c",
      historyTable: "interactions_pole_c_historique",
      filename: `${FILES_FOLDER}/interactions_pole_c.csv`,
      cols: ["siret", "annee", "mois", "jour", "suite", "unite", "messagerie"],
      delimiter: ",",
      truncate: true,
      history: true,
      date: {
        field: "date",
        format: "YYYY-MM-DD",
      },
    },
  },
  etablissements_activite_partielle: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^APART_(.)*.xlsx$/,
      converter: CONVERTER_XLSX_TO_CSV,
      outputFileName: "etablissements_activite_partielle.csv",
    },
    ingest: {
      className: "ActivitePartielleIngestor",
      table: "etablissements_activite_partielle",
      historyTable: "etablissements_activite_partielle_historique",
      filename: `${FILES_FOLDER}/etablissements_activite_partielle.csv`,
      cols: [
        "siret",
        "num_convention",
        "date_decision",
        "num_avenant",
        "da_init",
        "nb_h_auto_avn",
        "nb_h_auto_cum",
        "nb_h_conso_cum",
        "cause",
      ],
      delimiter: ",",
      truncate: true,
      history: true,
      date: {
        field: "date_decision",
        format: "YYYY-MM-DD",
      },
    },
  },
  etablissements_apprentissage: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^(.)*Ariane(.)*.csv$/,
      outputFileName: "etablissements_apprentissage.csv",
    },
    ingest: {
      className: "ApprentissageIngestor",
      table: "etablissements_apprentissage",
      filename: `${FILES_FOLDER}/etablissements_apprentissage.csv`,
      cols: [
        "type_contrat",
        "numero_enregistrement",
        "date_debut",
        "date_rupture",
        "siret",
        "empty",
        "empty2",
      ],
      delimiter: ";",
      truncate: true,
      history: false,
      date: {
        field: "date_debut",
        format: "DD/MM/YYYY",
      },
    },
  },
  etablissements_idcc: {
    download: {
      className: "MinioDownloader",
      bucket: "dares",
      fileMatch: /^TRANS(.)*IDCC(.)*.csv$/,
      outputFileName: "etablissements_idcc.csv",
    },
    ingest: {
      table: "etablissements_idcc",
      filename: `${FILES_FOLDER}/etablissements_idcc.csv`,
      cols: ["mois", "siret", "idcc", "date_maj"],
      delimiter: ",",
      truncate: true,
      history: false,
      date: {
        field: "date_maj",
        format: "YYYY/MM/DD",
      },
    },
  },
  etablissements_dsn_eff: {
    download: {
      className: "MinioDownloader",
      bucket: "dares",
      fileMatch: /^TRANS(.)*effectifs(.)*.csv$/,
      outputFileName: "etablissements_dsn_eff.csv",
    },
    ingest: {
      table: "etablissements_dsn_eff",
      filename: `${FILES_FOLDER}/etablissements_dsn_eff.csv`,
      cols: [
        "mois",
        "siret",
        "eff",
        "hommes",
        "femmes",
        "cdd",
        "cdi",
        "cdi_inter",
        "inter_mission",
        "interim",
        "date_maj",
      ],
      delimiter: ",",
      truncate: true,
      history: false,
      date: {
        field: "date_maj",
        format: "YYYY/MM/DD",
      },
    },
  },
};

module.exports = config;
