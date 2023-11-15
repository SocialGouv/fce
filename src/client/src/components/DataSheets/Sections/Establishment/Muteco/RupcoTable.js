import "./rupcoTable.scss";

import { some } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import {
  getEtat,
  getNombreRupture,
  getNumero,
  getTypeLabel,
} from "../../../../../utils/rupco/rupco";
import Value from "../../../../shared/Value";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";

const RupcoTable = ({ list, siren, otherRupco, hasTypeColumn = false }) => {
  return (
    <div className="data-sheet--table ">
      <NonBorderedTable className="rupco-table-establishment">
        <thead>
          <tr>
            {hasTypeColumn && <th>Type</th>}
            <th>Date d{"'"}enregistrement</th>
            <th>Numéro de dossier</th>
            <th>État du dossier</th>
            <th>Nb maximum de ruptures de contrats envisagées</th>
            <th>Autres établissements</th>
          </tr>
        </thead>
        <tbody>
          {list.map((dossier) => {
            const hasOtherEstablishments = some(
              otherRupco,
              (file) => getNumero(file) === getNumero(dossier)
            );

            return (
              <tr key={getNumero(dossier)}>
                {hasTypeColumn && (
                  <td className="col-width-40">
                    <Value value={getTypeLabel(dossier)} />
                  </td>
                )}
                <td>
                  <Value value={dossier.date_enregistrement} />
                </td>
                <td>
                  <Value value={getNumero(dossier)} />
                </td>
                <td className="col-width-20">
                  <Value value={getEtat(dossier)} />
                </td>
                <td className=" col-width-20">
                  <Value value={getNombreRupture(dossier)} hasNumberFormat />
                </td>
                <td>
                  <Value
                    value={
                      hasOtherEstablishments ? (
                        <div>
                          <SeeDetailsLink
                            link={`/enterprise/${siren}/#muteco`}
                            text="Voir la fiche entreprise"
                          />
                        </div>
                      ) : (
                        "Non"
                      )
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </NonBorderedTable>
    </div>
  );
};

RupcoTable.propTypes = {
  hasTypeColumn: PropTypes.bool,
  list: PropTypes.array.isRequired,
  otherRupco: PropTypes.arrayOf(PropTypes.object),
  siren: PropTypes.string.isRequired,
};

export default RupcoTable;
