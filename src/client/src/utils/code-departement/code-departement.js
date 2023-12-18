const CORSE_DEP = ["2A", "2B"];
const CORSE_DEP_CODES = {
  "2A": ["2A", "20"],
  "2B": ["2B", "21"],
};

const getCodeDepartementForCorse = (codeDep) => {
  if (CORSE_DEP.includes(codeDep)) {
    return CORSE_DEP_CODES[codeDep];
  }

  return [codeDep];
};
export const normalizeCodeDepartement = (codedepartement) => {
  return codedepartement.flatMap(getCodeDepartementForCorse);
};
