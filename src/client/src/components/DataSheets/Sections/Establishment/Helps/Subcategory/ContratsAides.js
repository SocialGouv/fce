import React from "react";
import PropTypes from "prop-types";

import Value from "../../../../../shared/Value";
import Data from "../../../SharedComponents/Data";
import Table from "../../../SharedComponents/Table";
import Subcategory from "../../../SharedComponents/Subcategory";
import { getCustomPastYear } from "../../../../../../helpers/Date/Date";

const ContratsAides = ({ establishment }) => {
  return (
    <Subcategory subtitle="Contrats aidés">
      <Data
        name={`Parcours emploi – compétences (PEC) ou Emploi d’avenir en ${getCustomPastYear(
          1
        )}`}
        value={!!establishment.contrat_aide}
        columnClasses={["is-7", "is-5"]}
        sourceSi="ASP Extranet CUI"
      />
      {establishment.contrat_aide && (
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
                  value={establishment.contrat_aide_salaries_n1}
                  nonEmptyValue={[0]}
                  hasNumberFormat
                />
              </td>
              <td className="has-text-right">
                <Value
                  value={establishment.contrat_aide_embauches_n1}
                  nonEmptyValue={[0]}
                  hasNumberFormat
                />
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </Subcategory>
  );
};

ContratsAides.propTypes = { establishment: PropTypes.object.isRequired };

export default ContratsAides;
