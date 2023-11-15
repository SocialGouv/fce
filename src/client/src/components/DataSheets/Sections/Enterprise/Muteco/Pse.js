import PropTypes from "prop-types";
import React from "react";

import { getRupco } from "../../../../../utils/entreprise/entreprise";
import { filterPse, groupDossier } from "../../../../../utils/rupco/rupco";
import RupcoTable from "../../Enterprise/Muteco/RupcoTable";
import ConditionalData from "../../SharedComponents/ConditionalData";
import Subcategory from "../../SharedComponents/Subcategory";

const Pse = ({ entreprise }) => {
  const pse = filterPse(getRupco(entreprise));

  const formattedData = groupDossier(pse);
  const hasPse = !!(pse && pse.length);

  return (
    <Subcategory subtitle="PSE" sourceSi="SI PSE/RUPCO">
      <ConditionalData
        text="Procédure(s) enregistrée(s) au cours des 36 derniers mois"
        showTable={hasPse}
        className="has-no-border"
      />
      {hasPse && <RupcoTable list={formattedData} />}
    </Subcategory>
  );
};

Pse.propTypes = {
  entreprise: PropTypes.object,
};

export default Pse;
