import React from "react";
import PropTypes from "prop-types";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import State from "../../SharedComponents/State";
import Table from "../../SharedComponents/Table";
import { formatSiret } from "../../../../../helpers/utils";

export const PsiSiretTable = ({ establishments, year, isVisiblePsiTable }) => {
  return (
    <div>
      <div className="psi-siret__establishment-count">
        {establishments.length} établissement(s) identifié(s) en {year}
      </div>

      {!!establishments.length && isVisiblePsiTable && (
        <Table className="psi-siret__table">
          <thead>
            <tr>
              <th className="th">SIRET</th>
              <th className="th table-cell--center-cell">État</th>
              <th className="th">Commune</th>
              <th className="th see-details"></th>
            </tr>
          </thead>
          <tbody>
            {establishments.map(etab => (
              <tr key={etab.siret}>
                <td className="table-cell--nowrap">
                  {formatSiret(etab.siret)}
                </td>
                <td className="table-cell--center-cell">
                  {etab.etat && <State state={etab.etat} />}
                </td>
                <td>{etab.commune}</td>
                <td className="table-cell--nowrap see-details">
                  <SeeDetailsLink link={`/establishment/${etab.siret}/#psi`} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

PsiSiretTable.propTypes = {
  establishments: PropTypes.array.isRequired,
  isVisiblePsiTable: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired
};
