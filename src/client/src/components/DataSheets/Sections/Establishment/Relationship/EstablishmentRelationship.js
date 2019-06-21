import React from "react";
import Prototype from "prop-types";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import Config from "../../../../../services/Config";
import { getCustomPastYear } from "../../../../../helpers/Date/Date";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/fontawesome-pro-solid";

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
    <section id="relation" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUsers} />
        </span>
        <h2 className="title">Relation travail</h2>
      </div>
      <div className="section-datas">
        <Data
          name="Convention collective (IDCC)"
          value={`${code_idcc ? code_idcc : ""} - ${
            libelle_idcc ? libelle_idcc : ""
          }`}
        />
        <Data
          name={`Nombre d'accords d'entreprise déposés en année ${getCustomPastYear(
            1
          )} ${getCustomPastYear(2)}`}
          value={nbAccords}
          emptyValue="aucun accord connu"
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
      </div>
    </section>
  );
};

EstablishmentRelationship.Prototype = {
  establishment: Prototype.object.isRequired
};

export default EstablishmentRelationship;
