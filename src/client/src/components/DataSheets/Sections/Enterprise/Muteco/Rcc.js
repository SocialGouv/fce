import PropTypes from "prop-types";
import React from "react";

import { getRupco } from "../../../../../utils/entreprise/entreprise";
import { filterRcc, groupDossier } from "../../../../../utils/rupco/rupco";
import ConditionalData from "../../SharedComponents/ConditionalData";
import Subcategory from "../../SharedComponents/Subcategory";
import RupcoTable from "./RupcoTable";

const Rcc = ({ entreprise }) => {
  const rcc = filterRcc(getRupco(entreprise));
  const hasRcc = !!(rcc && rcc.length);

  const formattedData = groupDossier(rcc);

  return (
    <Subcategory
      subtitle="Ruptures conventionenelles collectives (RCC)"
      sourceSi="SI PSE/RUPCO"
    >
      <ConditionalData
        text="Procédure(s) enregistrée(s) depuis le 22 décembre 2017"
        showTable={hasRcc}
      />
      {hasRcc && <RupcoTable list={formattedData} />}
    </Subcategory>
  );
};

Rcc.propTypes = {
  entreprise: PropTypes.object,
};

export default Rcc;
