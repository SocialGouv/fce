import React from "react";
import PropTypes from "prop-types";
import Subcategory from "../../SharedComponents/Subcategory";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import State from "../../SharedComponents/State";
import Table from "../../SharedComponents/Table";
import { formatSiret } from "../../../../../helpers/utils";

const InteractionType = ({ type, interactions }) => {
  const isControl = type === "control";
  const numberOfEstablishments = interactions.length;
  const s = numberOfEstablishments > 1 ? "s" : "";

  const subtitle = `${numberOfEstablishments} établissement${s} ${
    isControl ? "contrôlé" : "visité"
  }${s}${isControl ? "" : " par les Services économiques de l'État en région"}`;

  return (
    <Subcategory subtitle={subtitle}>
      {interactions.length && (
        <Table>
          <thead>
            <tr>
              <th className="th">SIRET</th>
              <th className="th table-cell--center-cell">État</th>
              <th className="th">Commune</th>
              <th className="th">Date dernier contrôle connu</th>
              <th className="th">Pôle</th>
              <th className="th see-details"></th>
            </tr>
          </thead>
          <tbody>
            {interactions.map(etab => (
              <tr key={etab.siret + etab.pole}>
                <td className="table-cell--nowrap">
                  {formatSiret(etab.siret)}
                </td>
                <td className="table-cell--center-cell">
                  {etab.etat && <State state={etab.etat} />}
                </td>
                <td>{etab.commune}</td>
                <td>{etab.date}</td>
                <td>{etab.pole}</td>
                <td className="see-details">
                  <SeeDetailsLink
                    link={`/establishment/${etab.siret}/#direccte`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Subcategory>
  );
};

InteractionType.propTypes = {
  type: PropTypes.string.isRequired,
  interactions: PropTypes.array.isRequired
};

export default InteractionType;
