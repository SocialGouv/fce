export default async (SIRET, rows) => {
  return rows.getBySIRET(SIRET).then(pseRows => {
    if (!pseRows || pseRows.length === 0) {
      return {};
    }

    const pse = pseRows.map(pseRow => {
      return {
        numero_de_dossier: pseRow.numero_de_dossier
          ? pseRow.numero_de_dossier.trim()
          : null,
        type_de_dossier: pseRow.type_de_dossier
          ? pseRow.type_de_dossier.trim()
          : null,
        date_enregistrement: pseRow.date_d_enregistrement,
        etat_du_dossier: pseRow.etat_du_dossier
          ? pseRow.etat_du_dossier.trim()
          : null,
        accord_signe: pseRow.accord_signe,
        date_de_jugement: pseRow.date_de_jugement,
        situation_juridique: pseRow.situation_juridique
          ? pseRow.situation_juridique.trim()
          : null,
        siret: pseRow.siret,
        rupture_contrat_debut:
          pseRow.nombre_de_ruptures_de_contrats_en_debut_de_procedure,
        rupture_contrat_fin:
          pseRow.nombre_de_ruptures_de_contrats_en_fin_de_procedure
      };
    });

    return {
      pse: pse
    };
  });
};
