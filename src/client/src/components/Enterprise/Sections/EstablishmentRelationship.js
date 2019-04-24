import React from "react";
import Prototype from "prop-types";
import Value from "../../../elements/Value";
import Data from "./SharedComponents/Data";
import Config from "../../../services/Config";

const EstablishmentRelationship = ({ establishment }) => {
  const { code_idcc, libelle_idcc, accords } = establishment;
  const nbAccords = establishment.accords
    ? Config.get("accords").reduce((total, typeAccord) => {
        if (establishment.accords && establishment.accords[typeAccord.key]) {
          total += +establishment.accords[typeAccord.key];
        }
        return total;
      }, 0)
    : 0;

  return (
    <section id="activity" className="enterprise-section">
      <h2 className="title is-size-4">Relation travail</h2>
      <Data
        name="Convention collective (IDCC)"
        value={`${code_idcc ? code_idcc : ""} - ${
          libelle_idcc ? libelle_idcc : ""
        }`}
      />
      <Data
        name="Nombre d'accords d'entreprise déposés en année N-1 et N-2"
        value={nbAccords}
        emptyValue="aucun accords connus"
      />
      {nbAccords > 0 && (
        <table className="table is-hoverable">
          <thead>
            <tr>
              <th className="th"> Thématique</th>
              <th className="th"> Nombre accords concernés </th>
            </tr>
          </thead>
          <tbody>
            {Config.get("accords").map(typeAccord => (
              <tr key={`accord-${typeAccord.key}`}>
                <td>{typeAccord.value}</td>
                <td>
                  <Value
                    value={accords && accords[typeAccord.key]}
                    empty="-"
                    nonEmptyValues={[0, "0"]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

EstablishmentRelationship.Prototype = {
  establishment: Prototype.object.isRequired
};

export default EstablishmentRelationship;
