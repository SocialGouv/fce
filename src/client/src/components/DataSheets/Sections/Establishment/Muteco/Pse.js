import PropTypes from "prop-types";
import React from "react";

import ConditionalData from "../../SharedComponents/ConditionalData";
import Subcategory from "../../SharedComponents/Subcategory";
import RupcoTable from "./RupcoTable";

const Pse = ({ pseList, siren, otherRupco }) => {
  const hasPse = !!(pseList && pseList.length);
  return (
    <Subcategory subtitle="PSE" sourceSi="SI PSE/RUPCO">
      <ConditionalData
        text="Procédure(s) enregistrée(s) au cours des 36 derniers mois"
        showTable={hasPse}
        className="has-no-border"
      />
      {hasPse && (
        <RupcoTable list={pseList} siren={siren} otherRupco={otherRupco} />
      )}
    </Subcategory>
  );
};

Pse.propTypes = {
  otherRupco: PropTypes.arrayOf(PropTypes.object),
  pseList: PropTypes.arrayOf(PropTypes.object),
  siren: PropTypes.string.isRequired,
};

export default Pse;
