import React from "react";
import PropTypes from "prop-types";
import ConditionalData from "../../SharedComponents/ConditionalData";
import Subcategory from "../../SharedComponents/Subcategory";
import RupcoTable from "./RupcoTable";

const Pse = ({ pseList, siren }) => {
  const hasPse = !!(pseList && pseList.length);

  return (
    <Subcategory subtitle="PSE" sourceSi="SI PSE/RUPCO">
      <ConditionalData
        text="Procédure(s) enregistrée(s) au cours des 36 derniers mois"
        showTable={hasPse}
      />
      {hasPse && <RupcoTable list={pseList} siren={siren} />}
    </Subcategory>
  );
};

Pse.propTypes = {
  pseList: PropTypes.arrayOf(PropTypes.object),
  siren: PropTypes.string.isRequired
};

export default Pse;
