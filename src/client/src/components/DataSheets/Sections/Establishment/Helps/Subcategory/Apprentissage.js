import React from "react";
import PropTypes from "prop-types";

import Data from "../../../SharedComponents/Data";
import Subcategory from "../../../SharedComponents/Subcategory";
import Table from "../../../SharedComponents/Table";
import { getCustomPastYear } from "../../../../../../helpers/Date/Date";
import { hasApprentissage } from "../../../../../../helpers/Establishment";
import { formatNumber } from "../../../../../../helpers/utils";
import Info from "../../../../../Info";

const Apprentissage = ({ apprentissage }) => {
  return (
    <>
      <Subcategory subtitle="Apprentissage">
        <Data
          name={`Embauche en contrat d'apprentissage depuis ${getCustomPastYear(
            2
          )}`}
          value={hasApprentissage(apprentissage)}
          columnClasses={["is-7", "is-5"]}
          sourceSi="Ari@ne"
        />
        {hasApprentissage(apprentissage) && (
          <Table isBordered>
            <thead>
              <tr>
                <th></th>
                {Object.keys(apprentissage).map(year => (
                  <th className="has-text-right" key={year}>
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Nombre de contrats d{`'`}apprentissage signés</th>
                {Object.entries(apprentissage).map(([year, { signes }]) => (
                  <td className="has-text-right" key={year}>
                    {signes && formatNumber(signes)}
                  </td>
                ))}
              </tr>

              <tr>
                <th>Nombre de contrats rompus </th>
                {Object.entries(apprentissage).map(([year, { rompus }]) => (
                  <td className="has-text-right" key={year}>
                    {rompus && formatNumber(rompus)}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        )}
      </Subcategory>
    </>
  );
};

Apprentissage.propTypes = { apprentissage: PropTypes.object };

export default Apprentissage;
