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
    <section id="muteco" className="enterprise-section">
      <h2 className="title is-size-4">Aides et agréments</h2>

      <Subcategory
        subtitle="Agréments"
        datas={[
          {
            dataName: "Agrément Entreprise adaptée",
            dataValue: establishment.ea,
            dataEmptyValue: "Non",
            dataNonEmptyValue: ""
          },
          {
            dataName: "Agrément(s) Insertion par l’activité économique (IAE)",
            dataValue: hasAgrements,
            dataEmptyValue: "-",
            dataNonEmptyValue: ""
          }
        ]}
      />

      {hasAgrements && (
        <table className="table is-hoverable">
          <thead>
            <tr>
              <th />
              <th>Agrément(s) en 2018</th>
              <th>Nombre de salariés en insertion présents en N-1</th>
              <th>Nombre d’ETP en année N-1</th>
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
            dataName:
              "Parcours emploi – compétences (PEC) ou Emploi d’avenir en " +
              getCustomPastYear(1),
            dataValue: "pas encore disponible"
          }
        ]}
      />
      <Data
        dataName={`Nombre de salariés présents au 31/12/${getCustomPastYear(
          1
        )}`}
        dataValue={establishment.dernier_effectif_physique}
      />
      <Data
        dataName={`Nombre de salariés embauchés en année ${getCustomPastYear(
          1
        )}`}
        dataValue="pas encore disponible"
      />

      <Data
        dataName={`Embauche en contrat en alternance en année ${getCustomPastYear(
          1
        )} ou ${getCustomPastYear(2)}`}
        dataValue="pas encore disponible"
      />
    </section>
  );
};

EstablishmentHelps.Prototype = {
  establishment: Prototype.object.isRequired
};

export default EstablishmentHelps;
