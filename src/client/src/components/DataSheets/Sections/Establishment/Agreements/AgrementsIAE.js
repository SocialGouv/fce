import { get } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import Config from "../../../../../services/Config";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";
import { useAgrementsIae } from "./AgrementsIAE.gql";

const AgrementsIAE = ({ siret }) => {
  const { loading, data: agrements, error } = useAgrementsIae(siret);
  const hasAgrements = Object.values(agrements || {})
    .map((agrementData) => agrementData.agrement)
    .includes(true);

  return (
    <LoadableContent loading={loading} error={error}>
      <Subcategory
        subtitle="Insertion par l’activité économique (IAE)"
        sourceSi="ASP Extranet IAE2.0"
        datas={[
          {
            columnClasses: ["is-7", "is-5"],
            name: "Insertion par l’activité économique (IAE)",
            source: "ASP Extranet IAE2.0",
            value: hasAgrements,
          },
        ]}
      />

      {hasAgrements && (
        <Table>
          <thead>
            <tr>
              <th />
              <th>Agrément(s) en 2018</th>
              <th>Nombre de salariés en insertion présents en 2018</th>
              <th>Nombre d’ETP en année 2018</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(Config.get("agrementsIae")).map(([key, label]) => {
              const { etp, agrement, salariesInsertion } = get(agrements, key);

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
        </Table>
      )}
    </LoadableContent>
  );
};

AgrementsIAE.propTypes = { siret: PropTypes.string.isRequired };

export default AgrementsIAE;
