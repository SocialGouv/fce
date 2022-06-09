import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";

import { renderIfSiren } from "../../../../../helpers/hoc/renderIfSiren";
import { getName } from "../../../../../utils/entreprise/entreprise";
import Value from "../../../../shared/Value";
import { useEntrepriseNameData, useRaisonSociale } from "./EntrepriseName.gql";

const EntrepriseName = ({ siren }) => {
  const { data: raisonSociale } = useRaisonSociale(siren);
  const { data: entreprise } = useEntrepriseNameData(siren);
  const name = raisonSociale || getName(entreprise);
  return (
    <>
      <Helmet>
        <title>FCE - établissement {name}</title>
      </Helmet>

      <h1 className="data-sheet-header__title">
        <Value value={name} empty=" " />
      </h1>
    </>
  );
};

EntrepriseName.propTypes = {
  siren: PropTypes.string.isRequired,
};

export default renderIfSiren(EntrepriseName);
