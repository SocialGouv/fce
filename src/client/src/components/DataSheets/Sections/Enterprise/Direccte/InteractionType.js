import PropTypes from "prop-types";
import React from "react";

import { formatSiret } from "../../../../../helpers/utils";
import { usDateToFrenchDate } from "../../../../../utils/date/date";
import {
  formatInteractions,
  getInteractions,
} from "../../../../../utils/entreprise/entreprise";
import {
  getCity,
  getCodePostal,
  getState,
  isActive,
} from "../../../../../utils/establishment/establishment";
import { INTERACTION_TYPE } from "../../../../../utils/interactions/interactions";
import BadgeWithIcon from "../../../../shared/Badge/BadgeWithIcon.jsx";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";

const InteractionType = ({ type, interactions }) => {
  const isControl = type === INTERACTION_TYPE.CONTROL;
  const formattedInteractions = formatInteractions(
    getInteractions(interactions).filter(
      ({ type: interactionType }) => interactionType === type
    )
  );

  const numberOfEstablishments = formattedInteractions.length;
  const s = numberOfEstablishments > 1 ? "s" : "";

  const subtitle = `${numberOfEstablishments} établissement${s} ${
    isControl ? "contrôlé" : "visité"
  }${s}${isControl ? "" : " par les Services économiques de l'État en région"}`;

  return (
    <>
      <span className="text">{subtitle}</span>
      {formattedInteractions.length ? (
        <div className="data-sheet--table">
          <NonBorderedTable isScrollable={formattedInteractions.length > 6}>
            <thead>
              <tr>
                <th className="th">SIRET</th>
                <th className="th table-cell--center-cell">État</th>
                <th className="th">Commune</th>
                <th className="th">Date dernier contrôle connu</th>
                <th className="th">Pôle</th>
              </tr>
            </thead>
            <tbody>
              {formattedInteractions.map((interaction) => {
                const etab = interaction?.etablissement;
                const isEtablissementActive = isActive(etab);
                const stateClass = isEtablissementActive
                  ? "icon--success"
                  : "icon--danger";
                const stateText = isEtablissementActive ? "ouvert" : "fermé";
                return (
                  <tr key={interaction.siret + interaction.pole}>
                    <td className="table-cell--nowrap">
                      <SeeDetailsLink
                        text={formatSiret(interaction.siret)}
                        link={`/establishment/${interaction?.siret}/#direccte`}
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
                    <td>
                      {getCodePostal(etab)} {getCity(etab)}
                    </td>
                    <td>
                      {interaction?.date &&
                        usDateToFrenchDate(interaction?.date)}
                    </td>
                    <td className="th table-cell--center-cell">
                      {interaction?.pole}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </NonBorderedTable>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

InteractionType.propTypes = {
  interactions: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default InteractionType;
