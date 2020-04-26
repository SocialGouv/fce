import React from "react";
import PropTypes from "prop-types";
import Subcategory from "../../SharedComponents/Subcategory";
import ConditionalData from "../../SharedComponents/ConditionalData";
import RupcoTable from "./RupcoTable";

const Rcc = ({ enterprise: { rcc: rccList } }) => {
  const hasRcc = !!(rccList && rccList.length);

  return (
    <Subcategory
      subtitle="Ruptures conventionenelles collectives (RCC)"
      sourceSi="SI PSE/RUPCO"
    >
      <ConditionalData
        text="Procédure(s) enregistrée(s) depuis le 22 décembre 2017"
        showTable={hasRcc}
      />
      {hasRcc && <RupcoTable list={rccList} />}
    </Subcategory>
  );
};

Rcc.propTypes = {
  enterprise: PropTypes.object.isRequired
};

export default Rcc;
