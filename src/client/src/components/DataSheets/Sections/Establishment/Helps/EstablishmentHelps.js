import React from "react";
import PropTypes from "prop-types";
import _get from "lodash.get";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import Config from "../../../../../services/Config";
import { getCustomPastYear } from "../../../../../helpers/Date/Date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedkit } from "@fortawesome/fontawesome-pro-solid";

const EstablishmentHelps = ({ establishment }) => {
  const hasAgrements = !!(
    establishment.agrements_iae &&
    Object.values(establishment.agrements_iae)
      .map(agrementData => agrementData.agrement)
      .includes(true)
  );

  return (
    <section id="helps" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faMedkit} />
        </span>
        <h2 className="title">Aides et agréments</h2>
      </div>
      <div className="section-datas">
        <Subcategory
          subtitle="Agréments"
          datas={[
            {
              name: "Agrément Entreprise adaptée",
              value: establishment.ea,
              columnClasses: ["is-8", "is-4"]
            },
            {
              name: "Agrément(s) Insertion par l’activité économique (IAE)",
              value: hasAgrements,
              columnClasses: ["is-8", "is-4"]
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
              {Object.entries(Config.get("agrementsIae")).map(
                ([key, label]) => {
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
                      <td>
                        <Value value={salariesInsertion} />
                      </td>
                      <td>
                        <Value value={etp && Math.round(etp)} />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}

        <Subcategory subtitle="Contrats aidés et alternance">
          <Data
            name={`Parcours emploi – compétences (PEC) ou Emploi d’avenir en ${getCustomPastYear(
              1
            )}`}
            value={!!establishment.contrat_aide}
            columnClasses={["is-8", "is-4"]}
          />
          {establishment.contrat_aide && (
            <table className="table is-bordered mt-3">
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
          <Data
            name={`Embauche en contrat en alternance en année ${getCustomPastYear(
              1
            )} ou ${getCustomPastYear(2)}`}
            value={establishment.contrat_aide_alternance_n1}
            columnClasses={["is-8", "is-4"]}
          />
        </Subcategory>
      </div>
    </section>
  );
};

EstablishmentHelps.propTypes = {
  establishment: PropTypes.object.isRequired
};

export default EstablishmentHelps;
