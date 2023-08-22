import "./RupcoTable.scss";

import PropTypes from "prop-types";
import React from "react";

import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import AccordionTable from "./AccordionTable";

const RupcoTable = ({ list, hasTypeColumn = false }) => (
  <div className="data-sheet--table">
    <NonBorderedTable>
      <thead>
        <tr>
          {hasTypeColumn && <th>Type</th>}
          <th>Date d{"'"}enregistrement</th>
          <th>Numéro de dossier</th>
          <th>État du dossier</th>
          <th>
            Situation juridique de l{"'"}entreprise au moment de la procédure
          </th>
          <th className="rupco-table-enterprise__judgement-date">
            Date du jugement
          </th>
          <th>Nombre maximum de ruptures de contrats de travail envisagées</th>
          <th>Nombre d{"'"}établissements impactés</th>
        </tr>
      </thead>
      {list.map((procedure) => (
        <AccordionTable
          procedure={procedure}
          key={`${procedure[0].numero}`}
          hasTypeColumn={hasTypeColumn}
        />
      ))}
    </NonBorderedTable>
  </div>
);

RupcoTable.propTypes = {
  hasTypeColumn: PropTypes.bool,
  list: PropTypes.array.isRequired,
};

export default RupcoTable;
