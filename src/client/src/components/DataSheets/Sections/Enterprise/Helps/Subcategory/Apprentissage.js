import React from "react";
import PropTypes from "prop-types";

import Data from "../../../SharedComponents/Data";
import Subcategory from "../../../SharedComponents/Subcategory";
import { getCustomPastYear } from "../../../../../../helpers/Date/Date";

const Apprentissage = ({ apprentissage }) => {
  console.log({ apprentissage });

  const total = apprentissage
    ? apprentissage.reduce((total, { signes }) => {
        return Object.values(signes).reduce(
          (total, nbApprentissage) => total + nbApprentissage,
          total
        );
      }, 0)
    : 0;

  const hasApprentissage = false;

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
        />
        {hasApprentissage && (
          <table className="table is-bordered is-fullwidth">
            <thead>
              <tr>
                <th>Siret</th>
                <th>État</th>
                <th>Commune</th>
                <th>Nombre de contrats</th>
              </tr>
            </thead>
            <tbody>
              {apprentissage.map(({ siret, signes }) => (
                <tr key={siret}>
                  <td>{siret}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Subcategory>
    </>
  );
};

Apprentissage.propTypes = {
  apprentissage: PropTypes.arrayOf(PropTypes.object)
};

export default Apprentissage;
