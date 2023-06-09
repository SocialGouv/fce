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
} from "../../../../../utils/establishment/establishment";
import { INTERACTION_TYPE } from "../../../../../utils/interactions/interactions";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import State from "../../SharedComponents/State";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";

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
    <Subcategory subtitle={subtitle}>
      {formattedInteractions.length ? (
        <Table>
          <thead>
            <tr>
              <th className="th">SIRET</th>
              <th className="th table-cell--center-cell">État</th>
              <th className="th">Commune</th>
              <th className="th">Date dernier contrôle connu</th>
              <th className="th">Pôle</th>
              <th className="th see-details" />
            </tr>
          </thead>
          <tbody>
            {formattedInteractions.map((interaction) => {
              const etab = interaction.etablissement;
              return (
                <tr key={interaction.siret + interaction.pole}>
                  <td className="table-cell--nowrap">
                    {formatSiret(interaction.siret)}
                  </td>
                  <td className="table-cell--center-cell">
                    {getState(etab) && <State state={getState(etab)} />}
                  </td>
                  <td>
                    {getCodePostal(etab)} {getCity(etab)}
                  </td>
                  <td>
                    {interaction?.date && usDateToFrenchDate(interaction?.date)}
                  </td>
                  <td>{interaction?.pole}</td>
                  <td className="see-details">
                    <SeeDetailsLink
                      link={`/establishment/${interaction?.siret}/#direccte`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        ""
      )}
    </Subcategory>
  );
};

InteractionType.propTypes = {
  interactions: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default InteractionType;
