import React from "react";
import * as PropTypes from "prop-types";
import Data from "../../SharedComponents/Data";
import {
  hasActionFormationParApprentissage,
  hasActionsFormation,
  hasBilanCompetence,
  hasVae,
  isOrganismeFormation
} from "../../../../../utils/organisme-formation/organisme-formation";

const OrganismeFormationTypes = ({ organismes_formation }) => {
  if (!isOrganismeFormation(organismes_formation)) {
    return null;
  }

  const data = {
    "Actions de formations": hasActionsFormation(organismes_formation),
    "Bilan de compétences": hasBilanCompetence(organismes_formation),
    VAE: hasVae(organismes_formation),
    Apprentissage: hasActionFormationParApprentissage(organismes_formation)
  };

  const content = Object.entries(data)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(", ");

  return (
    <>
      <Data name="Types de certifications" value={content} />
    </>
  );
};

OrganismeFormationTypes.propTypes = {
  organismes_formation: PropTypes.arrayOf(PropTypes.object)
};

export default OrganismeFormationTypes;
