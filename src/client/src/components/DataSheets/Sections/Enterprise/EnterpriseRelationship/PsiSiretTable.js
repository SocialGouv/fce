import PropTypes from "prop-types";
import React from "react";

import { formatSiret } from "../../../../../helpers/utils";
import {
  getCity,
  getState,
} from "../../../../../utils/establishment/establishment";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import State from "../../SharedComponents/State";
import Table from "../../SharedComponents/Table";

export const PsiSiretTable = ({ psi, year, isVisiblePsiTable }) => {
  return (
    <div>
      <div className="psi-siret__establishment-count">
        {psi.length} établissement(s) identifié(s) en {year}
      </div>

      {!!psi.length && isVisiblePsiTable && (
        <Table className="psi-siret__table">
          <thead>
            <tr>
              <th className="th">SIRET</th>
              <th className="th table-cell--center-cell">État</th>
              <th className="th">Commune</th>
              <th className="th see-details" />
            </tr>
          </thead>
          <tbody>
            {psi.map((psi) => (
              <tr key={psi.siret}>
                <td className="table-cell--nowrap">{formatSiret(psi.siret)}</td>
                <td className="table-cell--center-cell">
                  <State state={getState(psi.etablissement)} />
                </td>
                <td>{getCity(psi.etablissement)}</td>
                <td className="table-cell--nowrap see-details">
                  <SeeDetailsLink link={`/establishment/${psi.siret}/#psi`} />
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
  isVisiblePsiTable: PropTypes.bool.isRequired,
  psi: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
};
