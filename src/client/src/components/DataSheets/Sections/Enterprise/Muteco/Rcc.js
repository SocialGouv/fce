import PropTypes from "prop-types";
import React from "react";

import ConditionalData from "../../SharedComponents/ConditionalData";
import Subcategory from "../../SharedComponents/Subcategory";
import RupcoTable from "./RupcoTable";

const Rcc = ({ rccList }) => {
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
  rccList: PropTypes.arrayOf(PropTypes.object),
};

export default Rcc;
