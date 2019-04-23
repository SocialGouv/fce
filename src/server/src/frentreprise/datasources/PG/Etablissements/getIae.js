export default async (SIRET, Iae) => {
  return Iae.getBySIRET(SIRET).then(iae => {
    if (!iae) {
      return null;
    }

    return {
      agrements_iae: {
        ei: {
          agrement: iae.EI,
          salariesInsertion: iae.EI_SI2018,
          etp: iae.EI_ETP2018
        },
        aci: {
          agrement: iae.ACI,
          salariesInsertion: iae.ACI_SI2018,
          etp: iae.ACI_ETP2018
        },
        ai: {
          agrement: iae.AI,
          salariesInsertion: iae.AI_SI2018,
          etp: iae.AI_ETP2018
        },
        etti: {
          agrement: iae.ETTI,
          salariesInsertion: iae.ETTI_SI2018,
          etp: iae.ETTI_ETP2018
        }
      }
    };
  });
};
