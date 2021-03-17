/**
 * Remove useless keys in agreements data and sort:
 * - first by category ("Siège social" before "Etablissement secondaire")
 * - then by date
 */
export const formatEnterpriseAgreements = agreements => {
  const formatAgreements = agreements.fileNumbersBySiret.map(
    ({ siret, category, state, fileNumbers, count, lastSignatureDate }) => {
      return {
        siret,
        category,
        state,
        fileNumbers,
        count,
        lastSignatureDate
      };
    }
  );

  return formatAgreements.sort((a, b) => {
    if (a.category === "Siège social") return -1;
    if (b.category === "Siège social") return 1;

    if (!a.lastSignatureDate) return 1;
    if (!b.lastSignatureDate) return -1;

    return b.lastSignatureDate
      ? b.lastSignatureDate.localeCompare(a.lastSignatureDate)
      : -1;
  });
};

/**
 * Format establihsment agreements:
 * - group by theme
 * - get count and last signature date by theme
 */
export const formatEstablishmentAgreements = (agreements, siret) => {
  const establishment = agreements.fileNumbersBySiret.find(
    establishment => establishment.siret === siret
  );

  const establishmentAgreements = establishment?.fileNumbers
    .map(fileNumber =>
      agreements.agreementsList.find(
        agreement => agreement.num_dos === fileNumber
      )
    )
    .reduce(
      (acc, currentAgreement) => {
        Object.entries(currentAgreement).forEach(([key, value]) => {
          if (
            Object.prototype.hasOwnProperty.call(acc, key) &&
            typeof value === "number" &&
            value > 0
          ) {
            acc[key].count += 1;

            if (
              !acc[key].lastDate ||
              acc[key].lastDate < currentAgreement.dt_sign
            ) {
              acc[key].lastDate = currentAgreement.dt_sign;
            }
          }
        });
        return acc;
      },
      {
        autres: { count: 0, lastDate: null },
        classifications: { count: 0, lastDate: null },
        conditions_travail: { count: 0, lastDate: null },
        droit_syndical: { count: 0, lastDate: null },
        egalite_pro: { count: 0, lastDate: null },
        emploi: { count: 0, lastDate: null },
        epargne: { count: 0, lastDate: null },
        formation: { count: 0, lastDate: null },
        nouvelles_technologies: { count: 0, lastDate: null },
        protection_sociale: { count: 0, lastDate: null },
        remuneration: { count: 0, lastDate: null },
        temps_travail: { count: 0, lastDate: null }
      }
    );

  const lastSignatureDate = establishment?.lastSignatureDate;
  const count = establishment?.count;

  return { count, lastSignatureDate, agreements: establishmentAgreements };
};
