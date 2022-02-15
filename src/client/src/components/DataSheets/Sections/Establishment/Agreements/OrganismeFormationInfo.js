import React from "react";
import * as PropTypes from "prop-types";
import Data from "../../SharedComponents/Data";
import {
  getDenomination,
  getDenominationOrganismeEtranger,
  getNumeroDeclaration,
  isOrganismeFormation
} from "../../../../../utils/organisme-formation/organisme-formation";

const OrganismeFormationInfo = ({ organismes_formation }) => {
  if (!isOrganismeFormation(organismes_formation)) {
    return null;
  }

  return (
    <>
      <Data
        name="Numéro de déclaration d'activité"
        value={getNumeroDeclaration(organismes_formation)}
      />

      <Data name="Dénomination" value={getDenomination(organismes_formation)} />

      <Data
        name="Dénomination de l'organisme étranger représenté"
        value={getDenominationOrganismeEtranger(organismes_formation)}
      />
    </>
  );
};

OrganismeFormationInfo.propTypes = {
  organismes_formation: PropTypes.arrayOf(PropTypes.object)
};

export default OrganismeFormationInfo;
