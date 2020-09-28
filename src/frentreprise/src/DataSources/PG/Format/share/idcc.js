import _uniqWith from "lodash.uniqwith";
import _isEqual from "lodash.isequal";

const CODE_SANS_CONVENTION_COLLECTIVE = "9999";

export default ({ idccs }) => {
  const idccList = idccs
    .filter(
      ({ idcc, idccDefinition }) =>
        idcc !== CODE_SANS_CONVENTION_COLLECTIVE && idccDefinition
    )
    .map(({ idccDefinition: { code, libelle } }) => ({
      code,
      libelle,
    }));

  return { idcc: _uniqWith(idccList, _isEqual) };
};
