import React from "react";
import PropTypes from "prop-types";
import ConditionalData from "../../SharedComponents/ConditionalData";
import Subcategory from "../../SharedComponents/Subcategory";
import RupcoTable from "./RupcoTable";

const Lice = ({ liceList, siren, enterpriseLice }) => {
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
      {hasLice && (
        <RupcoTable
          list={liceList}
          siren={siren}
          rupcoFiles={enterpriseLice}
          hasTypeColumn
        />
      )}
    </Subcategory>
  );
};

Lice.propTypes = {
  liceList: PropTypes.arrayOf(PropTypes.object),
  enterpriseLice: PropTypes.arrayOf(PropTypes.object),
  siren: PropTypes.string.isRequired
};

export default Lice;
