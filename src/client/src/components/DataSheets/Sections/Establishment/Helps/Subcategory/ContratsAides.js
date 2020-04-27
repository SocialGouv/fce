import React from "react";
import PropTypes from "prop-types";

import Value from "../../../../../shared/Value";
import Data from "../../../SharedComponents/Data";
import Subcategory from "../../../SharedComponents/Subcategory";
import { getCustomPastYear } from "../../../../../../helpers/Date/Date";

const ContratsAides = ({ establishment }) => {
  return (
    <>
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
          <table className="table is-bordered mt-3">
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
                <td>
                  <Value
                    value={establishment.contrat_aide_salaries_n1}
                    nonEmptyValue={[0]}
                  />
                </td>
                <td>
                  <Value
                    value={establishment.contrat_aide_embauches_n1}
                    nonEmptyValue={[0]}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </Subcategory>
    </>
  );
};

ContratsAides.propTypes = { establishment: PropTypes.object.isRequired };

export default ContratsAides;
