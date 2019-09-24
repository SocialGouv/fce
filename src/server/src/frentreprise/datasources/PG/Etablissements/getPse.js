export default async (SIRET, PSE) => {
  return PSE.getBySIRET(SIRET).then(pse => {
    if (!pse || !pse.length) {
      return {};
    }

    const rupturecontratdebut = pse.map(pse => {
      return pse.rupturecontratdebut;
    });

    const rupturecontratfin = pse.map(pse => {
      return pse.rupturecontratfin;
    });

    return {
      pse: {
        rupturecontratdebut: rupturecontratdebut,
        rupturecontratfin: rupturecontratfin
      }
    };
  });
};
