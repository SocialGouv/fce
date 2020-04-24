import React from "react";
import PropTypes from "prop-types";
import AccordionTable from "./AccordionTable";

const RupcoTable = ({ list, hasTypeColumn = false }) => {
  console.log({ list });
  return (
    <div className="is-overflow-x">
      <table className="table mt-2 is-max-content">
        <thead>
          <tr>
            {hasTypeColumn && <th>Type</th>}
            <th>Date d{"'"}enregistrement</th>
            <th>Numéro de dossier</th>
            <th>État du dossier</th>
            <th>
              Situation juridique de l{"'"}entreprise au moment de la procédure
            </th>
            <th>Date du jugement</th>
            <th>
              Nombre maximum de ruptures de contrats de travail envisagées
            </th>
            <th>Nombre d{"'"}établissements impactés</th>
          </tr>
        </thead>
        {list.map(procedure => (
          <AccordionTable
            procedure={procedure}
            key={`${procedure}`}
            hasTypeColumn={hasTypeColumn}
          />
        ))}
      </table>
    </div>
  );
};

RupcoTable.propTypes = {
  list: PropTypes.array.isRequired,
  hasTypeColumn: PropTypes.bool
};

export default RupcoTable;
