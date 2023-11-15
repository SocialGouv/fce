import PropTypes from "prop-types";
import React from "react";

import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import { useSevesoEstablishment } from "./Seveso.gql";

const Seveso = ({ siret }) => {
  const { loading, data: seveso, error } = useSevesoEstablishment(siret);
  if (loading || error) {
    return null;
  }

  const seuil = seveso ?? "Non Seveso";

  return (
    <Subcategory subtitle="Seveso" sourceSi="installationclassees">
      <Data
        name="Niveau Seveso"
        value={seuil}
        emptyValue=""
        className="has-no-border"
      />
    </Subcategory>
  );
};

Seveso.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default Seveso;
