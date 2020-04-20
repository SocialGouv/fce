import React from "react";
import PropTypes from "prop-types";
import Value from "../../../../../shared/Value";

const Mandataires = ({ mandataires }) => {
  return (
    <table className="table is-hoverable w-100 mt-4">
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
  );
};

Mandataires.propTypes = {
  mandataires: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Mandataires;
