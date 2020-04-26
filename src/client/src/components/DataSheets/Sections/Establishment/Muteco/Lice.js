import React from "react";
import PropTypes from "prop-types";
import ConditionalData from "../../SharedComponents/ConditionalData";
import Subcategory from "../../SharedComponents/Subcategory";
import RupcoTable from "./RupcoTable";

const Lice = ({ establishment: { lice: liceList }, enterprise: { siren } }) => {
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
      {hasLice && <RupcoTable list={liceList} siren={siren} hasTypeColumn />}
    </Subcategory>
  );
};

Lice.propTypes = {
  establishment: PropTypes.object.isRequired,
  enterprise: PropTypes.object.isRequired
};

export default Lice;
