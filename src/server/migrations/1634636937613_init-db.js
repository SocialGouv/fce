/* eslint-disable camelcase */
const { PgLiteral } = require("node-pg-migrate");
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("api_keys", {
    activated: { notNull: true, type: "bool" },
    createdAt: { default: pgm.func("now()"), notNull: true, type: "timestamp" },
    key: { notNull: true, type: "varchar(64)" },
  });

  pgm.createTable("auth_temporary", {
    activated: { notNull: true, type: "bool" },
    createdAt: { default: pgm.func("now()"), notNull: true, type: "timestamp" },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
  });

  pgm.createTable("authentification_requests", {
    code: "varchar(5)",
    created_at: { default: pgm.func("now()"), notNull: true, type: "timestamp" },
    email: { notNull: true, type: "varchar(255)" },
    failures: { default: "0", notNull: true, type: "int2" },
    id: "id",
  });
  pgm.createIndex("authentification_requests", "code");
  pgm.createIndex("authentification_requests", "email");

  pgm.createTable("categorie_juridique", {
    code: { notNull: true, type: "varchar(4)", unique: true },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    libelle: { notNull: true, type: "varchar" },
  });

  pgm.createTable("communes", {
    code_insee: { notNull: true, type: "bpchar" },
    code_postal: { notNull: true, type: "bpchar" },
    id: "id",
    lattitude: "float8",
    longitude: "float8",
    nom: { notNull: true, type: "varchar(255)" },
  });
  pgm.createIndex("communes", "code_insee");
  pgm.createIndex("communes", "code_postal");

  pgm.createTable("departements", {
    code: { notNull: true, type: "varchar(3)" },
    id: "id",
    nom: { notNull: true, type: "varchar(255)" },
  });
  pgm.createIndex("departements", "code");

  pgm.createTable("document_associations_cache", {
    createdAt: { default: pgm.func("now()"), notNull: true, type: "timestamp" },
    siret: { notNull: true, type: "varchar(20)" },
    value: { notNull: true, type: "text" },
  });
  pgm.createIndex("document_associations_cache", "siret");

  pgm.createTable("entreprises", {
    datecreationunitelegale: "date",
    prenom1unitelegale: "varchar(20)",
    identifiantassociationunitelegale: "varchar(10)",
    prenom2unitelegale: "varchar(20)",
    anneeeffectifsunitelegale: "varchar(4)",
    sexeunitelegale: "varchar(1)",
    datederniertraitementunitelegale: "date",
    siren: { notNull: true, type: "varchar(9)", unique: true },
    categorieentreprise: "varchar(3)",
    statutdiffusionunitelegale: "varchar(1)",
    anneecategorieentreprise: "varchar(4)",
    unitepurgeeunitelegale: "varchar(5)",
    datedebut: "date",
    sigleunitelegale: "varchar(20)",
    denominationunitelegale: "varchar(120)",
    prenom3unitelegale: "varchar(20)",
    denominationusuelle1unitelegale: "varchar(70)",
    prenom4unitelegale: "varchar(20)",
    categoriejuridiqueunitelegale: "varchar(4)",
    pseudonymeunitelegale: "varchar(100)",
    activiteprincipaleunitelegale: "varchar(6)",
    trancheeffectifsunitelegale: "varchar(2)",
    denominationusuelle2unitelegale: "varchar(70)",
    caractereemployeurunitelegale: "varchar(1)",
    nombreperiodesunitelegale: "int2",
    denominationusuelle3unitelegale: "varchar(70)",
    etatadministratifunitelegale: "varchar(1)",
    economiesocialesolidaireunitelegale: "varchar(1)",
    nomunitelegale: "varchar(100)",
    nicsiegeunitelegale: "varchar(5)",
    nomusageunitelegale: "varchar(100)",
    nomenclatureactiviteprincipaleunitelegale: "varchar(8)",
    prenomusuelunitelegale: "varchar(20)",
  });

  pgm.createTable("etablissements", {
    activiteprincipaleregistremetiersetablissement: "varchar(6)",
    anneeeffectifsetablissement: "varchar(4)",
    datecreationetablissement: "date",
    complementadresseetablissement: "varchar(38)",
    datederniertraitementetablissement: "date",
    etablissementsiege: "varchar(5)",
    nic: "varchar(5)",
    indicerepetitionetablissement: "varchar(1)",
    siren: { notNull: true, type: "varchar(9)" },
    codepostaletablissement: "varchar(5)",
    siret: { notNull: true, type: "varchar(14)", unique: true },
    distributionspecialeetablissement: "varchar(26)",
    statutdiffusionetablissement: "varchar(1)",
    codecedexetablissement: "varchar(9)",
    trancheeffectifsetablissement: "varchar(2)",
    codecommuneetablissement: "varchar(5)",
    codepaysetrangeretablissement: "varchar(5)",
    libellevoieetablissement: "varchar(100)",
    complementadresse2etablissement: "varchar(38)",
    nombreperiodesetablissement: "int2",
    indicerepetition2etablissement: "varchar(1)",
    numerovoieetablissement: "varchar(5)",
    codepostal2etablissement: "varchar(5)",
    typevoieetablissement: "varchar(4)",
    distributionspeciale2etablissement: "varchar(26)",
    libellecommuneetablissement: "varchar(100)",
    codecedex2etablissement: "varchar(9)",
    libellecommuneetrangeretablissement: "varchar(100)",
    codecommune2etablissement: "varchar(5)",
    libellecedexetablissement: "varchar(100)",
    codepaysetranger2etablissement: "varchar(5)",
    libellepaysetrangeretablissement: "varchar(100)",
    datedebut: "date",
    libellevoie2etablissement: "varchar(100)",
    enseigne1etablissement: "varchar(50)",
    numerovoie2etablissement: "varchar(5)",
    denominationusuelleetablissement: "varchar(100)",
    typevoie2etablissement: "varchar(4)",
    activiteprincipaleetablissement: "varchar(6)",
    libellecommune2etablissement: "varchar(100)",
    caractereemployeuretablissement: "varchar(1)",
    libellecommuneetranger2etablissement: "varchar(100)",
    appsearch_indexed: { default: "false", notNull: true, type: "bool" },
    enseigne2etablissement: "varchar(50)",
    enseigne3etablissement: "varchar(50)",
    libellecedex2etablissement: "varchar(100)",
    etatadministratifetablissement: "varchar(1)",
    libellepaysetranger2etablissement: "varchar(100)",
    nomenclatureactiviteprincipaleetablissement: "varchar(8)",
  });
  pgm.createIndex("etablissements", "siren");

  pgm.createTable("etablissements_activite_partielle_historique", {
    cause: "varchar(100)",
    da_init: "varchar(3)",
    date_decision: "varchar(30)",
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    nb_h_auto_avn: "numeric",
    nb_h_auto_cum: "numeric",
    nb_h_conso_cum: "numeric",
    num_convention: "varchar(50)",
    num_avenant: "int2",
    siret: "varchar(20)",
  });
  pgm.createIndex("etablissements_activite_partielle_historique", "siret");

  pgm.createTable("etablissements_contrats_aides", {
    CA_contrat_2018: { default: "0", notNull: true, type: "integer" },
    CA_entree_2018: { default: "0", notNull: true, type: "integer" },
    CA_stock_12_2018: { default: "0", notNull: true, type: "integer" },
    contrat_aide: { default: "false", notNull: true, type: "bool" },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    siren: { default: null, notNull: false, type: "varchar(9)" },
    siret: { notNull: true, type: "varchar(20)" },
  });
  pgm.createIndex("etablissements_contrats_aides", "siren");
  pgm.createIndex("etablissements_contrats_aides", "siret");

  pgm.createTable("etablissements_iae", {
    ACI: { default: "false", notNull: true, type: "bool" },
    ACI_SI2018: { default: "0", notNull: true, type: "integer" },
    ACI_ETP2018: { default: 0, type: "numeric", notNull: true },
    AI: { default: "false", notNull: true, type: "bool" },
    AI_ETP2018: { default: 0, notNull: true, type: "numeric" },
    AI_SI2018: { default: "0", notNull: true, type: "integer" },
    EI: { default: "false", notNull: true, type: "bool" },
    EI_ETP2018: { default: 0, notNull: true, type: "numeric" },
    EI_SI2018: { default: "0", notNull: true, type: "integer" },
    siret: { type: "varchar(20)", notNull: true },
    ETTI: { default: "false", notNull: true, type: "bool" },
    ETTI_ETP2018: { default: 0, notNull: true, type: "numeric" },
    ETTI_SI2018: { default: "0", notNull: true, type: "integer" },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    siren: { default: null, notNull: false, type: "varchar(9)" },
  });
  pgm.createIndex("etablissements_iae", "siren");
  pgm.createIndex("etablissements_iae", "siret");

  pgm.createTable("etablissements_idcc", {
    date_maj: { default: null, notNull: false, type: "varchar(30)" },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    idcc: { notNull: true, type: "bpchar" },
    mois: { default: null, notNull: false, type: "varchar(30)" },
    siren: { default: null, notNull: false, type: "varchar(9)" },
    siret: { notNull: true, type: "varchar(20)" },
  });
  pgm.createIndex("etablissements_idcc", "siren");
  pgm.createIndex("etablissements_idcc", "siret");

  pgm.createTable("etablissements_successions", {
    continuiteeconomique: { notNull: true, type: "bool" },
    datederniertraitementliensuccession: { notNull: true, type: "timestamp" },
    dateliensuccession: { notNull: true, type: "date" },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    siretetablissementpredecesseur: { notNull: true, type: "varchar(20)" },
    siretetablissementsuccesseur: { notNull: true, type: "varchar(20)" },
    transfertsiege: { notNull: true, type: "bool" },
  });
  pgm.createIndex(
    "etablissements_successions",
    "siretetablissementpredecesseur"
  );
  pgm.createIndex("etablissements_successions", "siretetablissementsuccesseur");

  pgm.createTable("etablissements_uc_eff", {
    cod_section: "varchar(5)",
    date_effphy_et: "varchar(30)",
    dereffphy: "integer",
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    nme_ddtefp3: "varchar(3)",
    nme_region: "varchar(5)",
    siren: { default: null, notNull: false, type: "varchar(9)" },
    siret: { notNull: true, type: "varchar(20)" },
    source_effphy_et: "integer",
  });
  pgm.createIndex("etablissements_uc_eff", "siren");
  pgm.createIndex("etablissements_uc_eff", "siret");

  pgm.createTable("etablissements_apprentissage", {
    date_debut: "varchar(30)",
    date_rupture: "varchar(30)",
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    numero_enregistrement: "varchar(50)",
    siren: { default: null, notNull: false, type: "varchar(9)" },
    siret: "varchar(20)",
    type_contrat: "integer",
  });
  pgm.createIndex("etablissements_apprentissage", "siren");
  pgm.createIndex("etablissements_apprentissage", "siret");

  pgm.createTable("etablissements_dsn_eff", {
    cdd: { default: "0", notNull: false, type: "integer" },
    cdi: { default: "0", notNull: false, type: "integer" },
    cdi_inter: { default: "0", notNull: false, type: "integer" },
    date_maj: { default: null, notNull: false, type: "varchar(30)" },
    eff: { notNull: true, type: "integer" },
    femmes: { default: "0", notNull: false, type: "integer" },
    hommes: { default: "0", notNull: false, type: "integer" },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    inter_mission: { default: "0", notNull: false, type: "integer" },
    siret: { type: "varchar(20)", notNull: true },
    interim: { default: "0", notNull: false, type: "integer" },
    mois: "varchar(30)",
    siren: { default: null, notNull: false, type: "varchar(9)" },
  });
  pgm.createIndex("etablissements_dsn_eff", "siren");
  pgm.createIndex("etablissements_dsn_eff", "siret");

  pgm.createTable("etablissements_dsn_effectif", {
    cdd: { default: "0", notNull: false, type: "integer" },
    cdi: { default: "0", notNull: false, type: "integer" },
    cdi_inter: { default: "0", notNull: false, type: "integer" },
    date_maj: { default: null, notNull: false, type: "varchar(30)" },
    eff: "integer",
    femmes: { default: "0", notNull: false, type: "integer" },
    hommes: { default: "0", notNull: false, type: "integer" },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    inter_mission: { default: "0", notNull: false, type: "integer" },
    siret: { type: "varchar(20)", default: null, notNull: false },
    interim: { default: "0", notNull: false, type: "integer" },
    mois: { type: "varchar(30)", default: null, notNull: false },
  });
  pgm.createIndex("etablissements_dsn_effectif", "siret");

  pgm.createTable("etablissements_accords", {
    conditions_travail: "integer",
    classifications: "integer",
    dt_sign: "varchar(30)",
    droit_syndical: "integer",
    egalite_pro: "integer",
    autres: "integer",
    epargne: "integer",
    emploi: "integer",
    num_dos: "varchar(12)",
    formation: "integer",
    siret: { type: "varchar(20)", notNull: true },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    remuneration: "integer",
    nouvelles_technologies: "integer",
    temps_travail: "integer",
    protection_sociale: "integer",
    siren: { default: null, notNull: false, type: "varchar(9)" },
  });
  pgm.createIndex("etablissements_accords", "siren");
  pgm.createIndex("etablissements_accords", "siret");

  pgm.createTable("idcc", {
    code: { notNull: true, type: "bpchar", unique: true },
    id: "id",
    libelle: { notNull: true, type: "varchar" },
  });

  pgm.createTable("import_updates", {
    date: "timestamp",
    date_import: "timestamp",
    fournisseur: { notNull: true, type: "varchar(50)" },
    si: { notNull: true, type: "varchar(50)" },
    table: { notNull: true, type: "varchar(50)" },
  });
  pgm.createIndex("import_updates", "si");
  pgm.createIndex("import_updates", "table");

  pgm.createTable("interactions_pole_3e_historique", {
    date_visite: "varchar(30)",
    filieres: "varchar(255)",
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    inspecteurs: "varchar(255)",
    region: "varchar(100)",
    siret: { notNull: true, type: "varchar(20)" },
    suivi_eti: "varchar(255)",
    type_suivi: "varchar(255)",
  });
  pgm.createIndex("interactions_pole_3e_historique", "siret");

  pgm.createTable("interactions_pole_3e", {
    date_visite: "varchar(30)",
    filieres: "varchar(255)",
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    inspecteurs: "varchar(255)",
    region: "varchar(100)",
    siren: { default: null, notNull: false, type: "varchar(9)" },
    siret: "varchar(20)",
    suivi_eti: "varchar(255)",
    type_suivi: "varchar(255)",
  });
  pgm.createIndex("interactions_pole_3e", "siren");
  pgm.createIndex("interactions_pole_3e", "siret");

  pgm.createTable("interactions_pole_3e_src", {
    date: { default: null, notNull: false, type: "varchar(30)" },
    clos: { default: null, type: "varchar(3)", notNull: false },
    date_creation: "varchar(30)",
    clos_automatiquement: { default: null, notNull: false, type: "varchar(3)" },
    libelle_region: { default: null, type: "varchar(255)", notNull: false },
    cible_controle: { default: null, notNull: false, type: "varchar(255)" },
    numero_dossier: "varchar(20)",
    date_cloture: { default: null, notNull: false, type: "varchar(30)" },
    region: "varchar(2)",
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    siret: "varchar(30)",
    nature_controle: { default: null, notNull: false, type: "varchar(255)" },
    type_controle: "varchar(50)",
    numero_etablissement: { default: null, type: "varchar(5)", notNull: false },
    siren: { default: null, notNull: false, type: "varchar(9)" },
  });
  pgm.createIndex("interactions_pole_3e_src", "siren");
  pgm.createIndex("interactions_pole_3e_src", "siret");

  pgm.createTable("interactions_pole_c", {
    annee: "varchar(4)",
    date: "varchar(10)",
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    jour: "varchar(2)",
    messagerie: "varchar(255)",
    mois: "varchar(10)",
    siren: { default: null, notNull: false, type: "varchar(9)" },
    siret: { notNull: true, type: "varchar(20)" },
    suite: "bool",
    unite: "varchar(255)",
  });
  pgm.createIndex("interactions_pole_c", "siren");
  pgm.createIndex("interactions_pole_c", "siret");

  pgm.createTable("interactions_pole_c_historique", {
    annee: "varchar(4)",
    date: "varchar(10)",
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    jour: "varchar(2)",
    messagerie: "varchar(255)",
    mois: "varchar(10)",
    siret: { notNull: true, type: "varchar(20)" },
    suite: "bool",
    unite: "varchar(255)",
  });
  pgm.createIndex("interactions_pole_c_historique", "siret");

  pgm.createTable("interactions_pole_t_historique", {
    action_sur: "varchar(255)",
    date: "varchar(30)",
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    intervenant: "varchar(255)",
    realise_pour: "varchar(255)",
    siret: { notNull: true, type: "varchar(20)" },
    type_intervention: "varchar(255)",
  });
  pgm.createIndex("interactions_pole_t_historique", "siret");

  pgm.createTable("last_dsn_effectif", {
    effectif: "integer",
    id: "id",
    mois: { default: null, notNull: false, type: "varchar(30)" },
    siret: { default: null, notNull: false, type: "varchar(20)" },
    trancheeffectifsetablissement: "varchar(20)",
  });

  pgm.createTable("mailing_list", {
    email: { notNull: true, type: "varchar(255)", unique: true },
    hash: "varchar(60)",
    id: "id",
    subscription_date: { default: pgm.func("now()"), notNull: true, type: "timestamp" },
  });

  pgm.createTable("matomo_user_id", {
    createdAt: { default: pgm.func("now()"), notNull: true, type: "timestamp" },
    user_id: { notNull: true, type: "varchar(120)", unique: true },
  });

  pgm.createTable("naf", {
    code: { notNull: true, type: "varchar(6)", unique: true },
    id: "id",
    libelle: { notNull: true, type: "varchar(255)" },
    nomenclature: "varchar(20)",
    recherche: { default: "true", notNull: true, type: "bool" },
  });

  pgm.createTable("poles_competitivite", {
    designation_pole: { notNull: true, type: "varchar(255)" },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    siren: { default: null, notNull: false, type: "varchar(9)" },
    siret: { notNull: true, type: "varchar(20)" },
  });
  pgm.createIndex("poles_competitivite", "siren");
  pgm.createIndex("poles_competitivite", "siret");

  pgm.createTable("regions", {
    code: { notNull: true, type: "varchar(2)" },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    nom: { notNull: true, type: "varchar(255)" },
  });
  pgm.createIndex("regions", "code");

  pgm.createTable("rupco_procedures", {
    date_enregistrement: "varchar(25)",
    date_jugement: "varchar(10)",
    effectif_entreprise: "integer",
    effectif_groupe: "integer",
    etat: "varchar(100)",
    historique_si: { default: "false", notNull: true, type: "bool" },
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    nom_groupe: "varchar(255)",
    numero: "integer",
    siren: "varchar(9)",
    type: "varchar(150)",
    situation_juridique: "varchar(100)",
  });
  pgm.createIndex("rupco_procedures", "numero");
  pgm.createIndex("rupco_procedures", "siren");

  pgm.createTable("users_feedback", {
    comment: "text",
    createdAt: { default: pgm.func("now()"), notNull: true, type: "timestamp" },
    id: "id",
    rate: { default: "''::bpchar", notNull: true, type: "bpchar" },
    referer: { default: "NULL::bpchar", notNull: false, type: "bpchar" },
    useful: { notNull: true, type: "bool" },
  });

  pgm.createTable("wikit_uc", {
    code: "varchar(6)",
    email: "varchar(255)",
    libelle: "varchar(255)",
  });
  pgm.createIndex("wikit_uc", "code");

  pgm.createTable("psi_siret", {
    id: "id",
    salaries_annee_courante: "integer",
    salaries_annee_precedente: "integer",
    siret: { notNull: true, type: "varchar(20)", unique: true },
  });

  pgm.createTable("psi_siren", {
    id: "id",
    salaries_annee_courante: "integer",
    salaries_annee_precedente: "integer",
    siren: { notNull: true, type: "varchar(20)", unique: true },
  });

  pgm.createTable("rupco_etablissements", {
    date_enregistrement: "varchar(25)",
    date_jugement: "varchar(10)",
    effectif_etablissement: "integer",
    historique_si: { default: "false", type: "bool", notNull: true },
    nombre_de_ruptures_de_contrats_en_debut_de_procedure: "integer",
    id: {
      notNull: true,
      default: new PgLiteral("uuid_generate_v4()"),
      type: "uuid",
    },
    numero: "integer",
    nombre_de_ruptures_de_contrats_en_fin_de_procedure: "integer",
    siren: "varchar(9)",
    siren_etablissement: "varchar(9)",
    type: "varchar(150)",
    siret: "varchar(14)",
    situation_juridique: "varchar(100)",
  });
  pgm.createIndex("rupco_etablissements", "numero");
  pgm.createIndex("rupco_etablissements", "siren");
  pgm.createIndex("rupco_etablissements", "siret");

  pgm.createTable("valid_email", {
    email: { notNull: true, type: "text", unique: true },
    structure: "varchar(10)",
  });

  pgm.createTable("etablissements_activite_partielle", {
    cause: "varchar(100)",
    da_init: "varchar(3)",
    date_decision: "varchar(30)",
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    nb_h_auto_avn: "numeric",
    nb_h_auto_cum: "numeric",
    nb_h_conso_cum: "numeric",
    num_convention: "varchar(50)",
    num_avenant: "int2",
    siret: "varchar(20)",
    siren: { default: null, notNull: false, type: "varchar(9)" },
  });
  pgm.createIndex("etablissements_activite_partielle", "siren");
  pgm.createIndex("etablissements_activite_partielle", "siret");

  pgm.createTable("interactions_pole_t", {
    action_sur: "varchar(255)",
    date: "varchar(30)",
    id: {
      default: new PgLiteral("uuid_generate_v4()"),
      notNull: true,
      type: "uuid",
    },
    intervenant: "varchar(255)",
    realise_pour: "varchar(255)",
    siren: { default: null, notNull: false, type: "varchar(9)" },
    siret: "varchar(20)",
    type_intervention: "varchar(255)",
  });
  pgm.createIndex("interactions_pole_t", "siret");
  pgm.createIndex("interactions_pole_t", "siren");
};
exports.down = (pgm) => {
  pgm.dropTable("api_keys");

  pgm.dropTable("auth_temporary");

  pgm.dropTable("authentification_requests");

  pgm.dropTable("categorie_juridique");

  pgm.dropTable("communes");

  pgm.dropTable("departements");

  pgm.dropTable("document_associations_cache");

  pgm.dropTable("entreprises");

  pgm.dropTable("etablissements");

  pgm.dropTable("etablissements_activite_partielle_historique");

  pgm.dropTable("etablissements_contrats_aides");

  pgm.dropTable("etablissements_iae");

  pgm.dropTable("etablissements_idcc");

  pgm.dropTable("etablissements_successions");

  pgm.dropTable("etablissements_uc_eff");

  pgm.dropTable("etablissements_apprentissage");

  pgm.dropTable("etablissements_dsn_eff");

  pgm.dropTable("etablissements_dsn_effectif");

  pgm.dropTable("etablissements_accords");

  pgm.dropTable("idcc");

  pgm.dropTable("import_updates");

  pgm.dropTable("interactions_pole_3e_historique");

  pgm.dropTable("interactions_pole_3e");

  pgm.dropTable("interactions_pole_3e_src");

  pgm.dropTable("interactions_pole_c");

  pgm.dropTable("interactions_pole_c_historique");

  pgm.dropTable("interactions_pole_t_historique");

  pgm.dropTable("last_dsn_effectif");

  pgm.dropTable("mailing_list");

  pgm.dropTable("matomo_user_id");

  pgm.dropTable("naf");

  pgm.dropTable("poles_competitivite");

  pgm.dropTable("regions");

  pgm.dropTable("rupco_procedures");

  pgm.dropTable("users_feedback");

  pgm.dropTable("wikit_uc");

  pgm.dropTable("psi_siret");

  pgm.dropTable("psi_siren");

  pgm.dropTable("rupco_etablissements");

  pgm.dropTable("valid_email");

  pgm.dropTable("etablissements_activite_partielle");

  pgm.dropTable("interactions_pole_t");
};
