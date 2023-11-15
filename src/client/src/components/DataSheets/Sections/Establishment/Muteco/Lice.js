import PropTypes from "prop-types";
import React from "react";

import ConditionalData from "../../SharedComponents/ConditionalData";
import Subcategory from "../../SharedComponents/Subcategory";
import RupcoTable from "./RupcoTable";

const Lice = ({ liceList, siren, otherRupco }) => {
  const hasLice = !!(liceList && liceList.length);

  return (
    <Subcategory
      subtitle="Autres licenciement(s) économique(s) (hors PSE)"
      sourceSi="SI PSE/RUPCO"
    >
      <ConditionalData
        text="Procédure(s) enregistrée(s) depuis le 2 décembre 2019"
        showTable={hasLice}
        className="has-no-border"
      />
      {hasLice && (
        <RupcoTable
          list={liceList}
          siren={siren}
          otherRupco={otherRupco}
          hasTypeColumn
        />
      )}
    </Subcategory>
  );
};

Lice.propTypes = {
  liceList: PropTypes.arrayOf(PropTypes.object),
  otherRupco: PropTypes.arrayOf(PropTypes.object),
  siren: PropTypes.string.isRequired,
};

export default Lice;
