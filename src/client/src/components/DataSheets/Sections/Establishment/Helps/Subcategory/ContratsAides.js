import PropTypes from "prop-types";
import React from "react";

import { getCustomPastYear } from "../../../../../../helpers/Date/Date";
import LoadableContent from "../../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../../shared/Value";
import Data from "../../../SharedComponents/Data";
import NonBorderedTable from "../../../SharedComponents/NonBorderedTable/NonBorderedTable";
import Subcategory from "../../../SharedComponents/Subcategory";
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
          className="has-no-border"
          sourceSi="ASP Extranet CUI"
        />
        {data?.contrat_aide && (
          <div className="data-sheet--table">
            <NonBorderedTable>
              <thead>
                <tr>
                  <th>
                    Nombre de salariés présents au 31/12/
                    {getCustomPastYear(1)}
                  </th>
                  <th>
                    Nombre de salariés embauchés en {getCustomPastYear(1)}
                  </th>
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
            </NonBorderedTable>
          </div>
        )}
      </LoadableContent>
    </Subcategory>
  );
};

ContratsAides.propTypes = { siret: PropTypes.string.isRequired };

export default ContratsAides;
