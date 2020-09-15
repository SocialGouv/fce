import React from "react";
import PropTypes from "prop-types";
import Value from "../../../../../shared/Value";

import "./enterprise-mandataires.scss";

const Mandataires = ({ mandataires }) => {
  return mandataires && mandataires.length ? (
    <table className="enterprise-mandataires table is-hoverable">
      <thead>
        <tr>
          <th className="th">Fonction</th>
          <th className="th">Nom ou raison sociale</th>
        </tr>
      </thead>
      <tbody>
        {mandataires.map((mandataire, index) => (
          <tr key={index}>
            <td>
              <Value value={mandataire.fonction} />
            </td>
            <td>
              <Value
                value={
                  mandataire.raison_sociale ||
                  `${mandataire.nom} ${mandataire.prenom}`
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="enterprise-mandataires__not-found has-text-centered">
      Aucun mandataire n{"'"}a été trouvé
    </p>
  );
};

Mandataires.propTypes = {
  mandataires: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Mandataires;
