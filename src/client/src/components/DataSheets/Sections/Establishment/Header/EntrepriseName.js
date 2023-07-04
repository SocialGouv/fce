import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import Value from "../../../../shared/Value";
import { useRaisonSociale } from "./EntrepriseName.gql";

const EntrepriseName = ({ siret }) => {
  const { loading, data: raisonSociale, error } = useRaisonSociale(siret);
  if (loading || error) {
    return null;
  }
  return (
    <>
      <Helmet>
        <title>FCE - établissement {raisonSociale}</title>
      </Helmet>

      <h1 className="data-sheet-header__title">
        <Value value={raisonSociale.toLowerCase()} empty=" " />
      </h1>
    </>
  );
};

EntrepriseName.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EntrepriseName);
