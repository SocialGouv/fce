import PropTypes from "prop-types";
import React from "react";

import { getRupco } from "../../../../../utils/entreprise/entreprise";
import { filterLice, groupDossier } from "../../../../../utils/rupco/rupco";
import ConditionalData from "../../SharedComponents/ConditionalData";
import Subcategory from "../../SharedComponents/Subcategory";
import RupcoTable from "./RupcoTable";

const Lice = ({ entreprise }) => {
  const lice = filterLice(getRupco(entreprise));
  const hasLice = !!(lice && lice.length);

  const formattedData = groupDossier(lice);

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
      {hasLice && <RupcoTable list={formattedData} hasTypeColumn />}
    </Subcategory>
  );
};

Lice.propTypes = {
  entreprise: PropTypes.object,
};

export default Lice;
