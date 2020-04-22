import React from "react";
import PropTypes from "prop-types";

import Value from "../../../../../shared/Value";
import Data from "../../../SharedComponents/Data";
import Subcategory from "../../../SharedComponents/Subcategory";
import { getCustomPastYear } from "../../../../../../helpers/Date/Date";

const Apprentissage = ({ apprentissage }) => {
  const total = apprentissage
    ? Object.values(apprentissage).reduce(
        (total, { signes }) => total + signes,
        0
      )
    : 0;
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
        />
        {hasApprentissage && (
          <table className="table is-bordered is-fullwidth">
            <thead>
              <tr>
                <th></th>
                {Object.keys(apprentissage).map(year => (
                  <th key={year}>{year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Nombre de contrats d{`'`}apprentissage signés</th>
                {Object.entries(apprentissage).map(([year, { signes }]) => (
                  <td key={year}>{signes}</td>
                ))}
              </tr>

              <tr>
                <th>Nombre de contrats rompus </th>
                {Object.entries(apprentissage).map(([year, { rompus }]) => (
                  <td key={year}>{rompus}</td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </Subcategory>
    </>
  );
};

Apprentissage.propTypes = { apprentissage: PropTypes.object };

export default Apprentissage;
