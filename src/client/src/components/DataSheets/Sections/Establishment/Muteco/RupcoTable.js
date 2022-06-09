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
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import Table from "../../SharedComponents/Table";

const RupcoTable = ({ list, siren, otherRupco, hasTypeColumn = false }) => {
  return (
    <Table className="rupco-table-establishment">
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
              <td className="has-text-right">
                <Value value={getNumero(dossier)} />
              </td>
              <td className="col-width-20">
                <Value value={getEtat(dossier)} />
              </td>
              <td className="has-text-right col-width-20">
                <Value value={getNombreRupture(dossier)} hasNumberFormat />
              </td>
              <td>
                <Value
                  value={
                    hasOtherEstablishments ? (
                      <div>
                        <div className="rupco-table-establishment__other-establishments">
                          Oui
                        </div>
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
    </Table>
  );
};

RupcoTable.propTypes = {
  hasTypeColumn: PropTypes.bool,
  list: PropTypes.array.isRequired,
  otherRupco: PropTypes.arrayOf(PropTypes.object),
  siren: PropTypes.string.isRequired,
};

export default RupcoTable;
