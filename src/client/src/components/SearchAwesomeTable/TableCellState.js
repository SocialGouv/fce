import { faCircle, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import { isActiveEstablishment } from "../../helpers/Search";

const TableCellState = ({ siret, etat }) => (
  <div style={{ textAlign: "center" }}>
    <FontAwesomeIcon
      data-tip
      data-for={siret}
      className={isActiveEstablishment(etat) ? "icon--success" : "icon--danger"}
      icon={isActiveEstablishment(etat) ? faCircle : faSquare}
    />
    <div>{isActiveEstablishment(etat) ? "Ouvert" : "Fermé"}</div>
  </div>
);

TableCellState.propTypes = {
  etat: PropTypes.string.isRequired,
  siret: PropTypes.string.isRequired,
};

export default TableCellState;
