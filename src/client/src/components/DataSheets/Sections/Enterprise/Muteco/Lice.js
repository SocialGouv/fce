import React from "react";
import PropTypes from "prop-types";
import Subcategory from "../../SharedComponents/Subcategory";
import ConditionalData from "../../SharedComponents/ConditionalData";
import RupcoTable from "./RupcoTable";

const Lice = ({ liceList }) => {
  const hasLice = !!(liceList && liceList.length);

  return (
    <Subcategory
      subtitle="Autres licenciement(s) économique(s) (hors PSE)"
      sourceSi="SI PSE/RUPCO"
    >
      <ConditionalData
        text="Procédure(s) enregistrée(s) depuis le 2 décembre 2019"
        showTable={hasLice}
      />
      {hasLice && <RupcoTable list={liceList} hasTypeColumn />}
    </Subcategory>
  );
};

Lice.propTypes = {
  liceList: PropTypes.arrayOf(PropTypes.object)
};

export default Lice;
