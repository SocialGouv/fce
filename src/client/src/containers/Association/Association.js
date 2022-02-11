import PropTypes from "prop-types";
import React from "react";

import Data from "../../components/DataSheets/Sections/SharedComponents/Data";
import { useAssociationData } from "../../services/Entreprise/hooks";
import {
  getNumeroRna,
  isAssociation,
} from "../../utils/association/association";

const Association = ({ siret }) => {
  const { loading, data, error } = useAssociationData(siret);
  if (error || loading) {
    return null;
  }

  const { association } = data;

  return (
    <>
      <Data name="Association" value={isAssociation(association)} />
      {isAssociation(association) && (
        <Data name="Numéro RNA" value={getNumeroRna(association)} />
      )}
    </>
  );
};

Association.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default Association;
