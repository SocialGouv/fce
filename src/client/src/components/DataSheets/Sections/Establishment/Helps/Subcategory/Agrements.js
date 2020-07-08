import React from "react";
import PropTypes from "prop-types";
import _get from "lodash.get";

import Value from "../../../../../shared/Value";
import Subcategory from "../../../SharedComponents/Subcategory";
import Config from "../../../../../../services/Config";
import { getCustomPastYear } from "../../../../../../helpers/Date/Date";

const Agrements = ({ establishment }) => {
  const hasAgrements = !!(
    establishment.agrements_iae &&
    Object.values(establishment.agrements_iae)
      .map(agrementData => agrementData.agrement)
      .includes(true)
  );

  return (
    <>
      <Subcategory
        subtitle="Agréments"
        datas={[
          {
            name: "Agrément(s) Insertion par l’activité économique (IAE)",
            value: hasAgrements,
            columnClasses: ["is-7", "is-5"],
            source: "ASP Extranet IAE2.0"
          }
        ]}
      />

      {hasAgrements && (
        <table className="table is-hoverable">
          <thead>
            <tr>
              <th />
              <th>Agrément(s) en {getCustomPastYear(1)}</th>
              <th>
                Nombre de salariés en insertion présents en{" "}
                {getCustomPastYear(1)}
              </th>
              <th>Nombre d’ETP en année {getCustomPastYear(1)}</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(Config.get("agrementsIae")).map(([key, label]) => {
              const { etp, agrement, salariesInsertion } = _get(
                establishment,
                `agrements_iae[${key}]`
              );

              return (
                <tr key={key}>
                  <th>{label}</th>
                  <td>
                    <Value value={agrement} />
                  </td>
                  <td className="has-text-right">
                    <Value value={salariesInsertion} hasNumberFormat />
                  </td>
                  <td className="has-text-right">
                    <Value value={etp && Math.round(etp)} hasNumberFormat />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

Agrements.propTypes = { establishment: PropTypes.object.isRequired };

export default Agrements;
