/* eslint-disable security/detect-non-literal-regexp */

const getYear = require("date-fns/getYear");
const subYears = require("date-fns/subYears");

const FILES_FOLDER = "/mnt/data/export";
const CONVERTER_XLSX_TO_CSV = "xlsxToCsv";
const CONVERTER_JSON_TO_CSV = "jsonToCsv";

const now = new Date();
const currentYear = getYear(now);
const lastYear = getYear(subYears(now, 1));

const config = {
  etablissements_dsn_effectif: {
    download: {
      className: "MinioDownloader",
      bucket: "dares",
      fileMatch: /^(.)*effectif(.)*.csv$/,
      outputFileName: "etablissements_dsn_effectif.csv",
    },
    ingest: {
      className: "EtablissementsDsnEffectifIngestor",
      table: "etablissements_dsn_effectif",
      filename: `${FILES_FOLDER}/etablissements_dsn_effectif.csv`,
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
      truncate: false,
      history: false,
      generateSiren: false,
      date: {
        field: "mois",
        format: "YYYY-MM",
      },
    },
  },
  accords: {
    download: {
      className: "MinioDownloader",
      bucket: "dgt",
      fileMatch: /^Daccord-Gestion-Extraction.*\.(txt|csv)$/,
      outputFileName: "accords.csv",
    },
    ingest: {
      table: "etablissements_accords",
      filename: `${FILES_FOLDER}/accords.csv`,
      cols: [
        "num_dos",
        "siret",
        "dt_sign",
        "epargne",
        "remuneration",
        "temps_travail",
        "conditions_travail",
        "emploi",
        "egalite_pro",
        "classifications",
        "formation",
        "protection_sociale",
        "droit_syndical",
        "autres",
        "nouvelles_technologies",
      ],
      delimiter: ";",
      truncate: true,
      generateSiren: true,
      history: false,
      date: {
        field: "dt_sign",
        format: "YYYY-MM-DD",
      },
    },
  },
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
      generateSiren: true,
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
      generateSiren: true,
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
      fileMatch: /^exportMSDC_src.*\.csv$/,
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
        "clos",
        "clos_automatiquement",
        "nature_controle",
        "cible_controle",
      ],
      delimiter: ";",
      truncate: true,
      history: false,
      generateSiren: true,
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
      generateSiren: true,
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
      fileMatch: /^APART_Extraction_FCE_S(.)*.csv$/,
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
      generateSiren: true,
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
      generateSiren: false,
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
      generateSiren: false,
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
      fileMatch: /^(.)*export_procedure(.)*.csv$/,
      outputFileName: "rupco_procedures.csv",
    },
    ingest: {
      className: "RupcoProceduresIngestor",
      table: "rupco_procedures",
      filename: `${FILES_FOLDER}/rupco_procedures.csv`,
      replaceHtmlChars: true,
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
      generateSiren: false,
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
      fileMatch: /^(.)*export_etablissement(.)*.csv$/,
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
      generateSiren: false,
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
      fileMatch: /^.*extractionFCE_dateDebutContratApresLe.*\.csv$/,
      outputFileName: "etablissements_apprentissage.csv",
    },
    ingest: {
      className: "ApprentissageIngestor",
      table: "etablissements_apprentissage",
      filename: `${FILES_FOLDER}/etablissements_apprentissage.csv`,
      cols: [
        "date_debut",
        "type_contrat",
        "numero_enregistrement",
        "siret",
        "date_rupture",
      ],
      delimiter: ";",
      truncate: true,
      history: false,
      generateSiren: true,
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
      generateSiren: true,
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
      generateSiren: true,
      date: {
        field: "mois",
        format: "YYYY-MM",
      },
    },
  },
  /**
   * == PSI ==
   * Table is truncated on current_year data ingestion :
   * => ingest psi_siren_current_year before psi_siren_last_year
   * => ingest psi_siret_current_year before psi_siret_last_year
   * */
  psi_siren_current_year: {
    download: {
      className: "PsiDownloader",
      bucket: "dgt",
      fileMatch: new RegExp(`^ClientsPSI-Siren-${currentYear}-\\d{8}.*\\.csv$`),
      outputFileName: `psi_siren_${currentYear}.csv`,
      writeUpdateDateToFile: true,
    },
    ingest: {
      className: "PsiIngestor",
      table: "psi_siren",
      filename: `${FILES_FOLDER}/psi_siren_${currentYear}.csv`,
      cols: ["siren", "salaries_annee_courante"],
      year: currentYear,
      delimiter: ";",
      truncate: true,
      history: false,
      generateSiren: false,
    },
  },
  psi_siret_current_year: {
    download: {
      className: "PsiDownloader",
      bucket: "dgt",
      fileMatch: new RegExp(`^ClientsPSI-Siret-${currentYear}-\\d{8}.*\\.csv$`),
      outputFileName: `psi_siret_${currentYear}.csv`,
    },
    ingest: {
      className: "PsiIngestor",
      table: "psi_siret",
      filename: `${FILES_FOLDER}/psi_siret_${currentYear}.csv`,
      cols: ["siret", "salaries_annee_courante"],
      year: currentYear,
      delimiter: ";",
      truncate: true,
      history: false,
      generateSiren: false,
    },
  },
  // ingest psi_siren_current_year first
  psi_siren_last_year: {
    download: {
      className: "PsiDownloader",
      bucket: "dgt",
      fileMatch: new RegExp(`^ClientsPSI-Siren-${lastYear}-\\d{8}.*\\.csv$`),
      outputFileName: `psi_siren_${lastYear}.csv`,
    },
    ingest: {
      className: "PsiLastYearIngestor",
      table: "psi_siren",
      filename: `${FILES_FOLDER}/psi_siren_${lastYear}.csv`,
      cols: ["siren", "salaries_annee_precedente"],
      year: lastYear,
      delimiter: ";",
      truncate: false,
      history: false,
      generateSiren: false,
    },
  },
  // ingest psi_siret_current_year first
  psi_siret_last_year: {
    download: {
      className: "PsiDownloader",
      bucket: "dgt",
      fileMatch: new RegExp(`^ClientsPSI-Siret-${lastYear}-\\d{8}.*\\.csv$`),
      outputFileName: `psi_siret_${lastYear}.csv`,
    },
    ingest: {
      className: "PsiLastYearIngestor",
      table: "psi_siret",
      filename: `${FILES_FOLDER}/psi_siret_${lastYear}.csv`,
      cols: ["siret", "salaries_annee_precedente"],
      year: lastYear,
      delimiter: ";",
      truncate: false,
      history: false,
      generateSiren: false,
    },
  },
};

module.exports = config;
