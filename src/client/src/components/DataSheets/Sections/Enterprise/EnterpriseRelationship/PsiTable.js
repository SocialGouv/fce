import React from "react";
import PropTypes from "prop-types";
import Subcategory from "../../SharedComponents/Subcategory";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import State from "../../SharedComponents/State";
import Table from "../../SharedComponents/Table";
import { formatSiret } from "../../../../../helpers/utils";

const PsiTable = ({ establishments }) => {
  return (
    <div className="psi-table">
      <div className="column is-12">
        <div className="psi-table__label">
          Etablissement(s) identifié(s) comme lieu de réalisation d'au moins une
          PSI
        </div>
        <p className="psi__description">
          Directement pour le compte de l'entreprise et/ou pour une autre
          entreprise donneur d'ordre
        </p>
      </div>

      <Table>
        <thead>
          <tr>
            <th className="th">SIRET</th>
            <th className="th table-cell--center-cell">État</th>
            <th className="th">Commune</th>
            <th className="th see-details"></th>
          </tr>
        </thead>
        <tbody>
          {establishments.map(
            etab =>
              console.log(etab) || (
                <tr key={etab.siret}>
                  <td className="table-cell--nowrap">
                    {formatSiret(etab.siret)}
                  </td>
                  <td className="table-cell--center-cell">
                    {etab.etat && <State state={etab.etat} />}
                  </td>
                  <td>{etab.commune}</td>
                  <td className="table-cell--nowrap see-details">
                    <SeeDetailsLink
                      link={`/establishment/${etab.siret}/#psi`}
                    />
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
    </div>
  );
};

PsiTable.propTypes = {
  establishments: PropTypes.array.isRequired
};

export default PsiTable;
