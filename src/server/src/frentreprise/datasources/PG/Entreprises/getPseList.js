export default async (SIREN, rows) => {
  return rows.getBySIREN(SIREN).then(pseRows => {
    if (!pseRows || !pseRows.length) {
      return {};
    }

    const pseObject = pseRows
      .map(pseRow => (typeof pseRow === "string" ? pseRow.trim() : pseRow))
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

    const pseArray = Object.values(pseObject);

    return {
      liste_pse: pseArray
    };
  });
};
