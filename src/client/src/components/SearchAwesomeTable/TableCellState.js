import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCircle } from "@fortawesome/pro-solid-svg-icons";
import { isActiveEstablishment } from "../../helpers/Search";

const TableCellState = ({ siret, etat }) => (
  <div style={{ textAlign: "center" }}>
    <FontAwesomeIcon
      data-tip
      data-for={siret}
      className={
        isActiveEstablishment(etat) ? "icon--success mr-1" : "icon--danger mr-1"
      }
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
