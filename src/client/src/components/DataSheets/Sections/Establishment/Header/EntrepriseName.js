import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";

import { renderIfSiren } from "../../../../../helpers/hoc/renderIfSiren";
import { getName } from "../../../../../utils/entreprise/entreprise";
import Value from "../../../../shared/Value";
import { useEntrepriseNameData, useRaisonSociale } from "./EntrepriseName.gql";

const EntrepriseName = ({ siren }) => {
  const raisonSocialeQuery = useRaisonSociale(siren);
  const entrepriseNameData = useEntrepriseNameData(siren);

  const name = raisonSocialeQuery.data || getName(entrepriseNameData);
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
