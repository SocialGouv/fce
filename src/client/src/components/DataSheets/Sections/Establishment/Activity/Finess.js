import PropTypes from "prop-types";
import React from "react";

import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import { useFinessEstablishment } from "./Finess.gql";

const Finess = ({ siret }) => {
  const { loading, data: finess, error } = useFinessEstablishment(siret);
  if (loading || error || !finess) {
    return null;
  }

  const finessEJ = finess.Numero_FINESS_EJ ?? "Pas de données Finess Juridique";
  const finessET =
    finess.Numero_FINESS_ET ?? "Pas de données Finess Etablissement";

  return (
    <Subcategory subtitle="Finess" sourceSi="DataGouv">
      <Data
        name="Finess Juridique"
        value={finessEJ}
        emptyValue=""
        className="has-no-border"
      />
      <Data
        name="Finess Etablissement"
        value={finessET}
        emptyValue=""
        className="has-no-border"
      />
    </Subcategory>
  );
};

Finess.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default Finess;
