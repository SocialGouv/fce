import React from "react";
import * as PropTypes from "prop-types";
import Data from "../../SharedComponents/Data";
import {
  getEffectifFormateur,
  getNombreStagiaires,
  getNombreStagiairesAutreOrganisme,
  isOrganismeFormation
} from "../../../../../utils/organisme-formation/organisme-formation";

const AgrementSpecialty = ({ organismes_formation }) => {
  if (!isOrganismeFormation(organismes_formation)) {
    return null;
  }

  return (
    <>
      <Data
        name="Nombre de stagiaires"
        value={getNombreStagiaires(organismes_formation)}
      />

      <Data
        name="Nombre de stagiaires confiés par un autre organisme"
        value={getNombreStagiairesAutreOrganisme(organismes_formation)}
      />

      <Data
        name="Effectif formateur"
        value={getEffectifFormateur(organismes_formation)}
      />
    </>
  );
};

AgrementSpecialty.propTypes = {
  organismes_formation: PropTypes.arrayOf(PropTypes.object)
};

export default AgrementSpecialty;
