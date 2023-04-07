import "./enterprise-mandataires.scss";

import PropTypes from "prop-types";
import React from "react";

import Value from "../../../../../shared/Value";
import Table from "../../../SharedComponents/Table";

const Mandataires = ({ mandataires }) => {
  return mandataires && mandataires.length ? (
    <Table className="enterprise-mandataires">
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
              <Value value={mandataire?.data?.fonction} />
            </td>
            <td>
              <Value
                value={
                  mandataire?.data?.raison_sociale ||
                  `${mandataire?.data?.nom} ${mandataire?.data?.prenom}`
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <p className="enterprise-mandataires__not-found has-text-centered">
      Aucun mandataire n{"'"}a été trouvé
    </p>
  );
};

Mandataires.propTypes = {
  mandataires: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Mandataires;
