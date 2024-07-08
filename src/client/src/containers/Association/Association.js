import PropTypes from "prop-types";
import React from "react";

import Data from "../../components/DataSheets/Sections/SharedComponents/Data";
import { useRenderIfSiret } from "../../helpers/hoc/renderIfSiret";
import {
  getNumeroRna,
  isAssociation,
} from "../../utils/association/association";
import { useAssociationData } from "./Association.gql";

const Association = ({ siret }) => {
  const { loading, data, error } = useAssociationData(siret);
  const shouldNotRender = useRenderIfSiret({
    etablissement: data?.association,
    siret,
  });

  if (error || loading || shouldNotRender) {
    return null;
  }

  const { association } = data;
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
  siret: PropTypes.string.isRequired,
};

export default Association;
