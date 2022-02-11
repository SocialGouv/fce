import PropTypes from "prop-types";
import React from "react";

import { Enterprise } from "../../components/DataSheets";
import { useEntrepriseBySiren } from "../../services/Entreprise/hooks";

const EnterpriseContainer = ({ history, siren }) => {
  const { loading, data, error } = useEntrepriseBySiren(siren);

  return (
    <Enterprise
      enterprise={data?.entreprises[0]}
      establishments={data?.entreprises[0]?.etablissements || []}
      isLoaded={!loading}
      error={error}
      history={history}
    />
  );
};

EnterpriseContainer.propTypes = {
  history: PropTypes.object,
  siren: PropTypes.string,
};

export default EnterpriseContainer;
