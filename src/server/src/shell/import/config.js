const FILES_FOLDER = "/mnt/data/export";
const CONVERTER_XLSX_TO_CSV = "xlsxToCsv";
const CONVERTER_JSON_TO_CSV = "jsonToCsv";

const config = {
  wikit_uc: {
    download: {
      className: "MinioDownloader",
      bucket: "dgt",
      fileMatch: /^(.)*_WIKIT_UC.json$/,
      outputFileName: "wikit_uc.csv",
      converter: CONVERTER_JSON_TO_CSV,
      transformer: (data) => ({
        code: data.CODE_UC,
        libelle: data.LIB_UC,
        email: data["Courrier électronique"],
      }),
    },
    ingest: {
      className: "WikitUcIngestor",
      table: "wikit_uc",
      filename: `${FILES_FOLDER}/wikit_uc.csv`,
      cols: ["code", "libelle", "email"],
      delimiter: ",",
      truncate: true,
      history: false,
    },
  },
  // === import wikit_uc first ===
  interactions_pole_t: {
    download: {
      className: "MinioDownloader",
      bucket: "dgt",
      fileMatch: /^EtablissementActifsControlés_(.)*.csv$/,
      outputFileName: "interactions_pole_t.csv",
    },
    ingest: {
      className: "InteractionsPole3TIngestor",
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
      fileMatch: /^(.)*export_SRC(.)*.csv$/,
      outputFileName: "interactions_pole_3e_src.csv",
    },
    ingest: {
      className: "InteractionsPole3ESrcIngestor",
      table: "interactions_pole_3e_src",
      filename: `${FILES_FOLDER}/interactions_pole_3e_src.csv`,
      cols: [
        "numero_dossier",
        "siret",
        "numero_etablissement",
        "region",
        "libelle_region",
        "type_controle",
        "date_creation",
        "date",
        "date_cloture",
        "cols",
        "clos_automatiquement",
        "nature_controle",
        "cible_controle",
      ],
      delimiter: ";",
      truncate: true,
      history: false,
      date: {
        field: "date",
        format: "YYYY-MM-DD",
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
      fileMatch: /^Extraction_FCE_S(.)*.csv$/,
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
      delimiter: ";",
      truncate: true,
      history: true,
      date: {
        field: "date_decision",
        format: "YYYY-MM-DD",
      },
    },
  },
  rupco_procedures_historique: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^PSE_procedure_historique.xlsx$/,
      converter: CONVERTER_XLSX_TO_CSV,
      outputFileName: "rupco_procedures_historique.csv",
    },
    ingest: {
      className: "RupcoHistoriqueIngestor",
      table: "rupco_procedures",
      filename: `${FILES_FOLDER}/rupco_procedures_historique.csv`,
      cols: [
        "numero",
        "type",
        "date_enregistrement",
        "etat",
        "siren",
        "effectif_entreprise",
        "effectif_groupe",
        "nom_groupe",
        "date_jugement",
        "situation_juridique",
      ],
      delimiter: ",",
      truncate: true,
      history: false,
      date: {
        field: "date_enregistrement",
        format: "YYYY-MM-DD",
      },
    },
  },
  rupco_etablissements_historique: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^PSE_etablissement_historique.xlsx$/,
      converter: CONVERTER_XLSX_TO_CSV,
      outputFileName: "rupco_etablissements_historique.csv",
    },
    ingest: {
      className: "RupcoHistoriqueIngestor",
      table: "rupco_etablissements",
      filename: `${FILES_FOLDER}/rupco_etablissements_historique.csv`,
      cols: [
        "numero",
        "type",
        "siren_etablissement",
        "effectif_etablissement",
        "siret",
        "nombre_de_ruptures_de_contrats_en_debut_de_procedure",
        "nombre_de_ruptures_de_contrats_en_fin_de_procedure",
        "siren",
        "situation_juridique",
        "date_enregistrement",
        "date_jugement",
      ],
      delimiter: ",",
      truncate: true,
      history: false,
      date: {
        field: "date_enregistrement",
        format: "YYYY-MM-DD",
      },
    },
  },
  rupco_procedures: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^RUPCO(.)*procedure(.)*.csv$/,
      outputFileName: "rupco_procedures.csv",
    },
    ingest: {
      className: "RupcoProceduresIngestor",
      table: "rupco_procedures",
      filename: `${FILES_FOLDER}/rupco_procedures.csv`,
      cols: [
        "numero",
        "type",
        "date_enregistrement",
        "etat",
        "siren",
        "effectif_entreprise",
        "effectif_groupe",
        "nom_groupe",
        "date_jugement",
        "situation_juridique",
      ],
      delimiter: ";",
      truncate: true,
      history: false,
      date: {
        field: "date_enregistrement",
        format: "YYYY-MM-DD",
      },
    },
  },
  rupco_etablissements: {
    download: {
      className: "MinioDownloader",
      bucket: "dgefp",
      fileMatch: /^RUPCO(.)*etablissement(.)*.csv$/,
      outputFileName: "rupco_etablissements.csv",
    },
    ingest: {
      className: "RupcoEtablissementsIngestor",
      table: "rupco_etablissements",
      filename: `${FILES_FOLDER}/rupco_etablissements.csv`,
      cols: [
        "numero",
        "type",
        "date_enregistrement",
        "siren",
        "date_jugement",
        "situation_juridique",
        "siren_etablissement",
        "effectif_etablissement",
        "siret",
        "nombre_de_ruptures_de_contrats_en_debut_de_procedure",
        "nombre_de_ruptures_de_contrats_en_fin_de_procedure",
      ],
      delimiter: ";",
      truncate: true,
      history: false,
      date: {
        field: "date_enregistrement",
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
        field: "mois",
        format: "YYYY-MM",
      },
    },
  },
};

module.exports = config;
