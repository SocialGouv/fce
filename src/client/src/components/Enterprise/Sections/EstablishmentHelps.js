import React from "react";
import Prototype from "prop-types";
import Value from "../../../elements/Value";
import Subcategory from "./SharedComponents/Subcategory";
import Data from "./SharedComponents/Data";
import Config from "../../../services/Config";
import { getCustomPastYear } from "../../../helpers/Date/Date";

const EstablishmentHelps = ({ establishment }) => {
  const hasAgrements = !!(
    establishment.agrements_iae &&
    Object.values(establishment.agrements_iae)
      .map(agrementData => agrementData.agrement)
      .includes(true)
  );

  return (
    <section className="enterprise-section">
      <h2 className="title is-size-4">Aides et agréments</h2>

      <Subcategory
        subtitle="Agréments"
        datas={[
          {
            name: "Agrément Entreprise adaptée",
            value: establishment.ea,
            emptyValue: "Information en cours de négociation",
            nonEmptyValue: ""
          },
          {
            name: "Agrément(s) Insertion par l’activité économique (IAE)",
            value: hasAgrements,
            nonEmptyValue: ""
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
            {Object.entries(Config.get("agrementsIae")).map(([key, label]) => (
              <tr key={key}>
                <th>{label}</th>
                <td>
                  <Value value={establishment.agrements_iae[key].agrement} />
                </td>
                <td>
                  <Value
                    value={establishment.agrements_iae[key].salariesInsertion}
                  />
                </td>
                <td>
                  <Value value={establishment.agrements_iae[key].etp} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Subcategory
        subtitle="Contrats aidés et alternance"
        datas={[
          {
            name:
              "Parcours emploi – compétences (PEC) ou Emploi d’avenir en " +
              getCustomPastYear(1),
            value: !!establishment.contrat_aide
          }
        ]}
      />
      {establishment.contrat_aide && (
        <>
          <table className="table is-bordered mt-3">
            <thead>
              <tr>
                <th>
                  Nombre de salariés présents au 31/12/{getCustomPastYear(1)}
                </th>
                <th>Nombre de salariés embauchés en {getCustomPastYear(1)}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Value
                    value={establishment.contrat_aide_salaries_n1}
                    empty="-"
                    nonEmptyValue={[0]}
                  />
                </td>
                <td>
                  <Value
                    value={establishment.contrat_aide_embauches_n1}
                    empty="-"
                    nonEmptyValue={[0]}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      <Data
        name={`Embauche en contrat en alternance en année ${getCustomPastYear(
          1
        )} ou ${getCustomPastYear(2)}`}
        value="pas encore disponible"
      />
    </section>
  );
};

EstablishmentHelps.Prototype = {
  establishment: Prototype.object.isRequired
};

export default EstablishmentHelps;
