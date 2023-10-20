import PropTypes from "prop-types";
import React from "react";

import { formatSiret } from "../../../../../helpers/utils";
import {
  getCity,
  getState,
  isActive,
} from "../../../../../utils/establishment/establishment";
import BadgeWithIcon from "../../../../shared/Badge/BadgeWithIcon.jsx";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";

export const PsiSiretTable = ({ psi, year, isVisiblePsiTable }) => {
  return (
    <div>
      <div className="psi-siret__establishment-count">
        {psi.length} établissement(s) identifié(s) en {year}
      </div>

      {!!psi.length && isVisiblePsiTable && (
        <div className="data-sheet--table">
          <NonBorderedTable
            isScrollable={psi.length > 6}
            className="psi-siret__table"
          >
            <thead>
              <tr>
                <th className="th">SIRET</th>
                <th className="th ">État</th>
                <th className="th table-cell--center-cell">Commune</th>
              </tr>
            </thead>
            <tbody>
              {psi.map((psi) => {
                const etab = psi.etablissement;
                const isEtablissementActive = isActive(etab);
                const stateClass = isEtablissementActive
                  ? "icon--success"
                  : "icon--danger";
                const stateText = isEtablissementActive ? "ouvert" : "fermé";
                return (
                  <tr key={psi.siret}>
                    <td className="table-cell--nowrap">
                      <SeeDetailsLink
                        text={formatSiret(psi.siret)}
                        link={`/establishment/${psi.siret}/#psi`}
                      />
                    </td>

                    <td className="table-cell--center-cell">
                      {getState(etab) && (
                        <BadgeWithIcon
                          isTableBadge
                          text={stateText}
                          state={stateClass}
                        />
                      )}
                    </td>
                    <td className="th table-cell--center-cell">
                      {getCity(psi.etablissement)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </NonBorderedTable>
        </div>
      )}
    </div>
  );
};

PsiSiretTable.propTypes = {
  isVisiblePsiTable: PropTypes.bool.isRequired,
  psi: PropTypes.array.isRequired,
  year: PropTypes.number.isRequired,
};
