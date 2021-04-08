import React, { useState } from "react";
import PropTypes from "prop-types";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import State from "../../SharedComponents/State";
import Table from "../../SharedComponents/Table";
import Button from "../../../../shared/Button/Button";
import { formatSiret } from "../../../../../helpers/utils";

const PsiTable = ({ establishments, year }) => {
  const [isVisiblePsiTable, setIsVisiblePsiTable] = useState(false);
  const s = establishments.length > 1 ? "s" : "";
  return (
    <div className="psi-siret-table">
      <div className="column is-12">
        <div className="psi-siret-table__label">
          {establishments.length} établissement{s} identifié{s} comme lieu de
          réalisation d&apos;au moins une PSI en {year}
        </div>
        <p className="psi__description">
          Directement pour le compte de l&apos;entreprise et/ou pour une autre
          entreprise donneur d&apos;ordre
        </p>
      </div>

      {establishments.length > 9 && (
        <div className="psi-siret-table__button-wrapper">
          <Button
            onClick={() => setIsVisiblePsiTable(prevState => !prevState)}
            value={
              isVisiblePsiTable
                ? "Cacher la liste des établissements"
                : "Afficher la liste des établissements"
            }
            buttonClasses="is-primary"
          />
        </div>
      )}

      {(establishments.length < 9 || isVisiblePsiTable) && (
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

PsiTable.propTypes = {
  establishments: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired
};

export default PsiTable;
