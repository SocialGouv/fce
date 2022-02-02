import React from "react";
import * as PropTypes from "prop-types";
import Data from "../../SharedComponents/Data";
import {
  getSpecialties,
  isOrganismeFormation
} from "../../../../../utils/organisme-formation/organisme-formation";

const OrganismeFormationSpecialty = ({ organismes_formation }) => {
  if (!isOrganismeFormation(organismes_formation)) {
    return null;
  }

  const data = getSpecialties(organismes_formation).join(", ");

  return (
    <>
      <Data name="Spécialité(s) de formation" value={data} />
    </>
  );
};

OrganismeFormationSpecialty.propTypes = {
  organismes_formation: PropTypes.arrayOf(PropTypes.object)
};

export default OrganismeFormationSpecialty;
