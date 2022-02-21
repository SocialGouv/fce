import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCircle } from "@fortawesome/free-solid-svg-icons";
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
  siret: PropTypes.string.isRequired,
  etat: PropTypes.string.isRequired
};

export default TableCellState;
