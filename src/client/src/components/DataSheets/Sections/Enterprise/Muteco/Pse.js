import React from "react";
import PropTypes from "prop-types";
import Subcategory from "../../SharedComponents/Subcategory";
import ConditionalData from "../../SharedComponents/ConditionalData";
import RupcoTable from "../../Enterprise/Muteco/RupcoTable";

const Pse = ({ enterprise: { pse: pseList } }) => {
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
  enterprise: PropTypes.object.isRequired
};

export default Pse;
