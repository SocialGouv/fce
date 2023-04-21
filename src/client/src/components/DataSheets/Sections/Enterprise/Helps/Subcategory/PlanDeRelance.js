import PropTypes from "prop-types";
import React from "react";

import { renderIfSiren } from "../../../../../../helpers/hoc/renderIfSiren";
import { getMesure } from "../../../../../../utils/entreprise/entreprise";
import Data from "../../../SharedComponents/Data";
import Subcategory from "../../../SharedComponents/Subcategory";
import { usePlanRelanceBySiren } from "./PlanDeRelance.gql";

const PlanDeRelance = ({ entreprise: { siren } }) => {
  const {
    data: planRelanceData,
    loading,
    error,
  } = usePlanRelanceBySiren(siren);

  if (loading || error) {
    return null;
  }

  return (
    <>
      <Subcategory subtitle="Plan de relance" sourceSi="PlanRelance">
        <Data
          name="Plan de relance"
          value={planRelanceData ? getMesure(planRelanceData) : "Non"}
        />
      </Subcategory>
    </>
  );
};

PlanDeRelance.propTypes = {
  entreprise: PropTypes.shape({
    siren: PropTypes.string,
  }),
};

export default renderIfSiren(PlanDeRelance);
