/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.down = pgm => {};

exports.up = pgm => {
    pgm.dropTable("etablissements_accords");
    pgm.dropTable("etablissements_apprentissage");
    pgm.dropTable("communes");
    pgm.dropTable("departements");
    pgm.dropTable("naf");
    pgm.dropTable("last_dsn_effectif");
    pgm.dropTable("etablissements_dsn_effectif");
    pgm.dropTable("etablissements_dsn_eff");
    pgm.dropTable("import_updates");
    pgm.dropTable("etablissements_successions");
    pgm.dropTable("psi_siren");
    pgm.dropTable("psi_siret");
    pgm.dropTable("egapro_index");
    pgm.dropTable("etablissements");
    pgm.dropTable("etablissements_activite_partielle_historique");
    pgm.dropTable("etablissements_activite_partielle");
    pgm.dropTable("etablissements_contrats_aides");
    pgm.dropTable("etablissements_iae");
    pgm.dropTable("etablissements_idcc");
    pgm.dropTable("etablissements_uc_eff");
    pgm.dropTable("idcc");
    pgm.dropTable("interactions_pole_3e");
    pgm.dropTable("interactions_pole_3e_historique");
    pgm.dropTable("interactions_pole_3e_src");
    pgm.dropTable("interactions_pole_c");
    pgm.dropTable("interactions_pole_c_historique");
    pgm.dropTable("interactions_pole_t_historique");
    pgm.dropTable("interactions_pole_t");
    pgm.dropTable("organismes_formation");
    pgm.dropTable("poles_competitivite");
    pgm.dropTable("regions");
    pgm.dropTable("rupco_etablissements");
    pgm.dropTable("rupco_procedures");
    pgm.dropTable("wikit_uc");
    pgm.dropTable("entreprises");
    pgm.dropTable("categorie_juridique");
    pgm.dropTable("accidents_travail");

    

    


    


};
