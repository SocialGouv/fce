import PropTypes from "prop-types";
import React from "react";

import Data from "../../components/DataSheets/Sections/SharedComponents/Data";
import { useRenderIfSiren } from "../../helpers/hoc/renderIfSiren";
import {
  getNumeroRna,
  isAssociation,
} from "../../utils/association/association";
import { useAssociationData } from "./Association.gql";

const Association = ({ siren }) => {
  const { loading, data, error } = useAssociationData(siren);
  const shouldNotRender = useRenderIfSiren({
    etablissement: data?.association,
    siren,
  });

  if (error || loading || shouldNotRender) {
    return null;
  }

  const { association } = data;
  console.log("Association -> association", association);

  return (
    <>
      <Data
        name="Association"
        value={isAssociation(association)}
        className="has-no-border"
      />
      {isAssociation(association) && (
        <Data
          name="Numéro RNA"
          value={getNumeroRna(association)}
          className="has-no-border"
        />
      )}
    </>
  );
};

Association.propTypes = {
  siren: PropTypes.string.isRequired,
};

export default Association;
