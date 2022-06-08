import PropTypes from "prop-types";
import React from "react";

import { Enterprise } from "../../components/DataSheets";
import LoadableContent from "../../components/shared/LoadableContent/LoadableContent";
import { useEntrepriseBySiren } from "../../services/Entreprise/hooks";

const EnterpriseContainer = ({ history, siren }) => {
  const { loading, data, error } = useEntrepriseBySiren(siren);

  return (
    <LoadableContent loading={loading} error={error}>
      <Enterprise
        enterprise={data}
        isLoaded={!loading}
        error={error}
        history={history}
      />
    </LoadableContent>
  );
};

EnterpriseContainer.propTypes = {
  history: PropTypes.object,
  siren: PropTypes.string,
};

export default EnterpriseContainer;
