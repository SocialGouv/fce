import PropTypes from "prop-types";
import React from "react";

import { Enterprise } from "../../components/DataSheets";
import LoadableContent from "../../components/shared/LoadableContent/LoadableContent";
import { useEntrepriseBySiren } from "../../services/Entreprise/hooks";

const EnterpriseContainer = ({ siren }) => {
  const { loading, data, error } = useEntrepriseBySiren(siren);

  return (
    <LoadableContent loading={loading} error={error}>
      {data && (
        <Enterprise enterprise={data} isLoaded={!loading} error={error} />
      )}{" "}
    </LoadableContent>
  );
};

EnterpriseContainer.propTypes = {
  siren: PropTypes.string.isRequired,
};

export default EnterpriseContainer;
