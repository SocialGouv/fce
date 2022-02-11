import PropTypes from "prop-types";
import React from "react";

import ConditionalData from "../../SharedComponents/ConditionalData";
import Subcategory from "../../SharedComponents/Subcategory";
import RupcoTable from "./RupcoTable";

const Rcc = ({ rccList, siren, otherRupco }) => {
  const hasRcc = !!(rccList && rccList.length);

  return (
    <Subcategory subtitle="RCC" sourceSi="SI PSE/RUPCO">
      <ConditionalData
        text="Procédure(s) enregistrée(s) depuis le 22 décembre 2017"
        showTable={hasRcc}
      />
      {hasRcc && (
        <RupcoTable list={rccList} siren={siren} otherRupco={otherRupco} />
      )}
    </Subcategory>
  );
};

Rcc.propTypes = {
  otherRupco: PropTypes.arrayOf(PropTypes.object),
  rccList: PropTypes.arrayOf(PropTypes.object),
  siren: PropTypes.string.isRequired,
};

export default Rcc;
