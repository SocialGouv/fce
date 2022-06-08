import PropTypes from "prop-types";
import React from "react";

import Data from "../../SharedComponents/Data";
import { useTrancheEffectifsInsee } from "./TrancheEffectifsInsee.gql";

const TrancheEffectifsInsee = ({ siret }) => {
  const { data, loading, error } = useTrancheEffectifsInsee(siret);

  const text = loading ? "Chargement..." : error || data?.intitule;

  return (
    <Data
      name="Tranche Effectif INSEE"
      value={text}
      nonEmptyValue=""
      sourceCustom={`Sirène - ${data?.date_reference}`}
    />
  );
};

TrancheEffectifsInsee.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default TrancheEffectifsInsee;
