import React from "react";
import PropTypes from "prop-types";
import AccordionTable from "./AccordionTable";

import "./RupcoTable.scss";

const RupcoTable = ({ list, hasTypeColumn = false }) => (
  <div className="is-overflow-x">
    <table className="table rupco-table-enterprise">
      <thead>
        <tr>
          {hasTypeColumn && (
            <th className="rupco-table-enterprise__type">Type</th>
          )}
          <th className="rupco-table-enterprise__recording-date">
            Date d{"'"}enregistrement
          </th>
          <th className="rupco-table-enterprise__file-number">
            Numéro de dossier
          </th>
          <th className="rupco-table-enterprise__state">État du dossier</th>
          <th className="rupco-table-enterprise__legal-situation">
            Situation juridique de l{"'"}entreprise au moment de la procédure
          </th>
          <th className="rupco-table-enterprise__judgement-date">
            Date du jugement
          </th>
          <th className="rupco-table-enterprise__broken-contracts">
            Nombre maximum de ruptures de contrats de travail envisagées
          </th>
          <th className="rupco-table-enterprise__other-establishments">
            Nombre d{"'"}établissements impactés
          </th>
        </tr>
      </thead>
      {list.map(procedure => (
        <AccordionTable
          procedure={procedure}
          key={`${procedure.numero}`}
          hasTypeColumn={hasTypeColumn}
        />
      ))}
    </table>
  </div>
);

RupcoTable.propTypes = {
  list: PropTypes.array.isRequired,
  hasTypeColumn: PropTypes.bool
};

export default RupcoTable;
