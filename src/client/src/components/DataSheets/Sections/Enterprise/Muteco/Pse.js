import PropTypes from "prop-types";
import React from "react";

import RupcoTable from "../../Enterprise/Muteco/RupcoTable";
import ConditionalData from "../../SharedComponents/ConditionalData";
import Subcategory from "../../SharedComponents/Subcategory";

const Pse = ({ pseList }) => {
  const hasPse = !!(pseList && pseList.length);

  return (
    <Subcategory subtitle="PSE" sourceSi="SI PSE/RUPCO">
      <ConditionalData
        text="Procédure(s) enregistrée(s) au cours des 36 derniers mois"
        showTable={hasPse}
      />
      {hasPse && <RupcoTable list={pseList} />}
    </Subcategory>
  );
};

Pse.propTypes = {
  pseList: PropTypes.arrayOf(PropTypes.object),
};

export default Pse;
