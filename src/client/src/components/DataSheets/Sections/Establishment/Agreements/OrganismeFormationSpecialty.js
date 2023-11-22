import * as PropTypes from "prop-types";
import React from "react";

import {
  getSpecialties,
  isOrganismeFormation,
} from "../../../../../utils/organisme-formation/organisme-formation";
import Data from "../../SharedComponents/Data";

const OrganismeFormationSpecialty = ({ organismes_formation }) => {
  if (!isOrganismeFormation(organismes_formation)) {
    return null;
  }

  const data = getSpecialties(organismes_formation).join(", ");

  return (
    <>
      <Data
        className="has-no-border"
        name="Spécialité(s) de formation"
        value={data}
      />
    </>
  );
};

OrganismeFormationSpecialty.propTypes = {
  organismes_formation: PropTypes.arrayOf(PropTypes.object),
};

export default OrganismeFormationSpecialty;
