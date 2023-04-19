import "./enterprise-mandataires.scss";

import PropTypes from "prop-types";
import React from "react";

import { uniqueData } from "../../../../../../utils/entreprise/entreprise";
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
        {uniqueData(mandataires).map((mandataire, index) => (
          <tr key={index}>
            <td>
              <Value value={mandataire?.fonction} />
            </td>
            <td>
              <Value
                value={
                  mandataire?.raison_sociale ||
                  `${mandataire?.nom} ${mandataire?.prenom}`
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
