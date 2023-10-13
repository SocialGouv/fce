import PropTypes from "prop-types";
import React from "react";

import { isActiveEstablishment } from "../../helpers/Search";
import BadgeWithIcon from "../shared/Badge/BadgeWithIcon.jsx";

const TableCellState = ({ siret, etat }) => {
  const isEtablissementActive = isActiveEstablishment(etat);
  const stateClass = isEtablissementActive ? "icon--success" : "icon--danger";
  const stateText = isEtablissementActive ? "ouvert" : "fermé";
  return (
    <div style={{ textAlign: "center" }} key={siret}>
      <BadgeWithIcon isTableBadge text={stateText} state={stateClass} />
    </div>
  );
};

TableCellState.propTypes = {
  etat: PropTypes.string.isRequired,
  siret: PropTypes.string.isRequired,
};

export default TableCellState;
