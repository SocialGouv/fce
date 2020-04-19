import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEye } from "@fortawesome/pro-solid-svg-icons";
import Subcategory from "../../SharedComponents/Subcategory";
import Config from "../../../../../services/Config";

import "./interactionType.scss";

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
        <table className="table is-hoverable w-100 direccte-interactions mt-3">
          <thead>
            <tr>
              <th className="th">SIRET</th>
              <th className="th table__center-cell">État</th>
              <th className="th direccte-interactions__city">Commune</th>
              <th className="th">Date dernier contrôle connu</th>
              <th className="th">Pôle</th>
              <th className="th see-details"></th>
            </tr>
          </thead>
          <tbody>
            {interactions.map(etab => (
              <tr key={etab.siret + etab.pole}>
                <td>{etab.siret}</td>
                <td className="table__center-cell">
                  {etab.etat && (
                    <FontAwesomeIcon
                      className={
                        etab.etat === Config.get("establishmentState").actif
                          ? "icon--success"
                          : "icon--danger"
                      }
                      icon={faCircle}
                    />
                  )}
                </td>
                <td>{etab.commune}</td>
                <td>{etab.date}</td>
                <td>{etab.pole}</td>
                <td className="has-text-centered">
                  <Link to={`/establishment/${etab.siret}/#direccte`}>
                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                    <span>Voir le détail</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Subcategory>
  );
};

InteractionType.propTypes = {
  type: PropTypes.string.isRequired,
  interactions: PropTypes.array.isRequired
};

export default InteractionType;
