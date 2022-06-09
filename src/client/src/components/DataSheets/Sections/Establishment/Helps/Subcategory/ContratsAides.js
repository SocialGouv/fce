import PropTypes from "prop-types";
import React from "react";

import { getCustomPastYear } from "../../../../../../helpers/Date/Date";
import LoadableContent from "../../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../../shared/Value";
import Data from "../../../SharedComponents/Data";
import Subcategory from "../../../SharedComponents/Subcategory";
import Table from "../../../SharedComponents/Table";
import { useContratsAides } from "./ContratsAides.gql";

const ContratsAides = ({ siret }) => {
  const { loading, data, error } = useContratsAides(siret);

  return (
    <Subcategory subtitle="Contrats aidés">
      <LoadableContent loading={loading} error={error}>
        <Data
          name={`Parcours emploi – compétences (PEC) ou Emploi d’avenir en ${getCustomPastYear(
            1
          )}`}
          value={!!data?.contrat_aide}
          columnClasses={["is-7", "is-5"]}
          sourceSi="ASP Extranet CUI"
        />
        {data?.contrat_aide && (
          <Table isBordered>
            <thead>
              <tr>
                <th>
                  Nombre de salariés présents au 31/12/
                  {getCustomPastYear(1)}
                </th>
                <th>Nombre de salariés embauchés en {getCustomPastYear(1)}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="has-text-right">
                  <Value
                    value={data?.CA_stock_12_2018}
                    nonEmptyValue={[0]}
                    hasNumberFormat
                  />
                </td>
                <td className="has-text-right">
                  <Value
                    value={data?.CA_entree_2018}
                    nonEmptyValue={[0]}
                    hasNumberFormat
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </LoadableContent>
    </Subcategory>
  );
};

ContratsAides.propTypes = { siret: PropTypes.string.isRequired };

export default ContratsAides;
