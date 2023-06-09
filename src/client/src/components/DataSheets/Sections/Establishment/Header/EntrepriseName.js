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
  const etb_raisonsociale = () => {
    if (!raisonSociale || raisonSociale?.length === 0) return "";
    return raisonSociale[0]?.etb_raisonsociale;
  };
  return (
    <>
      <Helmet>
        <title>
          {etb_raisonsociale
            ? `FCE - établissement ${etb_raisonsociale}`
            : "FCE - établissement"}
        </title>
      </Helmet>

      <h1 className="data-sheet-header__title">
        <Value value={etb_raisonsociale ? etb_raisonsociale : ""} empty=" " />
      </h1>
    </>
  );
};

EntrepriseName.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EntrepriseName);
