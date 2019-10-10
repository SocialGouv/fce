export default async (SIREN, rows) => {
  return rows.getBySIREN(SIREN).then(pseRows => {
    if (!pseRows || !pseRows.length) {
      return {};
    }

    const pseObject = pseRows
      .map(pseRow => {
        [
          "numero_de_dossier",
          "type_de_dossier",
          "etat_du_dossier",
          "situation_juridique",
          "siret"
        ].forEach(field => {
          pseRow[field] =
            typeof pseRow[field] === "string" && pseRow[field].trim();
        });

        return pseRow;
      })
      .reduce((acc, currentPse) => {
        const establishmentList =
          (acc[currentPse.numero_de_dossier] &&
            acc[currentPse.numero_de_dossier]["establishments"]) ||
          [];

        const isEtablishmentInList = establishmentList.findIndex(
          establishment => establishment.siret === currentPse.siret
        );

        const {
          siret,
          contrats_ruptures_debut,
          contrats_ruptures_fin,
          ...dossier
        } = currentPse;

        return {
          ...acc,
          [dossier.numero_de_dossier]: {
            dossier: { ...dossier },
            establishments: isEtablishmentInList
              ? [
                  ...establishmentList,
                  {
                    siret,
                    contrats_ruptures_debut,
                    contrats_ruptures_fin
                  }
                ]
              : establishmentList
          }
        };
      }, {});

    const pseArray = Object.values(pseObject).map(pse => pse);

    return {
      liste_pse: pseArray
    };
  });
};
