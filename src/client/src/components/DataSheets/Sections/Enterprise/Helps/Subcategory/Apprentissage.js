import PropTypes from "prop-types";
import React from "react";

import { getCustomPastYear } from "../../../../../../helpers/Date";
import { renderIfSiren } from "../../../../../../helpers/hoc/renderIfSiren";
import { formatSiret } from "../../../../../../helpers/utils";
import {
  formatApprentissage,
  getEstablishmentSignedCount,
  getSignedTotal,
} from "../../../../../../utils/apprentissage/apprentissage";
import {
  getCity,
  getCodePostal,
  getSiret,
  getState,
  isActive,
} from "../../../../../../utils/establishment/establishment";
import BadgeWithIcon from "../../../../../shared/Badge/BadgeWithIcon.jsx";
import Data from "../../../SharedComponents/Data";
import NonBorderedTable from "../../../SharedComponents/NonBorderedTable/NonBorderedTable";
import SeeDetailsLink from "../../../SharedComponents/SeeDetailsLink";
import Subcategory from "../../../SharedComponents/Subcategory";
import { useApprentissageBySiren } from "./Apprentissage.gql";

const Apprentissage = ({ entreprise: { siren } }) => {
  const { data, loading, error } = useApprentissageBySiren(siren);

  if (loading || error) {
    return null;
  }

  const formattedApprentissage = formatApprentissage(
    data.etablissements_apprentissage
  );
  const total = getSignedTotal(formattedApprentissage);
  const hasApprentissage = !!total;

  return (
    <>
      <Subcategory subtitle="Apprentissage">
        <Data
          name={`Embauche en contrat d'apprentissage depuis ${getCustomPastYear(
            2
          )}`}
          value={hasApprentissage}
          columnClasses={["is-7", "is-5"]}
          sourceSi="Ari@ne"
          className="has-no-border"
        />
        {hasApprentissage && (
          <div className="data-sheet--table">
            <NonBorderedTable isScrollable={formattedApprentissage.length > 6}>
              <thead>
                <tr>
                  <th className="th">Siret</th>
                  <th className="th table-cell--center-cell">État</th>
                  <th className="th">Commune</th>
                  <th>Nombre de contrats</th>
                </tr>
              </thead>
              <tbody>
                {formattedApprentissage?.map((apprentissage) => {
                  const etablissement = apprentissage.etablissement;
                  const etat = getState(etablissement);
                  const etab = etablissement;
                  const isEtablissementActive = isActive(etab);
                  const stateClass = isEtablissementActive
                    ? "icon--success"
                    : "icon--danger";
                  const stateText = isEtablissementActive ? "ouvert" : "fermé";
                  const codePostal = getCodePostal(etablissement);
                  const localite = getCity(etablissement);
                  const siret = getSiret(etablissement);

                  return (
                    <tr key={`${siret}-${codePostal}`}>
                      <td className="table-cell--nowrap">
                        <SeeDetailsLink
                          link={`/establishment/${siret}/#helps`}
                          text={formatSiret(siret)}
                        />
                      </td>
                      <td className="table-cell--center-cell">
                        {etat && (
                          <BadgeWithIcon
                            isTableBadge
                            text={stateText}
                            state={stateClass}
                          />
                        )}
                      </td>
                      <td>{`${codePostal ? codePostal : ""} ${
                        localite ? localite : ""
                      }`}</td>
                      <td className="th table-cell--center-cell">
                        {getEstablishmentSignedCount(apprentissage)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </NonBorderedTable>
          </div>
        )}
      </Subcategory>
    </>
  );
};

Apprentissage.propTypes = {
  entreprise: PropTypes.shape({
    siren: PropTypes.string,
  }),
};

export default renderIfSiren(Apprentissage);
